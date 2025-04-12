import Button from "@mui/material/Button";
import React from "react";
import Header from "./layout/Header";
import FlightSearch from "./components";
import Footer from "./components/Footer";
import HotDeals from "./components/HotDeals";
import Promotion from "./components/Promotion";
function App() {
  return (
    <div className="min-h-screen bg-[#edf2f6]">
      <Header />
      <div className="mt-28"></div> {/* Spacer for fixed header */}
      <main className="container mx-auto px-4 py-8">
        <FlightSearch />
      </main>
      <Promotion />
      <HotDeals />
      <Footer />
    </div>
  );
}

export default App;
