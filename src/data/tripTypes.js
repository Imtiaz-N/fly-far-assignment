export const TRIP_TYPES = {
  ROUND_TRIP: 'roundTrip',
  ONE_WAY: 'oneWay',
  MULTI_CITY: 'multiCity',
}

export const UI_TRIP_TYPES = {
  'round-trip': TRIP_TYPES.ROUND_TRIP,
  'one-way': TRIP_TYPES.ONE_WAY,
  'multi-city': TRIP_TYPES.MULTI_CITY,
}

export const getReduxTripType = (uiType) => {
  return UI_TRIP_TYPES[uiType] || TRIP_TYPES.ROUND_TRIP
}
