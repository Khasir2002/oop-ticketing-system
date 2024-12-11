import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  AccountCircle,
  Logout,
  DeleteForever,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}

interface SideNavBarProps {
  menuItems: MenuItem[];
  onMenuSelect: (menuItem: string) => void;
  activeItem: string;
  username: string | null;
  onLogout: () => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  menuItems,
  onMenuSelect,
  activeItem,
  username,
  onLogout,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(() =>
    menuItems.reduce((acc, item) => {
      if (item.name === "Events") {
        acc[item.name] = true;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const handleSubMenuToggle = (menuName: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    setSnackbarMessage("Logged out successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/sign-in");
    }, 2000);
  };

  const handleTicketLogsClick = () => {
    window.open("/ticket-logs", "_blank");
  };

  const handleDeactivateAccount = async () => {
    try {
      const response = await axios.post("/api/deactivate-account", {
        username,
      });
      if (response.status === 200) {
        setSnackbarMessage("Account deactivated successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          onLogout();
          navigate("/sign-in");
        }, 2000);
      } else {
        throw new Error("Failed to deactivate account.");
      }
    } catch (error) {
      setSnackbarMessage("Error deactivating account. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSidebarCollapsed ? 72 : 240,
        "& .MuiDrawer-paper": {
          width: isSidebarCollapsed ? 72 : 240,
          backgroundColor: "#082444",
          color: "#fff",
          transition: "width 0.3s",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={2}
      >
        {!isSidebarCollapsed && (
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            TicketJet
          </Typography>
        )}
        {isSidebarCollapsed ? (
          <ChevronRight onClick={toggleSidebar} sx={{ color: "#fff" }} />
        ) : (
          <ChevronLeft onClick={toggleSidebar} sx={{ color: "#fff" }} />
        )}
      </Box>

      {/* Menu Items */}
      <Box mt={2}>
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <Button
              onClick={
                item.name === "Tickets Log"
                  ? handleTicketLogsClick
                  : item.subItems
                  ? () => handleSubMenuToggle(item.name)
                  : () => onMenuSelect(item.name)
              }
              startIcon={isSidebarCollapsed ? undefined : item.icon}
              fullWidth
              sx={{
                color: "white",
                justifyContent: isSidebarCollapsed ? "center" : "flex-start",
                textTransform: "none",
                fontWeight: activeItem === item.name ? "bold" : "medium",
                backgroundColor: activeItem === item.name ? "#1e3a8a" : undefined,
              }}
            >
              {!isSidebarCollapsed && item.name}
              {item.subItems &&
                (openSubMenus[item.name] ? <ExpandLess /> : <ExpandMore />)}
            </Button>
            {item.subItems && (
              <Collapse in={openSubMenus[item.name]} timeout="auto" unmountOnExit>
                {item.subItems.map((subItem) => (
                  <Button
                    key={subItem.name}
                    onClick={() => onMenuSelect(subItem.name)}
                    startIcon={isSidebarCollapsed ? undefined : subItem.icon}
                    fullWidth
                    sx={{
                      color: "white",
                      justifyContent: isSidebarCollapsed
                        ? "center"
                        : "flex-start",
                      textTransform: "none",
                      paddingLeft: isSidebarCollapsed ? 0 : 4,
                      fontWeight: activeItem === subItem.name ? "bold" : "medium",
                      backgroundColor:
                        activeItem === subItem.name ? "#1e3a8a" : undefined,
                    }}
                  >
                    {!isSidebarCollapsed && subItem.name}
                  </Button>
                ))}
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Profile Section */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 2,
          textAlign: "center",
          bgcolor: "#082444",
          borderTop: "1px solid #1e3a8a",
        }}
      >
        <Button
          startIcon={<AccountCircle />}
          fullWidth
          sx={{
            color: "white",
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            textTransform: "none",
          }}
        >
          {!isSidebarCollapsed && username ? `${username}` : "Profile"}
        </Button>
        <Button
          startIcon={<Logout />}
          onClick={handleLogout}
          fullWidth
          sx={{
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {!isSidebarCollapsed && "Logout"}
        </Button>
        <Button
          startIcon={<DeleteForever />}
          onClick={handleDeactivateAccount}
          fullWidth
          sx={{
            color: "#f44336",
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {!isSidebarCollapsed && "Deactivate Account"}
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default SideNavBar;
