import React from "react";
import { Card, CardHeader, CardContent, Typography, Divider } from "@mui/material";

interface EventCategoryCardProps {
  title: string;
  count: number;
  events: { name: string }[];
  gradient: string;
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({
  title,
  count,
  events,
  gradient,
}) => (
  <Card
    sx={{
      background: gradient,
      color: "#fff",
      borderRadius: "16px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
      padding: "16px",
    }}
  >
    <CardHeader
      title={title}
      sx={{ color: "#e5e7eb", textAlign: "center" }}
    />
    <CardContent>
      <Typography variant="h3" textAlign="center">
        {count}
      </Typography>
      <Divider sx={{ my: 2, background: "#e5e7eb" }} />
      {events.map((event, index) => (
        <Typography key={index} textAlign="center">
          {event.name}
        </Typography>
      ))}
    </CardContent>
  </Card>
);

export default EventCategoryCard;
