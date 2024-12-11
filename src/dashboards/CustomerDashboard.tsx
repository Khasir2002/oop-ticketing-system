import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../common/Header";
import SnackbarNotification from "../common/SnackBarNotification";
import EventCardList from "./EventCardList";
import Slider from "../common/Slider";
import axios from "axios";

const CustomerDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/events/getStartedEvents");
        setEvents(response.data);
      } catch (error) {
        setSnackbarMessage("Failed to fetch events.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box>
      <Header />
      <Slider />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#9fb3c8", textAlign: "center" }}>
          Upcoming Events
        </Typography>
        <EventCardList events={events} role="customer" />
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
