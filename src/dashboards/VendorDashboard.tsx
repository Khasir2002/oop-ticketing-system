import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  CssBaseline,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  CalendarToday,
  Dashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Logout,
  EventAvailable,
  CheckCircle,
  PendingActions,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import EventCreation from "../events/EventCreation";

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: "#0a2540",
    color: "#fff",
    paddingTop: "16px",
    transition: "width 0.3s ease-in-out",
  },
  mainContent: {
    flex: 1,
    padding: "32px",
    backgroundColor: "#0f172a",
    color: "#fff",
  },
  activeButton: {
    backgroundColor: "#1e3a8a",
    color: "#fff",
  },
  card: {
    background: "linear-gradient(to bottom right, #1e3a8a, #1e40af)",
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
  },
  progressCard: {
    background: "#1e293b",
    color: "#fff",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
  },
  iconBox: {
    width: "48px",
    height: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
});

export default function EventDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  interface Event {
    started: any;
    id: number;
    name: string;
    date: string;
    location: string;
    ticketPrice: string;
    totalTickets: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const classes = useStyles();

  const menuItems = [
    { name: "Dashboard", icon: <Dashboard /> },
    { name: "Events", icon: <CalendarToday /> },
    { name: "Settings", icon: <Settings /> },
  ];

  useEffect(() => {
    // Fetch existing events from backend
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async (event: any) => {
    try {
      // Save event via backend
      const response = await axios.post(
        "http://localhost:8080/api/v1/events",
        event
      );
      setEvents((prev) => [...prev, response.data]); // Update local state
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };

  const handleStartEvent = async (eventId: number) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/events/${eventId}/start`);
      alert("Event started successfully!");
      fetchEvents(); // Refresh events after starting an event
    } catch (error) {
      console.error("Failed to start event:", error);
      alert("Failed to start event. Please try again.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/signin";
  };

  const categorizeEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return {
      yetToStart: events.filter((event) => event.date > today),
      inProgress: events.filter((event) => event.date === today),
      done: events.filter((event) => event.date < today),
    };
  };

  const { yetToStart, inProgress, done } = categorizeEvents();

  return (
    <>
      <CssBaseline />
      <Box display="flex" sx={{ height: "100vh" }}>
        {/* Sidebar */}
        <Drawer
          className={classes.sidebar}
          variant="permanent"
          anchor="left"
          sx={{
            width: isSidebarCollapsed ? 72 : 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isSidebarCollapsed ? 72 : 240,
              boxSizing: "border-box",
              backgroundColor: "#0a2540",
              height: "100vh",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
          >
            {!isSidebarCollapsed && (
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#fff" }}>
                TicketJet
              </Typography>
            )}
            <IconButton onClick={toggleSidebar} color="inherit">
              {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: "#1e293b" }} />
          <Box mt={4}>
            {menuItems.map((item) => (
              <Button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                startIcon={!isSidebarCollapsed && item.icon}
                fullWidth
                className={
                  activeItem === item.name ? classes.activeButton : undefined
                }
                sx={{
                  color: "white",
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                  textTransform: "none",
                  paddingLeft: isSidebarCollapsed ? 0 : 2,
                  paddingRight: isSidebarCollapsed ? 0 : 2,
                  fontWeight: "medium",
                }}
              >
                {!isSidebarCollapsed && item.name}
              </Button>
            ))}
          </Box>
          <Box mt="auto" px={2} pb={2}>
            <Tooltip title="Logout">
              <Button
                onClick={handleLogout}
                startIcon={!isSidebarCollapsed && <Logout />}
                fullWidth
                sx={{
                  color: "white",
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                  textTransform: "none",
                }}
              >
                {!isSidebarCollapsed && "Logout"}
              </Button>
            </Tooltip>
          </Box>
        </Drawer>

        {/* Main content */}
        <Box
          className={classes.mainContent}
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          {activeItem === "Dashboard" && (
            <>
              <Typography variant="h4" fontWeight="bold" mb={4}>
                Dashboard
              </Typography>
              {/* Metrics Section */}
              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          className={classes.iconBox}
                          sx={{ background: "#2563eb" }}
                        >
                          <EventAvailable sx={{ color: "#fff" }} />
                        </Box>
                        <Typography variant="h6" color="#e2e8f0">
                          Total Events
                        </Typography>
                      </Box>
                      <Typography variant="h3" fontWeight="bold" mt={2}>
                        {events.length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          className={classes.iconBox}
                          sx={{ background: "#16a34a" }}
                        >
                          <CheckCircle sx={{ color: "#fff" }} />
                        </Box>
                        <Typography variant="h6" color="#e2e8f0">
                          Tickets Sold
                        </Typography>
                      </Box>
                      <Typography variant="h3" fontWeight="bold" mt={2}>
                        {events.reduce(
                          (total, event) =>
                            total + parseInt(event.totalTickets || "0"),
                          0
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          className={classes.iconBox}
                          sx={{ background: "#f97316" }}
                        >
                          <PendingActions sx={{ color: "#fff" }} />
                        </Box>
                        <Typography variant="h6" color="#e2e8f0">
                          Revenue
                        </Typography>
                      </Box>
                      <Typography variant="h3" fontWeight="bold" mt={2}>
                        $
                        {events
                          .reduce(
                            (total, event) =>
                              total +
                              parseFloat(event.ticketPrice || "0") *
                                parseInt(event.totalTickets || "0"),
                            0
                          )
                          .toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              {/* Event Progress Section */}
              <Card className={classes.progressCard} sx={{ mb: 4, p: 3 }}>
                <CardHeader title="Event Progress" sx={{ color: "#fff" }} />
                <CardContent>
                  <Grid container spacing={3}>
                    {/* Yet to Start */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        sx={{
                          background:
                            "linear-gradient(to bottom right, #2563eb, #1e40af)",
                          color: "#fff",
                          borderRadius: "16px",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                          padding: "16px",
                        }}
                      >
                        <CardHeader
                          title="Yet to Start"
                          sx={{ color: "#60a5fa", textAlign: "center" }}
                        />
                        <CardContent>
                          <Typography variant="h3" textAlign="center">
                            {yetToStart.length}
                          </Typography>
                          <Divider sx={{ my: 2, background: "#e5e7eb" }} />
                          {yetToStart.map((event, index) => (
                            <Typography
                              key={index}
                              sx={{ textAlign: "center" }}
                            >
                              {event.name}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* In Progress */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        sx={{
                          background:
                            "linear-gradient(to bottom right, #16a34a, #15803d)",
                          color: "#fff",
                          borderRadius: "16px",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                          padding: "16px",
                        }}
                      >
                        <CardHeader
                          title="In Progress"
                          sx={{ color: "#4ade80", textAlign: "center" }}
                        />
                        <CardContent>
                          <Typography variant="h3" textAlign="center">
                            {inProgress.length}
                          </Typography>
                          <Divider sx={{ my: 2, background: "#e5e7eb" }} />
                          {inProgress.map((event, index) => (
                            <Typography
                              key={index}
                              sx={{ textAlign: "center" }}
                            >
                              {event.name}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Done */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        sx={{
                          background:
                            "linear-gradient(to bottom right, #f87171, #ef4444)",
                          color: "#fff",
                          borderRadius: "16px",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                          padding: "16px",
                        }}
                      >
                        <CardHeader
                          title="Done"
                          sx={{ color: "#f8717", textAlign: "center" }}
                        />
                        <CardContent>
                          <Typography variant="h3" textAlign="center">
                            {done.length}
                          </Typography>
                          <Divider sx={{ my: 2, background: "#e5e7eb" }} />
                          {done.map((event, index) => (
                            <Typography
                              key={index}
                              sx={{ textAlign: "center" }}
                            >
                              {event.name}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {/* Dynamic Event Cards */}
              <Grid container spacing={2}>
                {events.map((event, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card className={classes.card}>
                      <CardHeader
                        title={event.name || "Unnamed Event"}
                        sx={{ color: "#fff" }}
                      />
                      <CardContent>
                        <Typography>Date: {event.date || "N/A"}</Typography>
                        <Typography>
                          Location: {event.location || "N/A"}
                        </Typography>
                        <Typography>
                          Price: ${event.ticketPrice || "0.00"}, Tickets:{" "}
                          {event.totalTickets || "0"}
                        </Typography>
                        {!event.started ? (
                          <Button
                            variant="contained"
                            onClick={() => handleStartEvent(event.id)}
                            sx={{
                              marginTop: 2,
                              backgroundColor: "#2563eb",
                              "&:hover": { backgroundColor: "#1e3a8a" },
                            }}
                          >
                            Start Event
                          </Button>
                        ) : (
                          <Typography sx={{ color: "green", marginTop: 2 }}>
                            Event is Live!
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {activeItem === "Events" && (
            <EventCreation onAddEvent={handleAddEvent} />
          )}
        </Box>
      </Box>
    </>
  );
}
