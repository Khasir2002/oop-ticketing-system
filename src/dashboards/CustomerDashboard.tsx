import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
import MuiCard from "@mui/material/Card";
import axios from "axios";

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: theme.spacing(4),
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const StyledCard = styled(MuiCard)(({ theme }) => ({
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const CustomerDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Fetch available events on load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events");
      const startedEvents = response.data.filter(
        (event: { started: any }) => event.started
      ); // Filter for started events
      setEvents(startedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchEvents, 5000); // Poll every 5 seconds for updated events
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handlePurchaseTicket = async (eventId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/customer/events/${eventId}/purchase`
      );
      setSnackbarMessage("Ticket purchased successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchEvents(); // Refresh the event list to update ticket availability
    } catch (error) {
      console.error("Failed to purchase ticket:", error);
      setSnackbarMessage("Failed to purchase ticket. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <AppTheme>
      <DashboardContainer>
        <Typography variant="h4" gutterBottom>
          Customer Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Browse events and purchase tickets.
        </Typography>
        {/* Events List */}
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2">
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${event.ticketPrice}
                  </Typography>
                  <Typography variant="body2">
                    Tickets Available: {event.availableTickets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {event.started ? "Ongoing" : "Not Started"}
                  </Typography>
                </CardContent>
                <CardActions>
                  {event.availableTickets > 0 ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handlePurchaseTicket(event.id)}
                    >
                      Purchase Ticket
                    </Button>
                  ) : (
                    <Button size="small" variant="outlined" disabled>
                      Sold Out
                    </Button>
                  )}
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        );
        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </DashboardContainer>
    </AppTheme>
  );
};

export default CustomerDashboard;
