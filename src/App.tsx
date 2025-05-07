import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter',sans-serif]">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;