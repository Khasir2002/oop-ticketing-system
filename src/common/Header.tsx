import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";

// Styled components for the AppBar and Buttons
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  color: "#000000",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}));


const LogoImage = styled("img")({
  height: "60px",
  width: "100px",
  cursor: "pointer",
  
});

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

   
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser); 
        setUserName(user.name || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserName("Guest");
      }
    } else {
      setUserName("Guest");
    }
  }, []);

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoImage src={logo} alt="Ticket Jet" />
        </Box>
        {/* Right side: Logged-in User Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {userName ? (
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Hello, {userName}!
            </Typography>
          ) : (
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Please Log In
            </Typography>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
