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
import { Edit, Delete, PlayCircleOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

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
    onStart: (id: string) => void;
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onStart, onUpdate, onDelete }) => {
    const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Fetch events from the backend
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/events/getAllEvents")
            .then((response) => {
                setFetchedEvents(response.data); // Set the events state when data is fetched
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, []);

    // Function to handle the "Start Event"
    const handleStartEvent = (eventId: string) => {
        axios
            .post(`http://localhost:8080/api/v1/events/startEvent/${eventId}`)
            .then((response) => {
                // Update the events list to reflect the event starting
                setFetchedEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.id === eventId ? { ...event, started: true } : event
                    )
                );
            })
            .catch((error) => {
                console.error("Error starting event:", error);
            });
    };

    // Function to handle the "Delete Event"
    const handleDeleteEvent = (eventId: string) => {
        axios
            .delete(`http://localhost:8080/api/v1/events/deleteEvent/${eventId}`)
            .then((response) => {
                // Update the events list to remove the deleted event
                setFetchedEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));

                // Show success Snackbar
                setSnackbarMessage("Event deleted successfully");
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error("Error deleting event:", error);
                setSnackbarMessage("Error deleting event");
                setSnackbarOpen(true);
            });
    };

    // Function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(date);
    };

    const theme = useTheme();

    // Close Snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
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
            <Box sx={{ overflowX: 'auto' }}>
                <Table
                    sx={{
                        minWidth: 650,
                        borderCollapse: "separate",
                        borderSpacing: "0",
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
                        "& tr:last-child td": {
                            borderBottom: 0,
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
                        {fetchedEvents.map((event) => (
                            <TableRow
                                key={event.id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.hover,
                                        transition: "background-color 0.2s",
                                    },
                                }}
                            >
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
                                        <Chip label="Yet to Start" color="default" size="small" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Start Event">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleStartEvent(event.id)}
                                                disabled={event.started || event.completed}
                                                sx={{ marginRight: 1, borderRadius: 2 }}
                                            >
                                                <PlayCircleOutline />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Update Event">
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    // You can implement an update event dialog here
                                                }}
                                                sx={{ marginRight: 1, borderRadius: 2 }}
                                            >
                                                <Edit />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Delete Event">
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDeleteEvent(event.id)}
                                                sx={{ borderRadius: 2 }}
                                            >
                                                <Delete />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* Snackbar for deletion message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default EventTable;
