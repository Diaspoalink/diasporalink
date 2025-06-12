import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DiasporaLink</h3>
            <p className="text-blue-200 mb-4">
              Guiding African students through their international education journey with personalized support and expert advice.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/diasporalinks" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://t.me/+PE2vmEfViL42ZDEy" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,0c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12Zm0,2c5.514,0 10,4.486 10,10c0,5.514 -4.486,10 -10,10c-5.514,0 -10,-4.486 -10,-10c0,-5.514 4.486,-10 10,-10Zm2.692,14.889c0.161,0.115 0.368,0.143 0.553,0.073c0.185,-0.07 0.322,-0.228 0.362,-0.42c0.435,-2.042 1.489,-7.211 1.884,-9.068c0.03,-0.14 -0.019,-0.285 -0.129,-0.379c-0.11,-0.093 -0.263,-0.12 -0.399,-0.07c-1.722,0.65 -7.455,2.883 -9.76,3.764c-0.153,0.059 -0.255,0.207 -0.26,0.371c-0.005,0.164 0.089,0.318 0.239,0.386c0.937,0.425 2.162,0.994 2.162,0.994c0,0 0.575,1.753 0.872,2.646c0.036,0.108 0.11,0.201 0.211,0.259c0.101,0.058 0.222,0.074 0.333,0.045c0.747,-0.199 1.906,-0.512 1.906,-0.512c0,0 1.683,1.242 2.026,1.511Zm-5.771,-5.225l0.642,2.143l0.142,-1.363c0,0 3.516,-3.198 5.407,-4.918c0.054,-0.05 0.062,-0.136 0.017,-0.196c-0.045,-0.06 -0.129,-0.076 -0.194,-0.039c-2.074,1.172 -6.014,3.373 -6.014,3.373Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="text-blue-200 hover:text-white transition-colors">
                  Free Checklist
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="text-blue-200 hover:text-white transition-colors">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@diasporalink.net" className="text-blue-200 hover:text-white transition-colors">support@diasporalink.net</a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:+14099047084" className="block text-blue-200 hover:text-white transition-colors">+1 409-904-7084 (USA)</a>
                  <a href="tel:+2349166971493" className="block text-blue-200 hover:text-white transition-colors">+234 916-697-1493 (Nigeria)</a>
                  <a href="tel:+79959815085" className="block text-blue-200 hover:text-white transition-colors">+7 995-981-5085 (Russia)</a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="text-blue-200 block">USA: 5100 Martinique Calle, Dickinson TX 77539</span>
                  <span className="text-blue-200 block">Nigeria: Lagos</span>
                  <span className="text-blue-200 block">Poland: Dabrowa Gorniska</span>
                  <span className="text-blue-200 block">Germany: Berlin</span>
                  <span className="text-blue-200 block">Russia: Kazan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center">
          <p className="text-blue-300 text-sm">
            &copy; {currentYear} DiasporaLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;