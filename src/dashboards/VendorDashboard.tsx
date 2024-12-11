import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
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
import EventCategoryCard from "../common/EventCategoryCard";

const EventDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  interface Event {
    id: string;
    name: string;
    location: string;
    date: string;
    totalTickets: number;
    soldTickets: number;
    ticketPrice: number;
    started: boolean;
    completed: boolean;
    revenue: number; // Added revenue field
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // New States for Event Categories
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [inProgressEvents, setInProgressEvents] = useState<Event[]>([]);
  const [yetToStartEvents, setYetToStartEvents] = useState<Event[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.name);
    }

    fetchEvents();
    const intervalId = setInterval(fetchEvents,1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
      const eventsData = response.data.map((event: any) => ({
        ...event,
        revenue: event.soldTickets * event.ticketPrice, // Calculate revenue
      }));
      setEvents(eventsData);
      calculateMetrics(eventsData);
      categorizeEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const calculateMetrics = (eventsData: Event[]) => {
    const totalTickets = eventsData.reduce(
      (total: number, event: Event) => total + (event.totalTickets || 0),
      0
    );
    const ticketsSold = eventsData.reduce(
      (total: number, event: Event) => total + (event.soldTickets || 0),
      0
    );
    const totalRevenue = eventsData.reduce(
      (total: number, event: Event) =>
        total + (event.soldTickets || 0) * (event.ticketPrice || 0),
      0
    );

    setTotalTickets(totalTickets);
    setTicketsSold(ticketsSold);
    setTotalRevenue(totalRevenue);
  };

  const categorizeEvents = (eventsData: Event[] = events) => {
    setCompletedEvents(eventsData.filter((event: Event) => event.completed));
    setInProgressEvents(
      eventsData.filter((event: Event) => event.started && !event.completed)
    );
    setYetToStartEvents(eventsData.filter((event: Event) => !event.started));
  };

  // Handle Start Event
  const handleStartEvent = async (id: string) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/events/startEvent/${id}`);
      fetchEvents(); // Refresh events after starting
    } catch (error) {
      console.error("Error starting event:", error);
    }
  };

  // Handle Delete Event
  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/events/deleteEvent/${id}`);
      fetchEvents(); // Refresh events after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
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

              {/* Event Status Cards */}
              <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <EventCategoryCard
                    title="Yet to Start Events"
                    count={yetToStartEvents.length}
                    events={yetToStartEvents}
                    gradient="linear-gradient(45deg, #1976d2, #42a5f5)"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <EventCategoryCard
                    title="In Progress Events"
                    count={inProgressEvents.length}
                    events={inProgressEvents}
                    gradient="linear-gradient(45deg, #fb8c00, #ffa726)"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <EventCategoryCard
                    title="Completed Events"
                    count={completedEvents.length}
                    events={completedEvents}
                    gradient="linear-gradient(45deg, #43a047, #66bb6a)"
                  />
                </Grid>
              </Grid>
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
                onStart={handleStartEvent}
                onDelete={handleDeleteEvent}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EventDashboard;
