import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import {
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaUmbrellaBeach,
} from "react-icons/fa";

// Background image
const backgroundImg =
  "https://cdn.flyfarint.com/WL/B2C/FFA2654/mainbannerimg.webp";

const FlightSearch = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tripType, setTripType] = useState("round-trip");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  return (
    <Box className="relative">
      {/* Background and Search Area */}
      <Box
        className="relative w-full overflow-hidden rounded-lg min-h-[500px]"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box className="absolute inset-0 bg-black opacity-30"></Box>

        {/* Tabs Container inside image */}
        <Box className="absolute top-8 left-0 right-0 z-20">
          <Box className="flex justify-center">
            <Box className="bg-white bg-opacity-90 backdrop-blur-sm space-x-6 rounded-xl shadow-lg p-2">
              <Box className="flex justify-center gap-6 flex-wrap">
                {/* Tabs */}
                <Box
                  onClick={() => handleTabChange(0)}
                  className={`cursor-pointer rounded-full flex items-center gap-2 px-6 py-2 transition duration-300 ${
                    tabValue === 0
                      ? "bg-green-500 text-white"
                      : "bg-white text-green-500 shadow-md"
                  }`}
                >
                  <FaPlane className="text-lg" />
                  <span className="font-semibold">FLIGHT</span>
                </Box>
                {/* Repeat for other tabs */}
                <Box
                  onClick={() => handleTabChange(1)}
                  className={`cursor-pointer rounded-full flex items-center gap-2 px-6 py-2 transition duration-300 ${
                    tabValue === 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 shadow-md"
                  }`}
                >
                  <FaHotel className="text-lg" />
                  <span className="font-semibold">HOTEL</span>
                </Box>
                <Box
                  onClick={() => handleTabChange(2)}
                  className={`cursor-pointer rounded-full flex items-center gap-2 px-6 py-2 transition duration-300 ${
                    tabValue === 2
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-yellow-500 shadow-md"
                  }`}
                >
                  <FaUmbrellaBeach className="text-lg" />
                  <span className="font-semibold">TOUR</span>
                </Box>
                <Box
                  onClick={() => handleTabChange(3)}
                  className={`cursor-pointer rounded-full flex items-center gap-2 px-6 py-2 transition duration-300 ${
                    tabValue === 3
                      ? "bg-pink-500 text-white"
                      : "bg-white text-pink-500 shadow-md"
                  }`}
                >
                  <FaPassport className="text-lg" />
                  <span className="font-semibold">VISA</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="relative z-10 mx-auto p-2 h-full flex items-center mt-32 w-full px-8">
          {tabValue === 0 && (
            <div className="flex flex-row">
              {/* Left Card - Search Options */}
              <div className="flex-1">
                <Paper
                  elevation={3}
                  className="w-full p-6 bg-white rounded-lg shadow-xl h-full relative"
                >
                  {/* Trip Type Radio Buttons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {["round-way", "one-way", "multi-city"].map((type) => (
                      <label key={type} className="flex items-center space-x-1">
                        <input
                          type="radio"
                          value={type}
                          checked={tripType === type}
                          onChange={() => setTripType(type)}
                          className="form-radio h-4 w-4 text-green-500"
                        />
                        <span className="text-sm text-gray-700">
                          {type.replace("-", " ").toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-12">
                    {/* From Section */}
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="text-gray-500 font-bold mb-1">FROM</div>
                        <div className="text-4xl font-bold text-green-500">
                          DAC
                        </div>

                        <TextField
                          fullWidth
                          placeholder="Hazrat Shahjalal Intl Airport (DAC)"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaMapMarkerAlt color="#35C77B" />
                              </InputAdornment>
                            ),
                          }}
                          className="bg-blue-100 rounded-md mt-2"
                        />

                        <TextField
                          fullWidth
                          type="date"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaCalendarAlt color="#35C77B" />
                              </InputAdornment>
                            ),
                          }}
                          className="bg-blue-100 rounded-md mt-2"
                        />
                      </div>
                    </div>

                    {/* Transfer Icon */}
                    <BiTransferAlt
                      style={{ fontSize: "60px", color: "#35C77B" }}
                    />

                    {/* To Section */}
                    <div className="flex-1">
                      <div className="text-center">
                        <div className="text-gray-500 font-bold mb-1">TO</div>
                        <div className="text-4xl font-bold text-green-500">
                          CXB
                        </div>

                        <TextField
                          fullWidth
                          placeholder="Cox's Bazar Airport (CXB)"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaMapMarkerAlt color="#35C77B" />
                              </InputAdornment>
                            ),
                          }}
                          className="bg-blue-100 rounded-md mt-2"
                        />

                        <TextField
                          fullWidth
                          type="date"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FaCalendarAlt color="#35C77B" />
                              </InputAdornment>
                            ),
                          }}
                          className="bg-blue-100 rounded-md mt-2"
                          disabled={tripType === "one-way"}
                        />
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>

              {/* Right Card - Passenger and Search Options */}
              <Grid item xs={12} md={4} style={{ minWidth: 0 }}>
                <Paper
                  elevation={3}
                  className="w-full p-6 bg-white rounded-lg shadow-xl h-full"
                >
                  <Box className="flex flex-col h-full justify-between">
                    <Box>
                      <div className="text-gray-500 font-bold mb-2">
                        PASSENGERS & CLASS
                      </div>

                      <FormControl fullWidth size="small" className="mb-4">
                        <Select
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          className="bg-blue-100 rounded-md"
                        >
                          {[...Array(10)].map((_, i) => (
                            <MenuItem key={i} value={i + 1}>
                              {i + 1} ADULT
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small" className="mb-4">
                        <Select
                          value={children}
                          onChange={(e) => setChildren(e.target.value)}
                          className="bg-blue-100 rounded-md"
                        >
                          {[...Array(10)].map((_, i) => (
                            <MenuItem key={i} value={i}>
                              {i} CHILD
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small" className="mb-4">
                        <Select
                          value={infants}
                          onChange={(e) => setInfants(e.target.value)}
                          className="bg-blue-100 rounded-md"
                        >
                          {[...Array(10)].map((_, i) => (
                            <MenuItem key={i} value={i}>
                              {i} INFANT
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small" className="mb-6">
                        <Select
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value)}
                          className="bg-blue-100 rounded-md"
                        >
                          <MenuItem value="Economy">Economy</MenuItem>
                          <MenuItem value="Premium Economy">
                            Premium Economy
                          </MenuItem>
                          <MenuItem value="Business">Business</MenuItem>
                          <MenuItem value="First Class">First Class</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
                      size="large"
                    >
                      SEARCH FOR FLIGHT
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FlightSearch;
