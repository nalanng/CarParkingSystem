import axios from "axios";
import { useState } from "react";
import { ACCOUNT_BASE_URL, account_endpoints } from "../../../../config";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
    
      const body = { email };

      const response = await axios.post(account_endpoints.forgotPassword, body, {
        headers: {
          "Content-Type": "application/json",
          'Origin': `${ACCOUNT_BASE_URL}`
        }
      });

      if (response.status !== 200) {
        setError("Failed to send reset code. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchForgotPassword, loading, error, success };
};
