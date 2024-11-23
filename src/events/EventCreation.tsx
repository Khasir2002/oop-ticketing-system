import React from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  LocationOn,
  Event,
  AttachMoney,
  ConfirmationNumber,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface EventCreationProps {
  onAddEvent?: (eventData: {
    eventName: string;
    location: string;
    ticketPrice: string;
    totalTickets: string;
    date: string;
  }) => void;
}

export default function EventCreation({ onAddEvent }: EventCreationProps) {
  const [formData, setFormData] = React.useState({
    eventName: "",
    location: "",
    ticketPrice: "",
    totalTickets: "",
    date: "",
  });

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    const { eventName, location, ticketPrice, totalTickets, date } = formData;

    // Validation to ensure no fields are empty
    if (!eventName || !location || !ticketPrice || !totalTickets || !date) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields before submitting.",
        severity: "error",
      });
      return;
    }

    try {
      // Post event data to backend
      const response = await axios.post("http://localhost:8080/api/v1/events", {
        name: eventName,
        location,
        ticketPrice: parseFloat(ticketPrice),
        totalTickets: parseInt(totalTickets),
        date,
      });

      // Notify parent component if necessary
      if (onAddEvent) {
        onAddEvent({
          eventName: response.data.name,
          location: response.data.location,
          ticketPrice: response.data.ticketPrice.toString(),
          totalTickets: response.data.totalTickets.toString(),
          date: response.data.date,
        });
      }

      // Reset the form and show success message
      setFormData({
        eventName: "",
        location: "",
        ticketPrice: "",
        totalTickets: "",
        date: "",
      });

      setSnackbar({
        open: true,
        message: "Event created successfully!",
        severity: "success",
      });

      // Navigate back to the dashboard
      setTimeout(() => navigate("/vendor-dashboard"), 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      setSnackbar({
        open: true,
        message: "Failed to create event. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#051322",
      }}
    >
      <Card
        sx={{
          width: "500px",
          backgroundColor: "#1c2536",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <CardHeader
          title="Create a New Event"
          sx={{
            textAlign: "center",
            backgroundColor: "#333f52",
            padding: "16px",
            borderRadius: "12px 12px 0 0",
            color: "white",
          }}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={3}>
            {/** Event Name */}
            <TextField
              name="eventName"
              label="Event Name"
              variant="outlined"
              fullWidth
              value={formData.eventName}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Event sx={{ color: "#ccc" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: "#ccc" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#007bff" },
                  "&.Mui-focused fieldset": { borderColor: "#007bff" },
                },
              }}
            />

            {/** Location */}
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              value={formData.location}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: "#ccc" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: "#ccc" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#007bff" },
                  "&.Mui-focused fieldset": { borderColor: "#007bff" },
                },
              }}
            />

            {/** Ticket Price */}
            <TextField
              name="ticketPrice"
              label="Ticket Price"
              type="number"
              variant="outlined"
              fullWidth
              value={formData.ticketPrice}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney sx={{ color: "#ccc" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: "#ccc" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#007bff" },
                  "&.Mui-focused fieldset": { borderColor: "#007bff" },
                },
              }}
            />

            {/** Total Tickets */}
            <TextField
              name="totalTickets"
              label="Total Tickets"
              type="number"
              variant="outlined"
              fullWidth
              value={formData.totalTickets}
              onChange={handleInputChange}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumber sx={{ color: "#ccc" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: "#ccc" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#007bff" },
                  "&.Mui-focused fieldset": { borderColor: "#007bff" },
                },
              }}
            />

            {/** Event Date */}
            <TextField
              name="date"
              label="Event Date"
              type="date"
              variant="outlined"
              fullWidth
              value={formData.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#007bff" },
                  "&.Mui-focused fieldset": { borderColor: "#007bff" },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              sx={{
                padding: "12px 24px",
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Create Event
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
