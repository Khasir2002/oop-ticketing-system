import React, { useState } from "react";
import { Box, Drawer, Typography, Button, Collapse } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}

interface SideNavBarProps {
  menuItems: MenuItem[];
  onMenuSelect: (menuItem: string) => void;
  activeItem: string;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  menuItems,
  onMenuSelect,
  activeItem,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize `openSubMenus` with the expanded status for the "Events" menu
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(() =>
    menuItems.reduce((acc, item) => {
      if (item.name === "Events") {
        acc[item.name] = true; // Expand "Events" by default
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const handleSubMenuToggle = (menuName: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={2}
      >
        {!isSidebarCollapsed && (
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
            TicketJet
          </Typography>
        )}
        {isSidebarCollapsed ? (
          <ChevronRight onClick={toggleSidebar} sx={{ color: "#fff" }} />
        ) : (
          <ChevronLeft onClick={toggleSidebar} sx={{ color: "#fff" }} />
        )}
      </Box>
      <Box mt={2}>
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <Button
              onClick={
                item.subItems
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
              <Collapse
                in={openSubMenus[item.name]}
                timeout="auto"
                unmountOnExit
              >
                {item.subItems.map((subItem) => (
                  <Button
                    key={subItem.name}
                    onClick={() => onMenuSelect(subItem.name)}
                    startIcon={isSidebarCollapsed ? undefined : subItem.icon}
                    fullWidth
                    sx={{
                      color: "white",
                      justifyContent: isSidebarCollapsed ? "center" : "flex-start",
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
    </Drawer>
  );
};

export default SideNavBar;
