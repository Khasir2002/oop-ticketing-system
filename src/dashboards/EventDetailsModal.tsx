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
  InputAdornment,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
    ticketPrice: number; // Price per ticket
  };
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  open,
  onClose,
  event,
}) => {
  const theme = useTheme(); // Get current theme for dynamic styles
  const [ticketCount, setTicketCount] = useState(1); // Initial ticket count
  const [totalPrice, setTotalPrice] = useState(event.ticketPrice); // Total price based on ticket count

  // Function to update ticket count and total price
  const updateTicketCount = (count: number) => {
    if (count >= 1) {
      setTicketCount(count);
      setTotalPrice(count * event.ticketPrice); // Recalculate total price
    }
  };

  return (
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

      <DialogContent
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid container spacing={3}>
          {/* Event Image */}
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
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 70px rgba(0, 0, 0, 0.3)",
                },
              }}
            />
          </Grid>

          {/* Event Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"sx={{ marginBottom: 2, fontSize: "1rem", color: theme.palette.text.primary }}>
              Event Date: {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "1rem", color: theme.palette.text.primary }}>
              Location: {event.location}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "1rem", color: theme.palette.text.primary }}>
              Time: {event.time}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "1rem", color: theme.palette.text.primary }}>
              Ticket Price: LKR {event.ticketPrice.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "1rem", color: theme.palette.text.primary }}>
              {event.description}
            </Typography>
          </Grid>
        </Grid>

        {/* New Row for Ticket Counter and Total Price */}
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          {/* Ticket Count */}
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
                variant="outlined"
                size="small"
                type="number"
                sx={{ width: 60, textAlign: "center" }}
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
          </Grid>

          {/* Total Price */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1 }}>
              Total Price: LKR {totalPrice.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "12px",
          backgroundColor: theme.palette.background.paper,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{
            width: "60%",
            padding: "4px 0",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 6,
            background: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            transition: "background-color 0.3s",
          }}
        >
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
