import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}));

const NavLink = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  color: "#000000",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  borderRadius: "20px",
  padding: "5px 20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#0d6efd" }}
        >
          Ticket <span style={{ color: "#ffffff" }}>Jet</span>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <NavLink onClick={handleMenuOpen} endIcon={<ArrowDropDownIcon />}>
            Events
          </NavLink>
          <NavLink>Theater</NavLink>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button sx={{ fontWeight: "bold", textTransform: "none" }}>
            Register
          </Button>
          <SignInButton startIcon={<AccountCircleIcon />}>
            Sign In
          </SignInButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Concerts</MenuItem>
          <MenuItem onClick={handleMenuClose}>Festivals</MenuItem>
          <MenuItem onClick={handleMenuClose}>Workshops</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
