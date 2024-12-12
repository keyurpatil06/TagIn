import React from 'react';
import Footer from './Footer';

const About = () => {
  return (
    <div id='about' className="text-center py-10 mx-10">
      <h2 className="text-2xl font-bold flex items-center justify-center">
        About
        <span className='border-2 border-white ml-3 px-3 py-1 rounded-xl text-xl'>
          <span className="text-red-500">Tag</span>In
        </span>
      </h2>
      <p className="my-4 text-gray-600">
        TagIn makes event registration effortless with personalized tickets and an easy-to-use platform.
      </p>
      <Footer />
    </div>
  );
};

export default About;