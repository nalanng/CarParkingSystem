import { useState } from 'react';
import axios from 'axios';
import { parkRecords_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';  

const useCreateParkRecord = () => {
  const [data, setData] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [recordLoading, setLoading] = useState(false);

  const fetchCreateParkRecord = async (lotId) => {
    setLoading(true);
    try {
      const body = { lotId };

      console.log(lotId)
      const token = await StorageService.getItem('userToken'); 
      const response = await axios.post(parkRecords_endpoints.createParkRecord, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = response.data;

      if (result.succeeded) {
        setSucceeded(result.succeeded); 
        setData(result.data); 
      } else {
        setErrors(result.errors);
      }
    } catch (err) {
      setErrors(err);
      console.error('API request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, succeeded, errors, recordLoading, fetchCreateParkRecord };
};

export default useCreateParkRecord;
