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
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import HotelSearch from "./HotelSearch";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaUmbrellaBeach,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

// Expanded airport list with international airports
const airports = [
  {
    city: "Dhaka",
    country: "BANGLADESH",
    name: "Hazrat Shahjalal Intl Airport",
    code: "DAC",
  },
  {
    city: "Dubai",
    country: "UNITED ARAB EMIRATES",
    name: "Dubai Intl Airport",
    code: "DXB",
  },
  {
    city: "Cox's Bazar",
    country: "Bangladesh",
    name: "Cox's Bazar Airport",
    code: "CXB",
  },
  {
    city: "Jeddah",
    country: "SAUDI ARABIA",
    name: "King Abdulaziz Intl Airport",
    code: "JED",
  },
  {
    city: "Riyadh",
    country: "SAUDI ARABIA",
    name: "King Khalid Intl Airport",
    code: "RUH",
  },
  {
    city: "Jashore",
    country: "Bangladesh",
    name: "Jashore Airport",
    code: "JSR",
  },
  {
    city: "Barishal",
    country: "Bangladesh",
    name: "Barishal Airport",
    code: "BZL",
  },
  {
    city: "Rajshahi",
    country: "Bangladesh",
    name: "Rajshahi Airport",
    code: "RJH",
  },
  {
    city: "Saidpur",
    country: "Bangladesh",
    name: "Saidpur Airport",
    code: "SPD",
  },
  {
    city: "Doha",
    country: "QATAR",
    name: "Hamad Intl Airport",
    code: "DOH",
  },
  {
    city: "Abu Dhabi",
    country: "UNITED ARAB EMIRATES",
    name: "Abu Dhabi Intl Airport",
    code: "AUH",
  },
  {
    city: "Istanbul",
    country: "TURKEY",
    name: "Istanbul Airport",
    code: "IST",
  },
  {
    city: "Kuala Lumpur",
    country: "MALAYSIA",
    name: "Kuala Lumpur Intl Airport",
    code: "KUL",
  },
];

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// Get today's date and 2 days later for default dates
const today = new Date();
const twoDaysLater = new Date();
twoDaysLater.setDate(today.getDate() + 2);

// Background image
const backgroundImg =
  "https://cdn.flyfarint.com/WL/B2C/FFA2654/mainbannerimg.webp";

const FlightSearch = () => {
  // State for single trip
  const [fromAirport, setFromAirport] = useState(airports[0]); // Default to DAC
  const [toAirport, setToAirport] = useState(airports[2]); // Default to CXB
  const [departureDate, setDepartureDate] = useState(formatDate(today));
  const [returnDate, setReturnDate] = useState(formatDate(twoDaysLater));

  // State for multi-city
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: airports[0], to: airports[3], date: formatDate(today) }, // DAC to JED
    { from: airports[3], to: airports[1], date: formatDate(twoDaysLater) }, // JED to DXB
  ]);

  // Common state
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [tripType, setTripType] = useState("round-trip");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const filteredFromAirports = airports.filter((airport) =>
    `${airport.city} ${airport.country} ${airport.name} ${airport.code}`
      .toLowerCase()
      .includes(searchTermFrom.toLowerCase())
  );

  const filteredToAirports = airports.filter((airport) =>
    `${airport.city} ${airport.country} ${airport.name} ${airport.code}`
      .toLowerCase()
      .includes(searchTermTo.toLowerCase())
  );

  // Multi-city functions
  const addFlightSegment = () => {
    setMultiCityFlights([
      ...multiCityFlights,
      {
        from: airports[0],
        to: airports[1],
        date: formatDate(
          new Date(multiCityFlights[multiCityFlights.length - 1].date).setDate(
            new Date(
              multiCityFlights[multiCityFlights.length - 1].date
            ).getDate() + 2
          )
        ),
      },
    ]);
  };

  const removeFlightSegment = (index) => {
    const updated = [...multiCityFlights];
    updated.splice(index, 1);
    setMultiCityFlights(updated);
  };

  const updateFlightSegment = (index, field, value) => {
    const updated = [...multiCityFlights];
    updated[index][field] = value;
    setMultiCityFlights(updated);
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
            <div className="flex flex-row w-full gap-0">
              {/* Left Card */}
              <div className="flex-1">
                <Paper
                  elevation={3}
                  className="w-full p-6 bg-white rounded-lg shadow-xl h-full relative"
                >
                  {/* Trip Type Radio Buttons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {["round-trip", "one-way", "multi-city"].map((type) => (
                      <label key={type} className="flex items-center space-x-1">
                        <input
                          type="radio"
                          value={type}
                          checked={tripType === type}
                          onChange={() => handleTripTypeChange(type)}
                          className="form-radio h-4 w-4 text-green-500"
                        />
                        <span className="text-sm text-gray-700">
                          {type.replace("-", " ").toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>

                  {tripType !== "multi-city" ? (
                    <div className="flex items-center justify-between mt-12">
                      {/* From Section */}
                      <div className="flex-1">
                        <div className="text-center">
                          <div className="text-gray-500 font-bold mb-1">
                            FROM
                          </div>
                          <div className="text-4xl font-bold text-green-500">
                            {fromAirport.code}
                          </div>

                          <Autocomplete
                            open={openFrom}
                            onOpen={() => setOpenFrom(true)}
                            onClose={() => setOpenFrom(false)}
                            options={filteredFromAirports}
                            getOptionLabel={(option) =>
                              `${option.city}, ${option.country} - ${option.name} (${option.code})`
                            }
                            value={fromAirport}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                setFromAirport(newValue);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                placeholder="Search airport..."
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  setSearchTermFrom(e.target.value)
                                }
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FaMapMarkerAlt color="#35C77B" />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  backgroundColor: "#EBF5FF",
                                  borderRadius: "6px",
                                  marginTop: "16px",
                                  marginBottom: "12px",
                                }}
                              />
                            )}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <div>
                                  <div className="font-semibold">
                                    {option.city}, {option.country}
                                  </div>
                                  <div className="text-sm">
                                    {option.name} ({option.code})
                                  </div>
                                </div>
                              </li>
                            )}
                          />

                          <TextField
                            fullWidth
                            type="date"
                            variant="outlined"
                            size="small"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FaCalendarAlt color="#35C77B" />
                                </InputAdornment>
                              ),
                            }}
                            className="bg-blue-100 rounded-md mt-4"
                          />
                        </div>
                      </div>

                      {/* Flight Icons */}
                      <div
                        className="flex flex-col mx-4"
                        style={{
                          gap: "4px",
                          marginTop: "-12px",
                          transform: "translateY(-8px)",
                        }}
                      >
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="#32d095"
                          style={{ transform: "rotate(90deg)" }}
                        >
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                        </svg>
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#32d095"
                          strokeWidth="2"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                        </svg>
                      </div>

                      {/* To Section */}
                      <div className="flex-1">
                        <div className="text-center">
                          <div className="text-gray-500 font-bold mb-1">TO</div>
                          <div className="text-4xl font-bold text-green-500">
                            {toAirport.code}
                          </div>

                          <Autocomplete
                            open={openTo}
                            onOpen={() => setOpenTo(true)}
                            onClose={() => setOpenTo(false)}
                            options={filteredToAirports}
                            getOptionLabel={(option) =>
                              `${option.city}, ${option.country} - ${option.name} (${option.code})`
                            }
                            value={toAirport}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                setToAirport(newValue);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                placeholder="Search airport..."
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  setSearchTermTo(e.target.value)
                                }
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FaMapMarkerAlt color="#35C77B" />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  backgroundColor: "#EBF5FF",
                                  borderRadius: "6px",
                                  marginTop: "16px",
                                  marginBottom: "12px",
                                }}
                              />
                            )}
                            renderOption={(props, option) => (
                              <li {...props}>
                                <div>
                                  <div className="font-semibold">
                                    {option.city}, {option.country}
                                  </div>
                                  <div className="text-sm">
                                    {option.name} ({option.code})
                                  </div>
                                </div>
                              </li>
                            )}
                          />

                          {tripType === "round-trip" && (
                            <TextField
                              fullWidth
                              type="date"
                              variant="outlined"
                              size="small"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FaCalendarAlt color="#35C77B" />
                                  </InputAdornment>
                                ),
                              }}
                              className="bg-blue-100 rounded-md mt-4"
                              inputProps={{
                                min: departureDate, // Don't allow return before departure
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Multi-city section
                    <div className="mt-12">
                      {multiCityFlights.map((flight, index) => (
                        <div key={index} className="mb-6 relative">
                          {index > 0 && (
                            <div className="flex justify-center my-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <FaPlane className="text-green-500 rotate-90" />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {/* From */}
                            <div className="flex-1 mr-4">
                              <div className="text-gray-500 font-bold mb-1">
                                FROM
                              </div>
                              <Autocomplete
                                options={airports}
                                getOptionLabel={(option) =>
                                  `${option.city}, ${option.country} - ${option.name} (${option.code})`
                                }
                                value={flight.from}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    updateFlightSegment(
                                      index,
                                      "from",
                                      newValue
                                    );
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="From airport..."
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                      ...params.InputProps,
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <FaMapMarkerAlt color="#35C77B" />
                                        </InputAdornment>
                                      ),
                                    }}
                                    sx={{
                                      backgroundColor: "#EBF5FF",
                                      borderRadius: "6px",
                                    }}
                                  />
                                )}
                              />
                            </div>

                            {/* To */}
                            <div className="flex-1 ml-4">
                              <div className="text-gray-500 font-bold mb-1">
                                TO
                              </div>
                              <Autocomplete
                                options={airports}
                                getOptionLabel={(option) =>
                                  `${option.city}, ${option.country} - ${option.name} (${option.code})`
                                }
                                value={flight.to}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    updateFlightSegment(index, "to", newValue);
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="To airport..."
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                      ...params.InputProps,
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <FaMapMarkerAlt color="#35C77B" />
                                        </InputAdornment>
                                      ),
                                    }}
                                    sx={{
                                      backgroundColor: "#EBF5FF",
                                      borderRadius: "6px",
                                    }}
                                  />
                                )}
                              />
                            </div>

                            {/* Date */}
                            <div className="flex-1 ml-4">
                              <div className="text-gray-500 font-bold mb-1">
                                DATE
                              </div>
                              <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                size="small"
                                value={flight.date}
                                onChange={(e) =>
                                  updateFlightSegment(
                                    index,
                                    "date",
                                    e.target.value
                                  )
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <FaCalendarAlt color="#35C77B" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="bg-blue-100 rounded-md"
                                inputProps={{
                                  min:
                                    index > 0
                                      ? formatDate(
                                          new Date(
                                            multiCityFlights[index - 1].date
                                          ).setDate(
                                            new Date(
                                              multiCityFlights[index - 1].date
                                            ).getDate() + 1
                                          )
                                        )
                                      : undefined,
                                }}
                              />
                            </div>

                            {/* Remove button (except first segment) */}
                            {index > 0 && (
                              <IconButton
                                onClick={() => removeFlightSegment(index)}
                                sx={{ ml: 2, mt: 2 }}
                              >
                                <FaTimes color="red" />
                              </IconButton>
                            )}
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outlined"
                        startIcon={<FaPlus />}
                        onClick={addFlightSegment}
                        sx={{
                          mt: 2,
                          color: "#32d095",
                          borderColor: "#32d095",
                          "&:hover": {
                            borderColor: "#2ab583",
                          },
                        }}
                      >
                        ADD ANOTHER CITY
                      </Button>
                    </div>
                  )}
                </Paper>
              </div>

              {/* Vertical Dotted Line */}
              <div className="border-l-2 border-dotted border-[#32d095] h-[400px] my-auto" />

              {/* Right Card */}
              <Grid item xs={12} md={4} style={{ minWidth: 0 }}>
                <Paper
                  elevation={3}
                  className="w-full p-6 bg-white rounded-lg shadow-xl h-full"
                >
                  <Box className="flex flex-col h-full justify-between">
                    <Box>
                      <div className="flex flex-col md:flex-row md:gap-4">
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
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
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                          <Select
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                            className="bg-blue-100 rounded-md"
                          >
                            {[...Array(5)].map((_, i) => (
                              <MenuItem key={i} value={i}>
                                {i} CHILD
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                          <Select
                            value={infants}
                            onChange={(e) => setInfants(e.target.value)}
                            className="bg-blue-100 rounded-md"
                          >
                            {[...Array(5)].map((_, i) => (
                              <MenuItem key={i} value={i}>
                                {i} INFANT
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <FormControl fullWidth size="small" className="mb-8 mt-4">
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
                      size="large"
                      sx={{
                        backgroundColor: "#32d095",
                        "&:hover": {
                          backgroundColor: "#2ab583",
                        },
                        color: "#ffffff",
                        paddingY: "12px",
                        borderRadius: "0.5rem",
                      }}
                    >
                      SEARCH FOR FLIGHT
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </div>
          )}
          {tabValue === 1 && <HotelSearch />}
        </Box>
      </Box>
    </Box>
  );
};

export default FlightSearch;
