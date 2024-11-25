import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  AttachMoney as PriceIcon,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: "10px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#1b263b",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
}));

const CardHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#415a77",
  padding: theme.spacing(2),
  color: "#e0e1dd",
  fontWeight: "bold",
}));

interface EventCardProps {
  name: string;
  image: string;
  location: string;
  date: string;
  time: string;
  ticketPrice: number;
  availableTickets: number;
  started: boolean;
  totalTickets: number;
  onPurchase: () => void;
  onStart: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  image,
  location,
  date,
  time,
  ticketPrice,
  availableTickets,
  onPurchase,
}) => (
  <StyledCard>
    <CardMedia component="img" height="180" image={image} alt={name} />
    <CardHeader>{name}</CardHeader>
    <CardContent>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <LocationIcon style={{ color: "#9fb3c8", marginRight: 8 }} />
        <Typography variant="body2" color="#e0e1dd">
          {location}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <CalendarIcon style={{ color: "#9fb3c8", marginRight: 8 }} />
        <Typography variant="body2" color="#e0e1dd">
          {date}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <TimeIcon style={{ color: "#9fb3c8", marginRight: 8 }} />
        <Typography variant="body2" color="#e0e1dd">
          {time}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <PriceIcon style={{ color: "#9fb3c8", marginRight: 8 }} />
        <Typography variant="body2" color="#e0e1dd">
          LKR {ticketPrice}
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
      {availableTickets > 0 ? (
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "#1b998b",
            color: "#ffffff",
          }}
          onClick={onPurchase}
        >
          Buy Tickets
        </Button>
      ) : (
        <Button
          size="small"
          variant="outlined"
          style={{
            borderColor: "#ff5e57",
            color: "#ff5e57",
          }}
          disabled
        >
          Sold Out
        </Button>
      )}
    </CardActions>
  </StyledCard>
);

export default EventCard;
