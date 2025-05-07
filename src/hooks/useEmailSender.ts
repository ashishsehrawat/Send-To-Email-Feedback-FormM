import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = ''; // use emailjs keys and id's
const TEMPLATE_ID = '';
const PUBLIC_KEY = '';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface EmailParams {
  to_name: string;
  from_name: string;
  from_email: string;
  message: string;
  rating: string;
  reply_to: string;
}

const useEmailSender = () => {
  const [status, setStatus] = useState<Status>('idle');

  const sendEmail = async (params: EmailParams) => {
    try {
      setStatus('loading');
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        params,
        PUBLIC_KEY
      );
      
      setStatus('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  const resetStatus = () => {
    setStatus('idle');
  };

  return { sendEmail, status, resetStatus };
};

export default useEmailSender;