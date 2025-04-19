import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';  
import { account_endpoints } from "../../../../config";
import StorageService from '../../../services/StorageService';

const useCurrentUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const token = await StorageService.getItem('userToken'); 

      const response = await axios.get(account_endpoints.currentUser, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data.succeeded) {
        setUserInfo(response.data.data);  
      }
    } catch (err) {
      setError('Error fetching user info');
    } finally {
      setLoading(false);  
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const refetch = () => {
    setLoading(true);
    setError(null); 
    fetchUserInfo();
  };

  return { userInfo, loading, error, refetch };
};

export default useCurrentUser;
