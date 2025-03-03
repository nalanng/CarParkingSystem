import { useState } from 'react';
import axios from 'axios';
import { account_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';  
import { Roles } from '../../../utils/enums/Roles';

const useRegister = () => {
  const [data, setData] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRegister = async (firstName, lastName, email, userName, password, confirmPassword) => {
    setLoading(true);
    try {
      const body = { firstName, lastName, email, userName, password, confirmPassword };

      const response = await axios.post(account_endpoints.register, body, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = response.data;

      if (result.succeeded) {
        await StorageService.storeItem('userToken', result.data.jwToken); 
        setSucceeded(result.succeeded); 
        setData(result.data); 
      } else {
        setErrors(result.errors || 'Authentication failed');
      }
    } catch (err) {
      console.error('API request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, succeeded, errors, loading, fetchRegister };
};

export default useRegister;
