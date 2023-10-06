import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, []);

  return {
    user,
    error,
    isLoading,
  };
};
