import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import axios from "axios";

interface Event {
  description: string;
  id: string;
  name: string;
  date: string;
  time: string;
  imageUrl: string;
  location: string;
  ticketPrice: string;
}

const EventCardList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
      <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-5px)" },
                    maxWidth: 300, // Reduce card width
                    margin: "auto", // Center-align the card
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.imageUrl}
                    alt={event.name}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <CardContent sx={{ padding: "16px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                      {formatDate(event.date)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <LocationOn fontSize="small" sx={{ mr: 1 }} />
                      {event.location}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                      {parseFloat(event.ticketPrice.toString()).toLocaleString()} LKR
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {event.description} / {event.description} Description
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        marginTop: "12px",
                        padding: "8px 16px",
                        fontSize: "0.9rem",
                      }}
                    >
                      Start Event
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
  );
};

export default EventCardList;
