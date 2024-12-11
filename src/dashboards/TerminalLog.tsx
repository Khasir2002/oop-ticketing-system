import React, { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import webSocketService from "../service/WebSocketService"; // Adjust the path based on your project structure

const TicketLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    webSocketService.connect();

    const handleUpdate = (message: any) => {
      console.log("Received WebSocket message:", message);
      const { logMessage } = message;

      // Add the log message to the logs state
      setLogs((prevLogs) => [...prevLogs, logMessage]);
    };

    webSocketService.addListener(handleUpdate);

    return () => {
      webSocketService.removeListener(handleUpdate);
      webSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleClearLogs = () => {
    setLogs([]); // Clears all logs
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.background}>
        {/* Terminal */}
        <Paper sx={styles.terminal} ref={terminalRef}>
          <Box sx={styles.overlayImage}>
            <img
              src="https://images.hdqwalls.com/wallpapers/thumb/security-break-grim-reaper-hacker-qj.jpg"
              alt="Overlay"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <Typography
                key={index}
                sx={{
                  fontFamily: `"Courier New", Courier, monospace`,
                  color: "#32CD32", // Lime green for a vivid terminal effect
                  fontSize: "14px",
                  wordBreak: "break-word", // Handles long logs gracefully
                }}
              >
                {log}
              </Typography>
            ))
          ) : (
            <Typography
              sx={{
                fontFamily: `"Courier New", Courier, monospace`,
                color: "#AAAAAA", // Light gray for placeholder text
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Waiting for logs...
            </Typography>
          )}
        </Paper>
        <Button sx={styles.clearButton} onClick={handleClearLogs}>
          Clear Logs
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#1E1E1E", // Dark background for terminal-style
  },
  background: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  terminal: {
    width: "80%",
    height: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker background for terminal
    color: "#fff",
    padding: "10px",
    overflowY: "scroll",
    borderRadius: "6px",
    border: "1px solid #555", // Subtle border for the terminal
    backdropFilter: "blur(5px)", // Slight blur effect for modern UI
    position: "relative",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)", // Shadow for depth
  },
  overlayImage: {
    position: "absolute", // Covers the terminal
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.3, // Subtle overlay effect
    pointerEvents: "none", // Allows interaction with other elements
  },
  clearButton: {
    marginTop: "20px",
    backgroundColor: "#FF4500", // Bright red-orange for visibility
    color: "#fff",
    fontFamily: `"Courier New", Courier, monospace`,
    fontSize: "14px",
    padding: "10px 20px",
    borderRadius: "4px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#FF6347", // Softer red on hover
    },
  },
};

export default TicketLogs;
