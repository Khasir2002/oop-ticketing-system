import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBackgroundColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  iconBackgroundColor,
}) => (
  <Card
    sx={{
      background: "linear-gradient(to bottom right, #1e3a8a, #1e40af)",
      color: "#fff",
      borderRadius: "16px",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: iconBackgroundColor,
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ fontSize: "2rem" }} color="#e2e8f0">
          {title}
        </Typography>
      </Box>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default MetricCard;
