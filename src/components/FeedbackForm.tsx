import React, { useState, FormEvent } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import useEmailSender from '../hooks/useEmailSender';
import StarRating from './StarRating';

interface FormData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { sendEmail, status, resetStatus } = useEmailSender();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    await sendEmail({
      to_name: 'Admin',
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      rating: formData.rating.toString(),
      reply_to: formData.email
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      rating: 0
    });
    resetStatus();
  };
  
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-semibold text-white">Share Your Feedback</h2>
          <p className="text-blue-100 mt-1">We'd love to hear your thoughts!</p>
        </div>
        
        {status === 'success' ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-center mb-6">
              Your feedback has been successfully submitted. We appreciate your input!
            </p>
            <button
              onClick={resetForm}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
            >
              Submit Another Response
            </button>
          </div>
        ) : status === 'error' ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Oops!</h3>
            <p className="text-gray-600 text-center mb-6">
              Something went wrong while submitting your feedback. Please try again.
            </p>
            <button
              onClick={resetStatus}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="rating" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating
              </label>
              <StarRating 
                rating={formData.rating} 
                onRatingChange={handleRatingChange} 
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none transition-colors ${
                  errors.message 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
                placeholder="Please share your thoughts..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium ${
                status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;