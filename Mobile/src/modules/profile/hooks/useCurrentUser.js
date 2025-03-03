import { useState, useEffect } from 'react';
import axios from 'axios';  
import { account_endpoints } from "../../../../config";
import StorageService from '../../../services/StorageService';

const useCurrentUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
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
        setError('Error fetching notifications');
      } finally {
        setLoading(false);  
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};

export default useCurrentUser;
