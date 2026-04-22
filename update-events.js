// update-events.js
// Reads events from a Google Doc and updates the events section in index.html
// Run manually: node update-events.js
// Or automatically on every Vercel deploy via package.json build script

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
// CONFIG — update these two values
// ─────────────────────────────────────────────
const DOC_ID = '1anstQzJr8JjaGHRlLyLWaumeQ7_OxP7LwP1Z_Cv1Gng';       // from the Google Doc URL
const HTML_FILE = path.join(__dirname, 'index.html');
// ─────────────────────────────────────────────

async function fetchEvents() {
  // NEW — reads from environment variable
  const auth = new google.auth.GoogleAuth({
  ...(process.env.GOOGLE_CREDENTIALS
    ? { credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS) }
    : { keyFile: path.join(__dirname, 'credentials.json') }
  ),
  scopes: ['https://www.googleapis.com/auth/documents.readonly'],
});

  const docs = google.docs({ version: 'v1', auth });

  console.log('📄 Fetching Google Doc...');
  const doc = await docs.documents.get({ documentId: DOC_ID });

  // Extract all plain text from the document
  const text = doc.data.body.content
    .flatMap(block => block.paragraph?.elements ?? [])
    .map(el => el.textRun?.content ?? '')
    .join('');

  console.log('✅ Doc fetched. Parsing events...');
  return parseEvents(text);
}

function parseEvents(text) {
  const events = [];

  // Split on the EVENT keyword
  const blocks = text.split(/^EVENT\s*$/m).map(b => b.trim()).filter(Boolean);

  if (blocks.length === 0) {
    console.warn('⚠️  No events found in the doc. Make sure each event starts with "EVENT" on its own line.');
    return [];
  }

  blocks.forEach((block, i) => {
    const get = (key) => {
      const match = block.match(new RegExp(`^${key}:\\s*(.+)`, 'm'));
      return match ? match[1].trim() : '';
    };

    const dateStr = get('Date');
    const title   = get('Title');
    const time    = get('Time');
    const location = get('Location');
    const tag     = get('Tag');

    if (!dateStr || !title) {
      console.warn(`⚠️  Skipping block ${i + 1} — missing Date or Title.`);
      return;
    }

    const date = new Date(dateStr);
    if (isNaN(date)) {
      console.warn(`⚠️  Skipping "${title}" — invalid date: "${dateStr}"`);
      return;
    }

    events.push({
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('default', { month: 'short' }),
      title,
      time,
      location,
      tag,
    });
  });

  // Sort events by date ascending
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  console.log(`✅ Parsed ${events.length} event(s).`);
  return events;
}

function generateEventsHTML(events) {
  if (events.length === 0) {
    return `
    <div class="event-item reveal">
      <div class="event-date">
        <div class="day">—</div>
        <div class="month">TBA</div>
      </div>
      <div>
        <div class="event-title">No upcoming events</div>
        <div class="event-meta">Check back soon</div>
      </div>
      <div class="event-tag">—</div>
    </div>`;
  }

  return events.map(e => `
    <div class="event-item reveal">
      <div class="event-date">
        <div class="day">${e.day}</div>
        <div class="month">${e.month}</div>
      </div>
      <div>
        <div class="event-title">${e.title}</div>
        <div class="event-meta">${e.time}${e.time && e.location ? ' &nbsp;·&nbsp; ' : ''}${e.location}</div>
      </div>
      <div class="event-tag">${e.tag}</div>
    </div>`).join('\n');
}

function updateHTML(eventsHTML) {
  if (!fs.existsSync(HTML_FILE)) {
    throw new Error(`❌ Could not find ${HTML_FILE}.`);
  }

  let html = fs.readFileSync(HTML_FILE, 'utf8');

  const startTag = '<div class="events-list">';
  const endTag = '</div>';

  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) {
    throw new Error('❌ Could not find <div class="events-list"> in index.html');
  }

  const contentStart = startIndex + startTag.length;

  // Walk through and find the MATCHING closing </div>
  // by counting opening and closing div tags
  let depth = 1;
  let i = contentStart;

  while (i < html.length && depth > 0) {
    const nextOpen  = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);

    if (nextClose === -1) {
      throw new Error('❌ Could not find matching closing </div> for events-list');
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        // This is the correct closing </div>
        const before = html.substring(0, contentStart);
        const after  = html.substring(nextClose);
        html = before + '\n' + eventsHTML + '\n  ' + after;
        break;
      }
      i = nextClose + 6;
    }
  }

  fs.writeFileSync(HTML_FILE, html, 'utf8');
  console.log('✅ index.html updated successfully!');
}

async function main() {
  try {
    const events = await fetchEvents();
    const eventsHTML = generateEventsHTML(events);
    updateHTML(eventsHTML);
    console.log('🎉 Done! Push to GitHub to deploy.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
