import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>About Us | DiasporaLink</title>
        <meta name="description" content="Learn about DiasporaLink's mission to support African students in their international education journey through expert guidance and personalized support." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-xl text-blue-100">
              Bridging the gap between African talent and global education opportunities
            </p>
          </div>
        </div>
      </section>
      
      {/* About Us Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                DiasporaLink was founded with a clear purpose: to empower African students with the knowledge, resources, and support they need to successfully pursue international education opportunities.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Having experienced the challenges of studying abroad firsthand, our team understands the unique obstacles that African students face – from navigating complex visa processes to adjusting to new educational systems and cultures.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We combine our personal experiences with professional expertise to provide guidance that addresses the specific needs of African students looking to study in Europe, North America, and beyond.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="DiasporaLink Team" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback image in case the primary one fails to load
                  e.target.src = "https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&q=80&w=1000";
                }}
              />
            </div>
          </div>
          
          {/* Our Values */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Empowerment</h3>
                <p className="text-gray-600 text-center">
                  We believe in equipping students with knowledge and tools to navigate their own paths confidently.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Integrity</h3>
                <p className="text-gray-600 text-center">
                  We provide honest, accurate guidance and set realistic expectations about the study abroad journey.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Cultural Understanding</h3>
                <p className="text-gray-600 text-center">
                  We recognize the importance of bridging cultural gaps and helping students transition successfully.
                </p>
              </div>
            </div>
          </div>
          
          {/* Founder Story */}
          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <div className="rounded-full overflow-hidden w-56 h-56 mx-auto bg-white">
                  <img 
                    src="/assets/images/team/ceo.jpeg" 
                    alt="DiasporaLink Founder and CEO" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image in case the primary one fails to load
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                    }}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Founder's Story
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "As an African student who navigated the complex journey of studying abroad, I experienced firsthand the challenges, confusion, and sometimes isolation that comes with this process. The lack of tailored guidance and resources for African students was a significant gap that needed to be filled.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  DiasporaLink was born from this experience – a platform that I wish had existed when I was beginning my international education journey. Our mission is to democratize access to quality information and support for African students, enabling them to make informed decisions and successfully navigate their path to studying abroad.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Today, we're proud to have helped hundreds of students from across Africa turn their international education dreams into reality. Each success story reinforces our commitment to this mission."
                </p>
                <p className="text-gray-900 font-semibold">
                  - Abeeb A Adeniyi, Founder & CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take the first step towards your international education goals
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/checklist" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
              Get Free Checklist
            </a>
            <a href="/consultation" className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors">
              Book Consultation
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;