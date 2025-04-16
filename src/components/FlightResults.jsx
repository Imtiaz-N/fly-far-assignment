import { Button, CircularProgress, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectError,
  selectFlightData,
  selectIsLoading,
} from '../redux/features/flightSearch/flightSlice'

const FlightResults = () => {
  const flightData = useSelector(selectFlightData)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <CircularProgress color='primary' />
        <p className='mt-4'>Searching for flights...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h2 className='text-2xl mb-4 text-red-600'>Error: {error}</h2>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!flightData || flightData.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h2 className='text-2xl mb-4'>No flights found</h2>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >
          Search Again
        </Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Available Flights</h1>
      <div className='space-y-4'>
        {flightData.map((flight) => (
          <Paper key={flight.uId} className='p-4 mb-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='text-xl font-semibold'>{flight.careerName}</h3>
                <p className='text-gray-600'>{flight.class}</p>
              </div>
              <div className='text-right'>
                <p className='text-2xl font-bold text-green-600'>
                  {flight.customerPrice} {flight.farecurrency}
                </p>
                <Button variant='contained' color='primary' className='mt-2'>
                  Book Now
                </Button>
              </div>
            </div>
            <div className='flex justify-between mt-4'>
              <div>
                <p className='font-semibold'>{flight.godeparture}</p>
                <p>{flight.godepartureTime}</p>
              </div>
              <div className='text-center'>
                <p className='text-gray-500'>{flight.goflightduration}</p>
              </div>
              <div>
                <p className='font-semibold'>{flight.goarrival}</p>
                <p>{flight.goarrivalTime}</p>
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  )
}

export default FlightResults
