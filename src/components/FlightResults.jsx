import {
  Button,
  CircularProgress,
  Paper,
  Drawer,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  selectError,
  selectFlightData,
  selectIsLoading,
} from "../redux/features/flightSearch/flightSlice";

const FlightResults = () => {
  const flightData = useSelector(selectFlightData);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setIsDrawerOpen(true);
  };

  const drawerContent = (
    <Box sx={{ width: 400, padding: 3 }}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Flight Details</Typography>
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </div>

      {selectedFlight && (
        <div className="space-y-4">
          <div>
            <Typography variant="subtitle1">
              Airline: {selectedFlight.careerName}
            </Typography>
            <Typography variant="body2">
              Class: {selectedFlight.class}
            </Typography>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <Typography variant="subtitle2">Flight Information</Typography>
            <div className="flex justify-between mt-2">
              <div>
                <Typography variant="body2">
                  Departure: {selectedFlight.godeparture}
                </Typography>
                <Typography variant="body2">
                  Time: {selectedFlight.godepartureTime}
                </Typography>
                <Typography variant="body2">
                  Date: {selectedFlight.godepartureDate}
                </Typography>
              </div>
              <div>
                <Typography variant="body2">
                  Arrival: {selectedFlight.goarrival}
                </Typography>
                <Typography variant="body2">
                  Time: {selectedFlight.goarrivalTime}
                </Typography>
                <Typography variant="body2">
                  Date: {selectedFlight.goarrivalDate}
                </Typography>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <Typography variant="subtitle2">Duration & Stops</Typography>
            <Typography variant="body2">
              Flight Duration: {selectedFlight.goflightduration}
            </Typography>
            <Typography variant="body2">
              Stops: {selectedFlight.gostop}
            </Typography>
            {selectedFlight.gostop > 0 && (
              <Typography variant="body2">
                Via: {selectedFlight.govia}
              </Typography>
            )}
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <Typography variant="subtitle2">Pricing</Typography>
            <Typography variant="body2">
              Base Fare: {selectedFlight.baseFare} {selectedFlight.farecurrency}
            </Typography>
            <Typography variant="body2">
              Tax: {selectedFlight.tax} {selectedFlight.farecurrency}
            </Typography>
            <Typography variant="body2">
              Total: {selectedFlight.customerPrice}{" "}
              {selectedFlight.farecurrency}
            </Typography>
          </div>

          {selectedFlight.returnFlight && (
            <div className="bg-gray-100 p-3 rounded">
              <Typography variant="subtitle2">Return Flight Details</Typography>
              {/* Add return flight details here */}
            </div>
          )}
        </div>
      )}
    </Box>
  );

  // Rest of the component remains the same until the return statement
  // ... [keep the existing loading/error handling code]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Flights</h1>
      <div className="space-y-4">
        {flightData.map((flight) => (
          <Paper key={flight.uId} className="p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{flight.careerName}</h3>
                <p className="text-gray-600">{flight.class}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {flight.customerPrice} {flight.farecurrency}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(flight)}
                  >
                    View Details
                  </Button>
                  <Button variant="contained" color="primary">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <p className="font-semibold">{flight.godeparture}</p>
                <p>{flight.godepartureTime}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">{flight.goflightduration}</p>
              </div>
              <div>
                <p className="font-semibold">{flight.goarrival}</p>
                <p>{flight.goarrivalTime}</p>
              </div>
            </div>
          </Paper>
        ))}
      </div>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default FlightResults;
