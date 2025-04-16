import { createContext, useContext, useState } from "react";
import ONEWAY from "./ONEWAY.json";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights] = useState([ONEWAY]); // Add more flights as needed
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  const searchFlights = (params) => {
    const filtered = flights.filter((flight) => {
      const totalPassengers = params.adults + params.children;
      const matchesClass = flight.class === params.travelClass;
      const matchesSeats = parseInt(flight.seat) >= totalPassengers;
      const matchesRoute =
        flight.godeparture === params.from && flight.goarrival === params.to;

      const flightDate = new Date(flight.segments.go[0].departureTime)
        .toISOString()
        .split("T")[0];
      const matchesDate = flightDate === params.departureDate;

      if (params.tripType === "round-trip") {
        const returnDate = new Date(flight.segments.back[0].departureTime)
          .toISOString()
          .split("T")[0];
        return (
          matchesRoute &&
          matchesDate &&
          returnDate === params.returnDate &&
          matchesClass &&
          matchesSeats
        );
      }

      return matchesRoute && matchesDate && matchesClass && matchesSeats;
    });

    setSearchParams(params);
    setSearchResults(filtered);
  };

  return (
    <FlightContext.Provider
      value={{ searchResults, searchFlights, searchParams }}
    >
      {children}
    </FlightContext.Provider>
  );
};
export const useFlightContext = () => useContext(FlightContext);
