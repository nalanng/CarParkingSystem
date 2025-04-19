import { useState } from 'react';
import axios from 'axios';
import { parkRecords_endpoints } from '../../../../config';  
import StorageService from '../../../services/StorageService';

const useUpdateRecordStatus = () => {
  const [errors, setErrors] = useState(null); // Hataları yönetmek için state ekledim

  const fetchUpdateRecordStatus = async (id, statusId) => {
    try {
      const body = { id, statusId };
      const token = await StorageService.getItem('userToken'); 
      
      const response = await axios.put(parkRecords_endpoints.updateParkRecordStatus(id), body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      return { success: true, data: response.data };
      
    } catch (err) {
      setErrors('An error occurred while making the API request.');
      return { success: false, message: 'An error occurred while making the API request.' };
    }
  };
  
  return { fetchUpdateRecordStatus, errors };
};

export default useUpdateRecordStatus;
