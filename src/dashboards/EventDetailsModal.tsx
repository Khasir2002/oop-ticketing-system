import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: {
    title: string;
    description: string;
    date: string;
    image: string;
    location: string;
    time: string;
    ticketPrice: number;
    ticketId: number;
  };
  userName: string | null;
}

interface EventDetailsModalState {
  ticketCount: number;
  totalPrice: number;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error";
}

class EventDetailsModal extends Component<EventDetailsModalProps, EventDetailsModalState> {
  constructor(props: EventDetailsModalProps) {
    super(props);
    this.state = {
      ticketCount: 1,
      totalPrice: props.event.ticketPrice,
      snackbarOpen: false,
      snackbarMessage: "",
      snackbarSeverity: "success",
    };
  }

  updateTicketCount = (count: number) => {
    if (count >= 1) {
      this.setState({
        ticketCount: count,
        totalPrice: count * this.props.event.ticketPrice,
      });
    }
  };

  handlePurchase = async () => {
    const { ticketCount, totalPrice } = this.state;
    const { event, userName } = this.props;

    try {
      const response = await axios.post("http://localhost:8080/api/v1/ticket/purchaseTicket", {
        ticketCount,
        ticketId: event.ticketId,
        totalPrice,
        title: event.title,
        userName,
      });

      this.setState({
        snackbarMessage: response.data,
        snackbarSeverity: "success",
        snackbarOpen: true,
      });

      this.props.onClose();
    } catch (error) {
      console.error("Error during ticket purchase", error);
      this.setState({
        snackbarMessage: "There was an error processing the purchase. Please try again.",
        snackbarSeverity: "error",
        snackbarOpen: true,
      });
    }
  };

  // Close Snackbar
  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { open, onClose, event } = this.props;
    const { ticketCount, totalPrice, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;

    return (
      <>
        <Dialog open={open} onClose={onClose} fullWidth>
          <DialogTitle
            sx={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 1,
              color: "text.primary",
              backgroundColor: "background.paper",
              fontWeight: "bold",
              fontSize: "1.6rem",
              borderBottom: "1px solid",
            }}
          >
            {event.title}
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              sx={{
                position: "absolute",
                right: 20,
                top: 16,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ backgroundColor: "background.default" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: 240,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "10px",
                    boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Event Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Location: {event.location}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Time: {event.time}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Ticket Price: LKR {event.ticketPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {event.description}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Tickets: {ticketCount}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => this.updateTicketCount(ticketCount - 1)}
                    sx={{ marginRight: 2 }}
                  >
                    -
                  </Button>
                  <TextField
                    value={ticketCount}
                    onChange={(e) => this.updateTicketCount(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Tickets</InputAdornment>,
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => this.updateTicketCount(ticketCount + 1)}
                    sx={{ marginLeft: 2 }}
                  >
                    +
                  </Button>
                </Box>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Total: LKR {totalPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handlePurchase}
              sx={{ fontWeight: "bold" }}
            >
              Purchase
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default EventDetailsModal;
