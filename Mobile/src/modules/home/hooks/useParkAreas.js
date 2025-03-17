import { useEffect, useState } from "react";
import axios from "axios";
import { parkArea_endpoints } from "../../../../config"; 

const useParkAreas = (pageNumber = 1, pageSize = 10) => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParkingAreas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${parkArea_endpoints.getAllParkAreas}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setParkingSpots(response.data.data);
      
    } catch (err) {
      console.error("Error fetching park areas:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingAreas();
  }, [pageNumber, pageSize]);

  return { parkingSpots, loading, error, refetch: fetchParkingAreas };
};

export default useParkAreas;
