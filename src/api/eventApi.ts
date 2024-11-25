import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Base URL for API
  headers: {
    "Content-Type": "application/json",
  },
});

// export const fetchAllEvents = async () => {
//   try {
//     const response = await axiosInstance.get("/events/getAllEvents");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

export const startEvent = async (eventId: number) => {
  try {
    await axiosInstance.post(`/events/${eventId}/start`);
    return "Event started successfully!";
  } catch (error) {
    console.error("Failed to start event:", error);
    throw error;
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
