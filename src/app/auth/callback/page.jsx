// app/auth/callback/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AuthCallback = () => {
  const router = useRouter();
  const { login } = useAuth(); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      login(token);
      router.push('https://futamart.vercel.app');
    }
  }, [router, login]);

  return <div>Loading...</div>; 
};

export default AuthCallback;

