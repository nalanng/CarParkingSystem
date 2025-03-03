import { useState } from 'react';
import axios from 'axios';
import { account_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';

const useUpdatePassword = () => {
  const [message, setMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUpdatePassword = async (currentPassword, password, confirmPassword) => {
    setLoading(true);
    try {
      const body = { currentPassword, password, confirmPassword };
      const token = await StorageService.getItem('userToken'); 
      const response = await axios.put(account_endpoints.updatePassword, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
  
  return { message, succeeded, errors, loading, fetchUpdatePassword };
};

export default useUpdatePassword;
