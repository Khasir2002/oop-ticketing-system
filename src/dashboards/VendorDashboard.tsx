import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import {
  Dashboard,
  CalendarToday,
  CheckCircle,
  AttachMoney,
  AddCircle,
  Inventory,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../common/SideNavBar";
import MetricCard from "../common/MetricCard";
import axios from "axios";
import EventTable from "./EventTable";
import EventCreation from "./EventCreation";

const EventDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  interface Event {
    description: string;
    id: string;
    name: string;
    location: string;
    date: string;
    time: string;
    totalTickets: number;
    soldTickets: number;
    ticketPrice: number;
    started: boolean;
    completed: boolean;
    imageUrl: string;
  }

  const [events, setEvents] = useState<Event[]>([]); // State to store event data
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.name);
    }

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
      const eventsData = response.data;
      setEvents(eventsData);

      const totalTickets = eventsData.reduce(
        (total: number, event: { totalTickets: any }) => total + parseInt(event.totalTickets || "0"),
        0
      );
      const ticketsSold = eventsData.reduce(
        (total: number, event: { soldTickets: any }) => total + parseInt(event.soldTickets || "0"),
        0
      );
      const totalRevenue = eventsData.reduce(
        (total: number, event: { soldTickets: any; ticketPrice: any }) =>
          total + parseFloat(event.soldTickets || "0") * parseFloat(event.ticketPrice || "0"),
        0
      );

      setTotalTickets(totalTickets);
      setTicketsSold(ticketsSold);
      setTotalRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <Dashboard /> },
    {
      name: "Events",
      icon: <CalendarToday />,
      subItems: [
        { name: "Create Event", icon: <AddCircle /> },
        { name: "All Events", icon: <CheckCircle /> },
      ],
    },
    { name: "Tickets Log", icon: <Inventory /> },
  ];

  return (
    <>
      <CssBaseline />
      <Box display="flex" sx={{ height: "100vh", bgcolor: "#051322" }}>
        {/* Side Navigation */}
        <SideNavBar
          menuItems={menuItems}
          onMenuSelect={setActiveItem}
          activeItem={activeItem}
          username={username}
          onLogout={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
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

              {/* Event Progress Section */}
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
          {activeItem === "All Events" && (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
                All Events
              </Typography>
              <EventTable
                events={events}
                onStart={(id: any) => console.log(`Start event with id: ${id}`)}
                onUpdate={(id: any) => console.log(`Update event with id: ${id}`)}
                onDelete={(id: any) => console.log(`Delete event with id: ${id}`)}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EventDashboard;
