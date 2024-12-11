import React from "react";
import { Box } from "@mui/material";
import SideNavBar from "./SideNavBar";

interface AppLayoutProps {
  children: React.ReactNode;
  menuItems: any[];
  onMenuSelect: (menuItem: string) => void;
  activeItem: string;
  username: string | null;
  onLogout: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  menuItems,
  onMenuSelect,
  activeItem,
  username,
  onLogout,
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideNavBar
        menuItems={menuItems}
        onMenuSelect={onMenuSelect}
        activeItem={activeItem}
        username={username}
        onLogout={onLogout}
      />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
