import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your International Education Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards your academic goals with our free comprehensive checklist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/checklist">
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Download Free Checklist
              </Button>
            </Link>
            <Link to="/consultation">
              <Button 
                variant="primary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Book Consultation
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            Join hundreds of African students who have successfully achieved their study abroad dreams
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;