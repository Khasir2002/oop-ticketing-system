import React, { Component } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import EventDetailsModal from "./EventDetailsModal";

interface Event {
  description: string;
  id: string;
  name: string;
  date: string;
  time: string;
  imageUrl: string;
  location: string;
  ticketPrice: any;
}

interface EventCardListProps {
  role: "vendor" | "customer";
  events: Event[];
}

interface EventCardListState {
  selectedEvent: Event | null;
  modalOpen: boolean;
  userName: string | null;
}

class EventCardList extends Component<EventCardListProps, EventCardListState> {
  constructor(props: EventCardListProps) {
    super(props);
    this.state = {
      selectedEvent: null,
      modalOpen: false,
      userName: null,
    };
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.setState({ userName: user.name });
    }
  }

  formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  handleButtonClick = (event: Event) => {
    this.setState({ selectedEvent: event, modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { events, role } = this.props;
    const { selectedEvent, modalOpen, userName } = this.state;

    return (
      <>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-5px)" },
                  maxWidth: 300,
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
                    {this.formatDate(event.date)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    <LocationOn fontSize="small" sx={{ mr: 1 }} />
                    {event.location}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                    {parseFloat(event.ticketPrice.toString()).toLocaleString()} LKR
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {event.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      marginTop: "12px",
                      padding: "8px 16px",
                      fontSize: "0.9rem",
                    }}
                    onClick={() => this.handleButtonClick(event)}
                  >
                    {role === "customer" ? "Buy Ticket" : "Start Event"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedEvent && (
          <EventDetailsModal
            open={modalOpen}
            onClose={this.handleCloseModal}
            event={{
              title: selectedEvent.name,
              date: selectedEvent.date,
              image: selectedEvent.imageUrl,
              location: selectedEvent.location,
              description: selectedEvent.description,
              time: selectedEvent.time,
              ticketPrice: selectedEvent.ticketPrice,
              ticketId: parseInt(selectedEvent.id),
            }}
            userName={userName}
          />
        )}
      </>
    );
  }
}

export default EventCardList;
