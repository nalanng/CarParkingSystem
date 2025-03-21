import { useState, useEffect } from 'react';
import axios from 'axios';  
import { parkRecords_endpoints } from "../../../../config";
import StorageService from '../../../services/StorageService';

const useParkRecords = () => {
  const [parkRecords, setParkRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkRecords = async () => {
      try {
        const token = await StorageService.getItem('userToken'); 

        const response = await axios.get(parkRecords_endpoints.getParkRecords, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.data.succeeded) {
          setParkRecords(response.data.data);  
        }
      } catch (err) {
        setError('Error fetching notifications');
      } finally {
        setLoading(false);  
      }
    };

    fetchParkRecords();
  }, []);

  return { parkRecords, loading, error };
};

export default useParkRecords;
