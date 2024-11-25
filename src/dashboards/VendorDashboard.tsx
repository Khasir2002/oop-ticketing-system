import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import {
  Dashboard,
  CalendarToday,
  CheckCircle,
  AttachMoney,
  AddCircle,
  Inventory,
  AccountCircle,
  DeleteForeverOutlined,
  LocationOn,
} from "@mui/icons-material";
import SideNavBar from "../common/SideNavBar";
import MetricCard from "../common/MetricCard";
import axios from "axios";
import EventCreation from "./EventCreation";
import EventCardList from "./EventCardList";

const EventDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  interface Event {
    description: string;
    id: string;
    name: string;
    location: string;
    date: string;
    time: string;
    totalTickets: string;
    soldTickets: string;
    ticketPrice: number;
    started: boolean;
    completed: boolean;
    imageUrl: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const menuItems = [
    { name: "Dashboard", icon: <Dashboard /> },
    {
      name: "Events",
      icon: <CalendarToday />,
      subItems: [
        { name: "Create Event", icon: <AddCircle /> },
        { name: "Active Events", icon: <CheckCircle /> },
      ],
    },
    { name: "Tickets Log", icon: <Inventory /> },
    {
      name: "Profile",
      icon: <AccountCircle />,
      subItems: [
        { name: "Logout", icon: <AccountCircle /> },
        { name: "Deactivate Account", icon: <DeleteForeverOutlined /> },
      ],
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/events/getAllEvents"
      );
      const eventsData = response.data;
      setEvents(eventsData);

      const totalTickets = eventsData.reduce(
        (total: number, event: { totalTickets: any }) =>
          total + parseInt(event.totalTickets || "0"),
        0
      );
      const ticketsSold = eventsData.reduce(
        (total: number, event: { soldTickets: any }) =>
          total + parseInt(event.soldTickets || "0"),
        0
      );
      const totalRevenue = eventsData.reduce(
        (total: number, event: { soldTickets: any; ticketPrice: any }) =>
          total +
          parseFloat(event.soldTickets || "0") *
            parseFloat(event.ticketPrice || "0"),
        0
      );

      setTotalTickets(totalTickets);
      setTicketsSold(ticketsSold);
      setTotalRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box display="flex" sx={{ height: "100vh", bgcolor: "#051322" }}>
        {/* Side Navigation */}
        <SideNavBar
          menuItems={menuItems}
          onMenuSelect={setActiveItem}
          activeItem={activeItem}
        />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#051322",
            p: 4,
            overflowY: "auto",
          }}
        >
          {activeItem === "Dashboard" && (
            <>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: 4, color: "#fff" }}
              >
                Dashboard
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Total Events"
                    value={events.length}
                    icon={<CalendarToday sx={{ color: "#fff" }} />}
                    iconBackgroundColor="#4caf50"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Total Tickets"
                    value={totalTickets}
                    icon={<CheckCircle sx={{ color: "#fff" }} />}
                    iconBackgroundColor="#2196f3"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Tickets Sold"
                    value={ticketsSold}
                    icon={<CheckCircle sx={{ color: "#fff" }} />}
                    iconBackgroundColor="#ff9800"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <MetricCard
                    title="Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={<AttachMoney sx={{ color: "#fff" }} />}
                    iconBackgroundColor="#e91e63"
                  />
                </Grid>
              </Grid>
              <Box mt={4}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
                >
                  Event Progress
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        p: 2,
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        color: "#fff",
                        textAlign: "center",
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography variant="h6">Yet to Start</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {events.filter((event) => !event.started).length}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        p: 2,
                        background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                        color: "#fff",
                        textAlign: "center",
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(46, 125, 50, 0.3)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography variant="h6">In Progress</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {events.filter((event) => event.started).length}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        p: 2,
                        background: "linear-gradient(45deg, #d32f2f, #ef5350)",
                        color: "#fff",
                        textAlign: "center",
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(211, 47, 47, 0.3)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Typography variant="h6">Completed</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {events.filter((event) => event.completed).length}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {activeItem === "Create Event" && <EventCreation />}
          {activeItem === "Active Events" && (
            <EventCardList/>          
          )}
        </Box>
      </Box>
    </>
  );
};

export default EventDashboard;
