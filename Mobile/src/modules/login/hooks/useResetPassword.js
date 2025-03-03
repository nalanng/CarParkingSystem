import { useState } from 'react';
import axios from 'axios';
import { account_endpoints } from '../../../../config';  

const useResetPassword = () => {
  const [message, setMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResetPassword = async (email, token, password, confirmPassword) => {
    setLoading(true);
    try {
      const body = { email, token, password, confirmPassword };
      console.log(body)
      const response = await axios.post(account_endpoints.resetPassword, body, {
        headers: {
          'Content-Type': 'application/json',
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
      setErrors('An error occurred while resetting the password.');
      return { success: false, message: 'An error occurred while resetting the password.' };
    } finally {
      setLoading(false);
    }
  };
  
  return { message, succeeded, errors, loading, fetchResetPassword };
};

export default useResetPassword;
