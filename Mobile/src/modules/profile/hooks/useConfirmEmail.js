import { useState } from 'react';
import axios from 'axios';
import { ACCOUNT_BASE_URL, account_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';

const useConfirmEmail = () => {
  const [message, setMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConfirmEmail = async () => {
    setLoading(true);
    try {
      const token = await StorageService.getItem('userToken'); 
      const response = await axios.post(account_endpoints.confirmEmail, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Origin': `${ACCOUNT_BASE_URL}`
        }
      });
  
      const result = response.data;
      setMessage(result.message);
      setSucceeded(result.succeeded);
      if (result.succeeded) {
        return { success: true, message: result.message };
      } else {
        setErrors(result.errors);
        return { success: false, message: result.message };
      }
    } catch (err) {
      setErrors('An error occurred while making the API request.');
      return { success: false, message: 'An error occurred while making the API request.' };
    } finally {
      setLoading(false);
    }
  };
  
  return { message, succeeded, errors, loading, fetchConfirmEmail };
};

export default useConfirmEmail;
