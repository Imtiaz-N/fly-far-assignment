import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaPlus,
  FaTimes,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getReduxTripType } from "../data/tripTypes";
import {
  fetchFlightData,
  selectAirports,
  selectPassengerLimits,
  selectSelectedArrival,
  selectSelectedDeparture,
  setSelectedArrival,
  setSelectedDeparture,
  setTripType,
  updatePassengerLimits,
} from "../redux/features/flightSearch/flightSlice";
import HotelSearch from "./HotelSearch";

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

const today = new Date();
const twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);

// Background image
const backgroundImg =
  "https://cdn.flyfarint.com/WL/B2C/FFA2654/mainbannerimg.webp";

const AirportSelector = ({
  label,
  value,
  onChange,
  options,
  open,
  onOpen,
  onClose,
  onSearchChange,
}) => (
  <div className="text-center">
    <div className="text-gray-500 font-bold mb-1">{label}</div>
    <div className="text-4xl font-bold text-green-500">{value.code}</div>

    <Autocomplete
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      options={options}
      getOptionLabel={(option) =>
        `${option.city}, ${option.country} - ${option.name} (${option.code})`
      }
      value={value}
      onChange={(event, newValue) => {
        if (newValue) onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          placeholder="Search airport..."
          variant="outlined"
          size="small"
          onChange={(e) => onSearchChange(e.target.value)}
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
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li key={key} {...otherProps}>
            <div>
              <div className="font-semibold">
                {option.city}, {option.country}
              </div>
              <div className="text-sm">
                {option.name} ({option.code})
              </div>
            </div>
          </li>
        );
      }}
    />
  </div>
);

const DateSelector = ({ value, onChange, minDate, label }) => {
  const getMinReturnDate = (departureDate) => {
    const nextDay = new Date(departureDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return formatDate(nextDay);
  };

  return (
    <TextField
      fullWidth
      type="date"
      variant="outlined"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaCalendarAlt color="#35C77B" />
          </InputAdornment>
        ),
      }}
      className="bg-blue-100 rounded-md mt-4"
      inputProps={{
        min: label === "return" ? getMinReturnDate(minDate) : minDate,
      }}
    />
  );
};

const PassengerSelector = ({ value, onChange, options }) => (
  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-blue-100 rounded-md"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FlightSearch = () => {
  const navigate = useNavigate();
  const airports = useSelector(selectAirports);
  const selectedDeparture = useSelector(selectSelectedDeparture);
  const selectedArrival = useSelector(selectSelectedArrival);
  const dispatch = useDispatch();

  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [tripType, setLocalTripType] = useState("round-trip");
  const [departureDate, setDepartureDateLocal] = useState(formatDate(today));
  const [returnDate, setReturnDateLocal] = useState(formatDate(twoDaysLater));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");
  const [multiCityFlights, setMultiCityFlights] = useState([
    {
      from: airports[0],
      to: airports[2],
      date: formatDate(today),
    },
    {
      from: airports[2],
      to: airports[0],
      date: formatDate(twoDaysLater),
    },
  ]);

  const passengerLimits = useSelector(selectPassengerLimits);

  const handleTabChange = (newValue) => setTabValue(newValue);
  const handleTripTypeChange = (type) => {
    setLocalTripType(type);
    const reduxTripType = getReduxTripType(type);
    dispatch(setTripType(reduxTripType));
  };

  const filteredFromAirports = useMemo(
    () =>
      airports.filter((airport) =>
        `${airport.city || ""} ${airport.country || ""} ${airport.name || ""} ${
          airport.code || ""
        }`
          .toLowerCase()
          .includes(searchTermFrom.toLowerCase())
      ),
    [searchTermFrom]
  );

  const filteredToAirports = useMemo(
    () =>
      airports.filter((airport) =>
        `${airport.city || ""} ${airport.country || ""} ${airport.name || ""} ${
          airport.code || ""
        }`
          .toLowerCase()
          .includes(searchTermTo.toLowerCase())
      ),
    [searchTermTo]
  );

  // Multi-city functions
  const addFlightSegment = () => {
    const lastSegment = multiCityFlights[multiCityFlights.length - 1];
    const newFrom = lastSegment.to;

    // Determine new destination based on previous destination
    const newTo =
      newFrom.code === "RUH" ? airports.find((a) => a.code === "DXB") : newFrom;

    // Calculate new date (2 days after last segment)
    const newDate = new Date(lastSegment.date);
    newDate.setDate(newDate.getDate() + 2);

    setMultiCityFlights([
      ...multiCityFlights,
      {
        from: newFrom,
        to: newTo,
        date: formatDate(newDate),
      },
    ]);
  };

  const removeFlightSegment = (index) => {
    setMultiCityFlights(multiCityFlights.filter((_, i) => i !== index));
  };

  const updateFlightSegment = (index, field, value) => {
    setMultiCityFlights(
      multiCityFlights.map((flight, i) =>
        i === index ? { ...flight, [field]: value } : flight
      )
    );
  };

  // Update passenger limits when route changes
  useEffect(() => {
    if (selectedDeparture && selectedArrival) {
      dispatch(
        updatePassengerLimits({
          fromCode: selectedDeparture.code,
          toCode: selectedArrival.code,
        })
      );
    }
  }, [selectedDeparture, selectedArrival, dispatch]);

  // Modified passenger options based on limits
  const adultOptions = Array.from(
    { length: passengerLimits.adults },
    (_, i) => ({
      value: i + 1,
      label: `${i + 1} ADULT`,
    })
  );

  const childOptions = Array.from(
    { length: passengerLimits.children + 1 },
    (_, i) => ({
      value: i,
      label: `${i} CHILD`,
    })
  );

  const infantOptions = Array.from(
    { length: Math.min(passengerLimits.infants + 1, adults) },
    (_, i) => ({
      value: i,
      label: `${i} INFANT`,
    })
  );

  const travelClassOptions = [
    { value: "Economy", label: "Economy" },
    { value: "Premium Economy", label: "Premium Economy" },
    { value: "Business", label: "Business" },
    { value: "First Class", label: "First Class" },
  ];

  const renderTab = (id, name, icon, color) => (
    <Box
      onClick={() => handleTabChange(id)}
      className={`cursor-pointer rounded-full flex items-center gap-2 px-6 py-2 transition duration-300 ${
        tabValue === id
          ? `bg-${color}-500 text-white`
          : `bg-white text-${color}-500 shadow-md`
      }`}
    >
      {icon}
      <span className="font-semibold">{name}</span>
    </Box>
  );

  // Modified search handler
  const handleSearch = async () => {
    if (!selectedDeparture || !selectedArrival || !departureDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const searchParams = {
      from: selectedDeparture.code,
      to: selectedArrival.code,
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : null,
      passengers: {
        adults,
        children,
        infants,
      },
      travelClass,
    };

    console.log("Dispatching flight search with params:", searchParams);

    // Dispatch and await the result
    const resultAction = await dispatch(
      fetchFlightData({
        tripType: tripType === "round-trip" ? "roundTrip" : "oneWay",
        searchParams,
      })
    );

    // Check if the action was fulfilled and if flights were found
    if (
      fetchFlightData.fulfilled.match(resultAction) &&
      resultAction.payload.flights.length > 0
    ) {
      toast.success("Flights found successfully");
      navigate("/flight-results"); // Navigate to results page
    } else if (fetchFlightData.fulfilled.match(resultAction)) {
      toast.warning("No flights found matching your criteria");
    } else {
      toast.error(resultAction.payload?.error || "Failed to search flights");
    }
  };

  // Add click handler to search button
  const handleSearchClick = () => {
    handleSearch();
  };

  // Modify the date change handlers
  const handleDepartureDateChange = (date) => {
    setDepartureDateLocal(date);

    // If return date is less than or equal to the new departure date
    // set return date to the next day
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    if (new Date(returnDate) <= new Date(date)) {
      setReturnDateLocal(formatDate(nextDay));
    }
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
                {renderTab(
                  0,
                  "FLIGHT",
                  <FaPlane className="text-lg" />,
                  "green"
                )}
                {renderTab(1, "HOTEL", <FaHotel className="text-lg" />, "blue")}
                {renderTab(
                  2,
                  "TOUR",
                  <FaUmbrellaBeach className="text-lg" />,
                  "yellow"
                )}
                {renderTab(
                  3,
                  "VISA",
                  <FaPassport className="text-lg" />,
                  "pink"
                )}
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
                        <AirportSelector
                          label="FROM"
                          value={selectedDeparture || airports[0]}
                          onChange={(airport) =>
                            dispatch(setSelectedDeparture(airport))
                          }
                          options={filteredFromAirports}
                          open={openFrom}
                          onOpen={() => setOpenFrom(true)}
                          onClose={() => setOpenFrom(false)}
                          // searchTerm={searchTermFrom}
                          onSearchChange={setSearchTermFrom}
                        />

                        <DateSelector
                          value={departureDate}
                          onChange={handleDepartureDateChange}
                          minDate={formatDate(today)}
                          label="departure"
                        />
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
                        <AirportSelector
                          label="TO"
                          value={selectedArrival || airports[2]}
                          onChange={(airport) =>
                            dispatch(setSelectedArrival(airport))
                          }
                          options={filteredToAirports}
                          open={openTo}
                          onOpen={() => setOpenTo(true)}
                          onClose={() => setOpenTo(false)}
                          // searchTerm={searchTermTo}
                          onSearchChange={setSearchTermTo}
                        />

                        {tripType === "round-trip" && (
                          <DateSelector
                            value={returnDate}
                            onChange={setReturnDateLocal}
                            minDate={departureDate}
                            label="return"
                          />
                        )}
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
                                  `${option.city || ""} ${
                                    option.country || ""
                                  } ${option.name || ""} ${option.code || ""}`
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
                                renderOption={(props, option) => {
                                  const { key, ...otherProps } = props;
                                  return (
                                    <li key={key} {...otherProps}>
                                      <div>
                                        <div className="font-semibold">
                                          {option.city || ""}{" "}
                                          {option.country || ""}
                                        </div>
                                        <div className="text-sm">
                                          {option.name || ""} (
                                          {option.code || ""})
                                        </div>
                                      </div>
                                    </li>
                                  );
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
                              <div className="text-gray-500 ml-4 font-bold mb-1">
                                TO
                              </div>
                              <div>
                                <div className="flex-1 flex-col ml-4">
                                  <Autocomplete
                                    options={airports}
                                    getOptionLabel={(option) =>
                                      `${option.city || ""} ${
                                        option.country || ""
                                      } ${option.name || ""} ${
                                        option.code || ""
                                      }`
                                    }
                                    value={flight.to}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        updateFlightSegment(
                                          index,
                                          "to",
                                          newValue
                                        );
                                      }
                                    }}
                                    renderOption={(props, option) => {
                                      const { key, ...otherProps } = props;
                                      return (
                                        <li key={key} {...otherProps}>
                                          <div>
                                            <div className="font-semibold">
                                              {option.city || ""}{" "}
                                              {option.country || ""}
                                            </div>
                                            <div className="text-sm">
                                              {option.name || ""} (
                                              {option.code || ""})
                                            </div>
                                          </div>
                                        </li>
                                      );
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
                                    sx={{
                                      mt: 1,
                                    }}
                                    inputProps={{
                                      min:
                                        index > 0
                                          ? formatDate(
                                              new Date(
                                                multiCityFlights[index - 1].date
                                              ).setDate(
                                                new Date(
                                                  multiCityFlights[
                                                    index - 1
                                                  ].date
                                                ).getDate() + 1
                                              )
                                            )
                                          : undefined,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {index > 1 && (
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
                        <PassengerSelector
                          value={adults}
                          onChange={setAdults}
                          options={adultOptions}
                        />
                        <PassengerSelector
                          value={children}
                          onChange={setChildren}
                          options={childOptions}
                        />
                        <PassengerSelector
                          value={infants}
                          onChange={setInfants}
                          options={infantOptions}
                        />
                      </div>

                      <FormControl fullWidth size="small" className="mb-8 mt-4">
                        <Select
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value)}
                          className="bg-blue-100 rounded-md"
                        >
                          {travelClassOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleSearchClick}
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
                      {tripType === "multi-city" && (
                        <Button
                          variant="outlined"
                          startIcon={<FaPlus />}
                          onClick={addFlightSegment}
                          sx={{
                            mt: 2,
                            width: "100%",
                            color: "#32d095",
                            borderColor: "#32d095",
                            "&:hover": {
                              borderColor: "#2ab583",
                            },
                          }}
                        >
                          ADD ANOTHER CITY
                        </Button>
                      )}
                    </Box>
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
