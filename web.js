import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, TrendingUp, Award, BookOpen } from 'lucide-react';

const SFIGWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-2 border-yellow-400">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className={`font-semibold text-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Slug Fund Investment Group
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Impact', 'Team', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={scrolled ? 'text-gray-900' : 'text-white'} />
              ) : (
                <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            {['Home', 'About', 'Impact', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Building Financial<br />Futures Together
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto">
            A student-driven community at UCSC dedicated to transforming financial knowledge into real-world success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105"
            >
              Join Our Community
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Students Through Financial Literacy
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Slug Fund Investment Group, we believe financial success starts with education and community. We're passionate students dedicated to demystifying the world of finance and investments.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission is simple yet powerful: provide students with the knowledge, tools, and support network they need to make informed investment decisions and achieve lasting financial success.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Every student deserves financial confidence</span>
                <ChevronRight className="ml-2" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
                alt="Students collaborating"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Workshops Held</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">5+</div>
                  <div className="text-sm text-gray-600">Years Strong</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="impact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive resources and experiences designed to accelerate your financial journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Hands-On Learning",
                description: "Interactive workshops and real-world case studies that bring investment concepts to life"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Peer Network",
                description: "Connect with like-minded students passionate about finance and build lasting professional relationships"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Market Analysis",
                description: "Regular market insights and investment strategy sessions led by experienced members"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Career Development",
                description: "Industry connections and mentorship opportunities to launch your finance career"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-yellow-400 rounded-lg flex items-center justify-center text-white mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">UC Investments Partnership</h2>
          <p className="text-lg text-blue-50 mb-8 leading-relaxed">
            We've partnered with UC Investments to provide students with unparalleled access to the asset management industry. This collaboration offers comprehensive training that mirrors the experiences of recent graduates entering investment firms—completely free of charge.
          </p>
          <a
            href="https://ucinvestments.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            Explore UC Investments
          </a>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Dedicated students committed to your financial success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Joshua Morris", role: "President" },
              { name: "Vincent Call", role: "Vice President" },
              { name: "Sushane Atmakuri", role: "Officer" },
              { name: "Julian Marquit", role: "Chief Operating Officer" },
              { name: "Nicholas Hetter", role: "Director of External Affairs" },
              { name: "Kevin Yu", role: "Chief Technical Officer" },
              { name: "Spencer Ng", role: "Director of Crypto" },
              { name: "Aryan Ray", role: "Chief Director of Equity" }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-blue-600 opacity-20 group-hover:opacity-30 transition-opacity">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors text-sm font-medium">
                  LinkedIn Profile →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600">
              Take the first step toward financial empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Discord Community</h3>
              <p className="text-gray-600 mb-6">
                Join our vibrant Discord server to connect with members, stay updated on events, and engage in discussions about markets and investments.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition-all"
              >
                Join Discord
                <ChevronRight className="ml-2" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mailing List</h3>
              <p className="text-gray-600 mb-6">
                Sign up for our mailing list to receive updates about workshops, guest speakers, and exclusive opportunities. Use your UCSC email to join.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-sm mb-2">QR Code</div>
                    <div className="text-xs">Scan to join mailing list</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-2 border-yellow-400">
                  <span className="font-bold text-sm">SF</span>
                </div>
                <span className="font-semibold">Slug Fund Investment Group</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering UCSC students with financial knowledge and investment skills.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Impact', 'Team', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>University of California</p>
                <p>Santa Cruz</p>
                <a href="mailto:contact@sfig.ucsc.edu" className="hover:text-white transition-colors">
                  contact@sfig.ucsc.edu
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Slug Fund Investment Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SFIGWebsite;