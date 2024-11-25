import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../common/InputFields";
import Notification from "../common/SnackBarNotification";
import {
  LocationOn,
  Event,
  AttachMoney,
  ConfirmationNumber,
  Description,
  ImageSearchOutlined,
  DateRange,
  Timelapse,
} from "@mui/icons-material";

const EventCreation: React.FC = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    ticketPrice: "",
    totalTickets: "",
    maxTicketCapacity: "",
    customerRetrievalRate: "",
    imageUrl: "",
    description: "",
    ticketReleaseRate: "",
    date: "",
    time: "",
    started: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
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

    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const {
      eventName,
      location,
      ticketPrice,
      totalTickets,
      description,
      maxTicketCapacity,
      customerRetrievalRate,
      ticketReleaseRate,
      date,
      time,
      imageUrl,
    } = formData;
  
    console.log("Form Data:", formData); // Debugging
  
    if (!eventName) newErrors.eventName = "Event Name is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!imageUrl) newErrors.imageUrl = "Image URL is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!ticketPrice || parseFloat(ticketPrice) <= 0)
      newErrors.ticketPrice = "Ticket Price must be greater than 0.";
    if (!totalTickets || parseInt(totalTickets) <= 0)
      newErrors.totalTickets = "Total Tickets must be greater than 0.";
    if (!maxTicketCapacity || parseInt(maxTicketCapacity) <= 0)
      newErrors.maxTicketCapacity = "Max Ticket Capacity is required.";
    if (!customerRetrievalRate || parseFloat(customerRetrievalRate) < 0)
      newErrors.customerRetrievalRate = "Customer Retrieval Rate is required.";
    if (!ticketReleaseRate || parseFloat(ticketReleaseRate) < 0)
      newErrors.ticketReleaseRate = "Ticket Release Rate is required.";
    if (!date) newErrors.date = "Event Date is required.";
    if (!time) newErrors.time = "Event Time is required.";
  
    setErrors(newErrors);
  
    console.log("Validation Errors:", newErrors); // Debugging
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    console.log("Form submitted"); // Add this to check if the function is triggered
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
  
    const event = {
      name: formData.eventName,
      location: formData.location,
      ticketPrice: parseFloat(formData.ticketPrice),
      totalTickets: parseInt(formData.totalTickets),
      description: formData.description,
      maxTicketCapacity: parseInt(formData.maxTicketCapacity),
      customerRetrievalRate: parseFloat(formData.customerRetrievalRate),
      ticketReleaseRate: parseFloat(formData.ticketReleaseRate),
      date: formData.date,
      imageUrl: formData.imageUrl,
      time: formData.time,
      started: false,
    };
  
    try {
      console.log("Calling API with data: ", event); // Debugging
      const response = await axios.post(
        "http://localhost:8080/api/v1/events/addEvent",
        event
      );
      console.log("API Response: ", response);
  
      setFormData({
        eventName: "",
        location: "",
        ticketPrice: "",
        totalTickets: "",
        imageUrl: "",
        description: "",
        maxTicketCapacity: "",
        customerRetrievalRate: "",
        ticketReleaseRate: "",
        date: "",
        time: "",
        started: false,
      });
  
      setSnackbar({
        open: true,
        message: "Event created successfully!",
        severity: "success",
      });
  
      setTimeout(() => navigate("/vendor-dashboard"), 1000);
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
        minHeight: "100vh",
        backgroundColor: "#051322",
        padding: "16px",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#1c2536",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
          padding: "16px",
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="eventName"
                label="Event Name"
                value={formData.eventName}
                onChange={handleInputChange}
                error={errors.eventName}
                icon={<Event sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleInputChange}
                error={errors.location}
                icon={<LocationOn sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="ticketPrice"
                label="Ticket Price"
                type="number"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                error={errors.ticketPrice}
                icon={<AttachMoney sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="totalTickets"
                label="Total Tickets"
                type="number"
                value={formData.totalTickets}
                onChange={handleInputChange}
                error={errors.totalTickets}
                icon={<ConfirmationNumber sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="maxTicketCapacity"
                label="Max Ticket Capacity"
                type="number"
                value={formData.maxTicketCapacity}
                onChange={handleInputChange}
                error={errors.maxTicketCapacity}
                icon={<ConfirmationNumber sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                icon={<Description sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="imageUrl"
                label="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                error={errors.imageUrl}
                icon={<ImageSearchOutlined sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="customerRetrievalRate"
                label="Customer Retrieval Rate (%)"
                type="number"
                value={formData.customerRetrievalRate}
                onChange={handleInputChange}
                error={errors.customerRetrievalRate}
                icon={<ConfirmationNumber sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="ticketReleaseRate"
                label="Ticket Release Rate (%)"
                type="number"
                value={formData.ticketReleaseRate}
                onChange={handleInputChange}
                error={errors.ticketReleaseRate}
                icon={<ConfirmationNumber sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="date"
                label="Event Date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                error={errors.date}
                icon={<DateRange sx={{ color: "#ccc" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="time"
                label="Event Time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                error={errors.time}
                icon={<Timelapse sx={{ color: "#ccc" }} />}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            onClick={handleFormSubmit}
            sx={{
              marginTop: "16px",
              padding: "12px 24px",
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Create Event
          </Button>
        </CardContent>
      </Card>

      <Notification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default EventCreation;
