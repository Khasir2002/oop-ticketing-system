import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Header from "../common/Header";
import SnackbarNotification from "../common/SnackBarNotification";
import axios from "axios";
import EventCardList from "./EventCardList";
import Slider from "../common/Slider";

const CustomerDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
      const startedEvents = response.data.filter((event: { started: any }) => event.started);
      const eventsWithImages = startedEvents.map((event: any, index: number) => ({
        ...event,
      }));
      setEvents(eventsWithImages);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handlePurchaseTicket = async (eventId: number) => {
    try {
      await axios.get(
        `http://localhost:8080/api/v1/customer/events/${eventId}/purchase`
      );
      setSnackbarMessage("Ticket purchased successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchEvents();
    } catch (error) {
      console.error("Failed to purchase ticket:", error);
      setSnackbarMessage("Failed to purchase ticket. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Header />
      <Slider />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#9fb3c8", textAlign: "center" }}>
          Upcoming Events
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: "#9fb3c8", textAlign: "center" }}>
          Browse and purchase tickets for upcoming events.
        </Typography>
        <EventCardList role="customer" />
        <SnackbarNotification
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        />
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
