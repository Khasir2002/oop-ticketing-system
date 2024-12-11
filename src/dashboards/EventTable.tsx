import React, { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Chip,
    Tooltip,
    Paper,
    Snackbar,
    Alert,
    Box,
} from "@mui/material";
import { PlayCircleOutline, Stop, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import webSocketService from "../service/WebSocketService";

interface Event {
    id: string;
    name: string;
    location: string;
    date: string;
    soldTickets: number;
    totalTickets: number;
    started: boolean;
    completed: boolean;
}

interface EventTableProps {
    events: Event[];
    onStart: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const EventTable: React.FC<EventTableProps> = ({ onStart, onDelete }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const theme = useTheme();

    // Fetch all events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                setSnackbarMessage("Error fetching events");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchEvents();
    }, []);

    // useEffect(() => {
    //     // Connect to WebSocket when the component mounts
    //     webSocketService.connect();
    
    //     // Add a listener to receive messages
    //     const handleUpdate = (message: any) => {
    //         console.log("Received message:", message);
    //         console.log("Received logMessage:", message.logMessage);
    //         // setLogs((prevUpdates: any) => [...prevUpdates, message.logMessage]);
    //     };
    
    //     webSocketService.addListener(handleUpdate);
    
    //     // Cleanup when the component unmounts
    //     return () => {
    //         webSocketService.removeListener(handleUpdate);
    //         webSocketService.disconnect();
    //     };
    // }, []);

    // Handle Start Event
    const handleStartEvent = async (eventId: string | undefined) => {
        if (!eventId) {
            console.error("Invalid eventId:", eventId);
            setSnackbarMessage("Invalid Event ID");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/v1/events/startEvent/${eventId}`);
            const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
            setEvents(response.data);
            setSnackbarMessage("Event started successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error starting event:", error);
            setSnackbarMessage("Failed to start event");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // Handle Stop Event
    const handleStopEvent = async (eventId: string) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/events/stopEvent/${eventId}`);
            const response = await axios.get("http://localhost:8080/api/v1/events/getAllEvents");
            setEvents(response.data);
            setSnackbarMessage("Event stopped successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error stopping event:", error);
            setSnackbarMessage("Failed to stop event");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // Handle Delete Event
    const handleDeleteEvent = async (eventId: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/events/deleteEvent/${eventId}`);
            setEvents((prev) => prev.filter((event) => event.id !== eventId));
            setSnackbarMessage("Event deleted successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting event:", error);
            setSnackbarMessage("Failed to delete event");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                overflow: "hidden",
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.default,
                padding: 2,
            }}
        >
            <Box sx={{ overflowX: "auto" }}>
                <Table
                    sx={{
                        minWidth: 650,
                        "& th, & td": {
                            border: "1px solid",
                            borderColor: theme.palette.divider,
                            textAlign: "center",
                        },
                        "& th": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        },
                        "& td": {
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total Tickets</TableCell>
                            <TableCell>Tickets Sold</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>{formatDate(event.date)}</TableCell>
                                <TableCell>{event.totalTickets}</TableCell>
                                <TableCell>{event.soldTickets}</TableCell>
                                <TableCell>
                                    {event.completed ? (
                                        <Chip label="Completed" color="success" size="small" />
                                    ) : event.started ? (
                                        <Chip label="In Progress" color="primary" size="small" />
                                    ) : (
                                        <Chip label="Yet to Start" size="small" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Start Event">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleStartEvent(event.id)}
                                            disabled={event.started || event.completed}
                                            sx={{ marginRight: 1 }}
                                        >
                                            <PlayCircleOutline />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Stop Event">
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleStopEvent(event.id)}
                                            disabled={!event.started}
                                            sx={{ marginRight: 1 }}
                                        >
                                            <Stop />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete Event">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        >
                                            <Delete />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default EventTable;
