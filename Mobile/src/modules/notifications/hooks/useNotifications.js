import { useState, useEffect } from 'react';
import axios from 'axios';  
import { announcement_endpoints } from "../../../../config";
import StorageService from '../../../services/StorageService';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await StorageService.getItem('userToken'); 

        const response = await axios.get(announcement_endpoints.announcement, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.data.succeeded) {
          setNotifications(response.data.data);  
        }
      } catch (err) {
        setError('Error fetching notifications');
      } finally {
        setLoading(false);  
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;
