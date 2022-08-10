import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import { CarStateContext, BookingStateContext } from '../providers/context.jsx';
import {
  setStartDate, setEndDate, setFirstName, setLastName, setEmail, newBooking,
} from '../reducer/bookingReducer.js';

export default function BookingConfirm() {
  const navigate = useNavigate();

  const { carState } = useContext(CarStateContext);
  const { bookingState, bookingDispatch } = useContext(BookingStateContext);

  const [carDisplay, setCarDisplay] = useState({});

  const handleStartDateInput = (event) => {
    const newDate = event.target.value;
    bookingDispatch(setStartDate(newDate));
    if (bookingState.endDate < newDate) {
      bookingDispatch(setEndDate(newDate));
    }
  };

  const handleEndDateInput = (event) => {
    const newDate = event.target.value;
    bookingDispatch(setEndDate(newDate));
    if (newDate < bookingState.startDate) {
      bookingDispatch(setStartDate(newDate));
    }
  };

  const handleFirstNameInput = (event) => {
    bookingDispatch(setFirstName(event.target.value));
  };

  const handleLastNameInput = (event) => {
    bookingDispatch(setLastName(event.target.value));
  };

  const handleEmailInput = (event) => {
    bookingDispatch(setEmail(event.target.value));
  };

  useEffect(() => {
    setCarDisplay(carState.cars[carState.carId]);
    console.log('CAR ID', carState.carId);
  }, [carState]);

  return (
    <div>
      <img src={`${carDisplay.image}`} className='car_display'></img>
      <div className='description'>
        <div className='item-title'>
          {carDisplay.manufacturer} {carDisplay.model}
        </div>
        <div className='property'>
          <div className='prop-label'>
            Rate:
          </div>
          <div className='prop-desc'>
            ${carDisplay.rate}/week
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Seats:
          </div>
          <div className='prop-desc'>
            {carDisplay.seats}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Fuel:
          </div>
          <div className='prop-desc'>
            {carDisplay.fuel}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Drive:
          </div>
          <div className='prop-desc'>
            {carDisplay.manual ? 'Manual' : 'Auto'}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            VRM:
          </div>
          <div className='prop-desc'>
            {carDisplay.vrm}
          </div>
        </div>
      </div>
      <form className='input-form'>
        <div className='row'>
          <div className='input-group'>
            <label htmlFor='StartDate'>Start Date</label>
            <input
              type='date'
              id='StartDate'
              name='StartDate'
              onChange={handleStartDateInput}
              value={bookingState.startDate} />
          </div>
          <div className='input-group'>
            <label htmlFor='EndDate'>End Date</label>
            <input
              type='date'
              id='EndDate'
              name='EndDate'
              onChange={handleEndDateInput}
              value={bookingState.endDate} />
          </div>
        </div>
        <div className='row' >
          <div className='input-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              onChange={handleFirstNameInput}
              value={bookingState.firstName} />
          </div>
          <div className='input-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              onChange={handleLastNameInput}
              value={bookingState.lastName} />
          </div>
        </div>
        <div className='row mb-1' >
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={handleEmailInput}
              value={bookingState.email} />
          </div>
        </div>
        <button
          onClick={async (event) => {
            event.preventDefault();
            bookingDispatch(await newBooking({
              carId: carState.carId,
              startDate: bookingState.startDate,
              endDate: bookingState.endDate,
              firstName: bookingState.firstName,
              lastName: bookingState.lastName,
              email: bookingState.email,
            }));
            bookingDispatch(setStartDate(''));
            bookingDispatch(setEndDate(''));
            bookingDispatch(setFirstName(''));
            bookingDispatch(setLastName(''));
            bookingDispatch(setEmail(''));
            navigate('/bookings', { replace: true });
          }
        }
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
