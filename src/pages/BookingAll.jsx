import React, {
  useContext,
  useState,
} from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import { CarStateContext, BookingStateContext } from '../providers/context.jsx';
import { setEmail, getBookings } from '../reducer/bookingReducer.js';

export default function BookingAll() {
  const navigate = useNavigate();

  const { carState } = useContext(CarStateContext);
  const { bookingState, bookingDispatch } = useContext(BookingStateContext);

  const handleEmailInput = (event) => {
    bookingDispatch(setEmail(event.target.value));
  };

  return (
    <div className='container'>
      <div className='sidebar'>
        <form className='search-form'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={handleEmailInput}
              value={bookingState.email}
              />
          </div>
          <button
            type={'submit'}
            onClick={async (event) => {
              event.preventDefault();
              bookingDispatch(await getBookings(bookingState.email));
            }}
          >Search</button>
        </form>
        <h3>Your Bookings</h3>
        {bookingState.bookings.length === 0 && <div>No bookings were found</div>}
        {bookingState.bookings.length > 0 && bookingState.bookings.map((booking) => (
          <NavLink
            to={`/bookings/${booking.id}`}
            key={booking.id}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <div
              style={{ marginLeft: '1rem' }}
            >
              <div><strong>#{booking.id}</strong></div>
              <div>{booking.startDate}</div>
              <div>{booking.endDate}</div>
            </div>
          </NavLink>
        ))
          }
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
