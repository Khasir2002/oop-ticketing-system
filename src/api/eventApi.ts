import axios from "axios";
import { useState } from "react";
import CustomerDashboard from "../dashboards/CustomerDashboard";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Base URL for API
  headers: {
    "Content-Type": "application/json",
  },
});

export const startEvent = async (eventId: number): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/events/${eventId}/start`);
    return response.data.message || "Event started successfully!";
  } catch (error: any) {
    console.error("Failed to start event:", error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unexpected error occurred while starting the event.");
  }
};

export const purchaseTicket = async (eventId: number) => {
  try {
    await axiosInstance.get(`/customer/events/${eventId}/purchase`);
    return "Ticket purchased successfully!";
  } catch (error) {
    console.error("Failed to purchase ticket:", error);
    throw error;
  }
};
const fetchEvents = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
    setEvents(response.data);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};


const handleStartEvent = async (eventId: number) => {
  try {
    const message = await startEvent(eventId);
    console.log(message);
    fetchEvents();
  } catch (error: any) {
    console.error("Error starting event:", error.message);
  }
};
const [events, setEvents] = useState<any[]>([]);

function updateEvents(data: any) {
  setEvents(data);
}

