import { useState } from 'react';
import axios from 'axios';
import { account_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';  
import { Roles } from '../../../utils/enums/Roles';

const useAuth = () => {
  const [data, setData] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAuth = async (email, password) => {
    setLoading(true);
    try {
      const body = { email, password };

      const response = await axios.post(account_endpoints.authenticate, body, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = response.data;
      console.log(result)

      if (result.succeeded) {
        await StorageService.storeItem('userToken', result.data.jwToken); 
        setSucceeded(result.succeeded); 
        setData(result.data); 
      } else {
        setErrors(result.errors || 'Authentication failed');
      }
    } catch (err) {
      setErrors('Please check your email address and password.');
      console.error('API request error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, succeeded, errors, loading, fetchAuth };
};

export default useAuth;
