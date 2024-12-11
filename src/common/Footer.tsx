import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn, YouTube, WhatsApp} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#20263e',
        color: '#fff',
        padding: '20px 40px',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Ticket Jet
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Ticket Jet is a platform that allows you to buy tickets for events happening in Sri Lanka.
            It is built for both customers and event organizers.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
            <IconButton color="inherit" href="#" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="LinkedIn">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="YouTube">
              <YouTube />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="WhatsApp">
              <WhatsApp />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Helpful Links
          </Typography>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block" sx={{ marginTop: 1 }}>
            Events
          </Link>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block">
            MyTickets Deals
          </Link>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block">
            My Account
          </Link>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block">
            Refund Policy
          </Link>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block" sx={{ marginTop: 1 }}>
            Who We Are
          </Link>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block">
            FAQ
          </Link>
          <Link href="#" color="inherit" underline="none" variant="body2" display="block">
            Contact Us
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <Link href="#" color="inherit" underline="none">
              WhatsApp (Text-only service)
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="mailto:support@mytickets.lk" color="inherit" underline="none">
              support@mytickets.lk
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
