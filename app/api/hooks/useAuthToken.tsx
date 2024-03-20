'use client'
import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
};

export default useAuthToken;
