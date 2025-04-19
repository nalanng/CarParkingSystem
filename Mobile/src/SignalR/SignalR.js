import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { SignalR_URL } from '../../config';

export const useSignalR = ({ onStatusUpdate, onStatusFullUpdate }) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(SignalR_URL)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("SignalR connected!");

        connection.on("ParkAreaStatus", (data) => {
          console.log("📡 ParkAreaStatus:", data);
          onStatusUpdate && onStatusUpdate(data);
        });

        connection.on("ParkAreaFull", (data) => {
          onStatusFullUpdate && onStatusFullUpdate(data);
        });
      })
      .catch((err) => {
        console.error("SignalR connection failed:", err);
      });

    return () => {
      connection.stop();
    };
  }, []);
};
