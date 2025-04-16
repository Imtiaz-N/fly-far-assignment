import React from 'react'
import { Toaster } from 'sonner'
import FlightSearch from './components/FlightSearch'
import HotDeals from './components/HotDeals'
import Promotion from './components/Promotion'

function App() {
  return (
    <>
      <Toaster position='top-right' richColors />
      <main className='container mx-auto px-4 py-8'>
        <FlightSearch />
      </main>
      <Promotion />
      <HotDeals />
    </>
  )
}

export default App
