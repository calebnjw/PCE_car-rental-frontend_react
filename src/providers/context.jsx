import React, { useReducer } from 'react';

import carReducer from '../reducer/carReducer.js';
import bookingReducer from '../reducer/bookingReducer.js';

export const CarStateContext = React.createContext();
export const BookingStateContext = React.createContext();

export default function GlobalContext({ children }) {
  const [carState, carDispatch] = useReducer(
    carReducer, { cars: [], carId: 1 },
  );
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    {
      bookings: [], bookingId: 1, startDate: '', endDate: '', email: '', firstName: '', lastName: '',
    },
  );

  return (
    <CarStateContext.Provider value={{ carState, carDispatch }}>
      <BookingStateContext.Provider value={{ bookingState, bookingDispatch }}>
        {children}
      </BookingStateContext.Provider>
    </CarStateContext.Provider>
  );
}
