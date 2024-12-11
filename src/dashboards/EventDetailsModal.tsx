import React, { useState } from "react";
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
  useTheme,
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

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event, userName }) => {
  const theme = useTheme();
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(event.ticketPrice);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const updateTicketCount = (count: number) => {
    if (count >= 1) {
      setTicketCount(count);
      setTotalPrice(count * event.ticketPrice);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/ticket/purchaseTicket", {
        ticketCount,
        ticketId: event.ticketId,
        totalPrice: totalPrice,
        title: event.title,
        userName: userName,
      });

      setSnackbarMessage(response.data); // Assuming the response contains a success message
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      onClose(); // Close the modal after successful purchase
    } catch (error) {
      console.error("Error during ticket purchase", error);
      setSnackbarMessage("There was an error processing the purchase. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 1,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            fontWeight: "bold",
            fontSize: "1.6rem",
            borderBottom: `1px solid ${theme.palette.divider}`,
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
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: theme.palette.background.default }}>
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
                  onClick={() => updateTicketCount(ticketCount - 1)}
                  sx={{ marginRight: 2 }}
                >
                  -
                </Button>
                <TextField
                  value={ticketCount}
                  onChange={(e) => updateTicketCount(Number(e.target.value))}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Tickets</InputAdornment>,
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => updateTicketCount(ticketCount + 1)}
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
            onClick={handlePurchase}
            sx={{ fontWeight: "bold" }}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EventDetailsModal;
