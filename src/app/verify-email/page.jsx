"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function VerifyEmail() {
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send a POST request without any token
        const response = await fetch('https://api.futamart.com/v1/user/verify-email', {
          method: 'POST'
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      {status === 'loading' && (
        <p className="text-lg text-gray-600">Verifying your email...</p>
      )}

      {status === 'success' && (
        <div className="max-w-md p-8 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-md text-center">
          <RiVerifiedBadgeFill className='text-green-500 text-6xl mx-auto' /> {/* Enlarge icon */}
          <h1 className="text-2xl font-semibold mt-4">Email Verified!</h1>
          <p className="mt-4">Your email has been successfully verified. You can now login to your account.</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-green-600"
          >
            Go to Login
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-md p-8 bg-red-100 text-red-800 border border-red-300 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-semibold">Verification Failed</h1>
          <p className="mt-4">The verification link is invalid or has expired. Please try requesting a new link.</p>
        </div>
      )}
    </div>
  );
}
