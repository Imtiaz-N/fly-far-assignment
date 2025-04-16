import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TRIP_TYPES } from "../../../data/tripTypes";
import oneWayData from "../../../data/ONEWAY";
import roundWayData from "../../../data/ROUNDWAY";

// Define airports data in the slice to avoid duplication
const airportsData = [
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

// Helper function to check if dates match
// const doDateMatch = (date1, date2) => {
//   const d1 = new Date(date1);
//   const d2 = new Date(date2);
//   return (
//     d1.getFullYear() === d2.getFullYear() &&
//     d1.getMonth() === d2.getMonth() &&
//     d1.getDate() === d2.getDate()
//   );
// };

export const fetchFlightData = createAsyncThunk(
  "flights/fetchFlightData",
  async ({ tripType, searchParams }, { rejectWithValue }) => {
    console.log("tripType", tripType);
    console.log("searchParams", searchParams);
    try {
      let flightData;
      if (tripType === "roundTrip") {
        // Use imported roundTripData directly
        flightData = roundWayData;
      } else {
        flightData = oneWayData;
      }

      console.log("flightData", flightData);
      const filteredFlights = flightData.filter((flight) => {
        console.log("searchParams", searchParams);
        const matchesRoute =
          flight.godeparture === searchParams.from &&
          flight.goarrival === searchParams.to;

        // const matchesDepartureDate = doDateMatch(
        //   flight.godepartureDate,
        //   searchParams.departureDate
        // );

        // const matchesReturnDate =
        //   tripType === "roundTrip"
        //     ? doDateMatch(flight.backdepartureDate, searchParams.returnDate)
        //     : true;

        // const hasEnoughSeats =
        //   parseInt(flight.seat) >=
        //   searchParams.passengers.adults + searchParams.passengers.children;

        const matchesClass =
          flight.class.toLowerCase() === searchParams.travelClass.toLowerCase();

        return (
          matchesRoute && matchesClass
          // (matchesDepartureDate ||
          //   matchesReturnDate ||
          //   hasEnoughSeats ||
          //   matchesClass)
        );
      });

      console.log("filteredFlights", filteredFlights);

      return {
        flights: filteredFlights,
        message:
          filteredFlights.length > 0
            ? "Flights found successfully"
            : "No flights found matching your criteria",
        searchCriteria: searchParams,
      };
    } catch (error) {
      return rejectWithValue({
        error: error.message || "An error occurred while fetching flight data",
        message: "Failed to fetch flight data",
        searchCriteria: searchParams,
      });
    }
  }
);

// Add new selector for route-based passenger limits
const getPassengerLimits = (fromCode, toCode) => {
  // Define route-specific passenger limits
  const routeLimits = {
    // Domestic routes
    "DAC-CXB": { adults: 9, children: 4, infants: 2 },
    "CXB-DAC": { adults: 9, children: 4, infants: 2 },
    "DAC-JSR": { adults: 7, children: 3, infants: 2 },
    "JSR-DAC": { adults: 7, children: 3, infants: 2 },
    // International routes
    "DAC-DXB": { adults: 5, children: 2, infants: 1 },
    "DXB-DAC": { adults: 5, children: 2, infants: 1 },
    "DAC-JED": { adults: 6, children: 3, infants: 1 },
    "JED-DAC": { adults: 6, children: 3, infants: 1 },
    // Default limits
    default: { adults: 9, children: 4, infants: 2 },
  };

  const routeKey = `${fromCode}-${toCode}`;
  return routeLimits[routeKey] || routeLimits.default;
};

const initialState = {
  flightData: null,
  airports: airportsData,
  isLoading: false,
  error: null,
  searchMessage: null,
  lastSearchCriteria: null,
  selectedDeparture: airportsData[0],
  selectedArrival: airportsData[2],
  tripType: TRIP_TYPES.ROUND_TRIP,
  departureDate: null,
  returnDate: null,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  travelClass: "Economy",
  passengerLimits: getPassengerLimits("DAC", "CXB"), // Default limits
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setTripType: (state, action) => {
      // Validate that we received a valid trip type
      const validTripTypes = Object.values(TRIP_TYPES);
      if (action.payload && validTripTypes.includes(action.payload)) {
        state.tripType = action.payload;
      }
    },
    // setSelectedDeparture: (state, action) => {
    //   state.selectedDeparture = action.payload.code
    // },
    // setSelectedArrival: (state, action) => {
    //   state.selectedArrival = action.payload.code
    // },

    setSelectedDeparture: (state, action) => {
      state.selectedDeparture = action.payload;
    },
    setSelectedArrival: (state, action) => {
      state.selectedArrival = action.payload;
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    setTravelClass: (state, action) => {
      state.travelClass = action.payload;
    },
    clearFlightSelections: (state) => {
      state.selectedDeparture = airportsData[0];
      state.selectedArrival = airportsData[2];
      state.flightData = null;
      state.departureDate = null;
      state.returnDate = null;
    },
    updatePassengerLimits: (state, action) => {
      const { fromCode, toCode } = action.payload;
      state.passengerLimits = getPassengerLimits(fromCode, toCode);
    },
    setPassengers: (state, action) => {
      const limits = state.passengerLimits;
      const newPassengers = { ...state.passengers, ...action.payload };

      // Validate against limits
      newPassengers.adults = Math.min(newPassengers.adults, limits.adults);
      newPassengers.children = Math.min(
        newPassengers.children,
        limits.children
      );
      newPassengers.infants = Math.min(newPassengers.infants, limits.infants);

      // Ensure infants don't exceed adults
      newPassengers.infants = Math.min(
        newPassengers.infants,
        newPassengers.adults
      );

      state.passengers = newPassengers;
    },
    setSearchMessage: (state, action) => {
      state.searchMessage = action.payload;
    },
    clearSearchResults: (state) => {
      state.flightData = null;
      state.searchMessage = null;
      state.lastSearchCriteria = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.searchMessage = "Searching for flights...";
        state.flightData = null; // Clear previous results while searching
      })
      .addCase(fetchFlightData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flightData = action.payload.flights;
        state.searchMessage = action.payload.message;
        state.lastSearchCriteria = action.payload.searchCriteria;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchFlightData.rejected, (state, action) => {
        state.isLoading = false;
        state.flightData = [];
        state.error = action.payload
          ? action.payload.error
          : "An unknown error occurred";
        state.searchMessage = action.payload
          ? action.payload.message
          : "Failed to fetch flight data";
        state.lastSearchCriteria = action.payload
          ? action.payload.searchCriteria
          : null;
      });
  },
});

// Export new action
export const {
  setTripType,
  setSelectedDeparture,
  setSelectedArrival,
  setDepartureDate,
  setReturnDate,
  setPassengers,
  setTravelClass,
  clearFlightSelections,
  updatePassengerLimits,
  setSearchMessage,
  clearSearchResults,
} = flightSlice.actions;

// Add new selector
export const selectPassengerLimits = (state) => state.flights.passengerLimits;

export const selectAirports = (state) => state.flights.airports;
export const selectSelectedDeparture = (state) =>
  state.flights.selectedDeparture;
export const selectSelectedArrival = (state) => state.flights.selectedArrival;
export const selectTripType = (state) => state.flights.tripType;
export const selectFlightData = (state) => state.flights.flightData;
export const selectIsLoading = (state) => state.flights.isLoading;
export const selectError = (state) => state.flights.error;
export const selectSearchMessage = (state) => state.flights.searchMessage;
export const selectLastSearchCriteria = (state) =>
  state.flights.lastSearchCriteria;

export default flightSlice.reducer;
