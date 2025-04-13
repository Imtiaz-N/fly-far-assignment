import React from "react";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const destinations = [
  { label: "Dhaka, Bangladesh", value: "dhaka" },
  { label: "Cox's Bazar, Bangladesh", value: "cox" },
  { label: "Dubai, United Arab Emirates", value: "dubai" },
  { label: "Jashore, Bangladesh", value: "jashore" },
];

const HotelSearch = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 2, background: "#fff", boxShadow: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Destination */}
        <Grid item xs={12} md={3}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            DESTINATION
          </Typography>
          <Typography variant="h5" color="primary">
            DHAKA
          </Typography>
          <TextField
            fullWidth
            select
            size="small"
            value="dhaka"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="success" />
                </InputAdornment>
              ),
              style: { backgroundColor: "#e3f2fd" },
            }}
          >
            {destinations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Check-in */}
        <Grid item xs={12} md={2.5}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            CHECK IN
          </Typography>
          <Typography variant="h5" color="primary">
            13 APR, 2025
          </Typography>
          <TextField
            fullWidth
            size="small"
            value="13 Apr 25, Sunday"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon color="success" />
                </InputAdornment>
              ),
              style: { backgroundColor: "#e3f2fd" },
            }}
          />
        </Grid>

        {/* Check-out */}
        <Grid item xs={12} md={2.5}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            CHECK OUT
          </Typography>
          <Typography variant="h5" color="primary">
            13 APR, 2025
          </Typography>
          <TextField
            fullWidth
            size="small"
            value="13 Apr 25, Sunday"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon color="success" />
                </InputAdornment>
              ),
              style: { backgroundColor: "#e3f2fd" },
            }}
          />
        </Grid>

        {/* Guests & Rooms */}
        <Grid item xs={12} md={2}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Guests & Rooms
          </Typography>
          <TextField
            fullWidth
            size="small"
            value="1 ROOM, 1 GUESTS, 1 ADULTS"
            inputProps={{ readOnly: true }}
            sx={{ backgroundColor: "#e0e7ff" }}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: "100%", backgroundColor: "#28d39a" }}
          >
            SEARCH FOR HOTEL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelSearch;
