import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

import { BookingStateContext } from '../providers/context.jsx';
import { deleteBooking } from '../reducer/bookingReducer.js';

export default function BookingDetails() {
  const navigate = useNavigate();

  const { bookingDispatch } = useContext(BookingStateContext);

  const { bookingId } = useParams(0);

  const [bookingDisplay, setBookingDisplay] = useState({});
  const [carDisplay, setCarDisplay] = useState({});

  const getBookingDetails = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`);
    if (!data) {
      navigate('/404', { replace: true });
    }
    setBookingDisplay(data);
  };

  const getCarDetails = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cars/${bookingDisplay.carId}`);
    setCarDisplay(data);
  };

  useEffect(() => {
    getBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    getCarDetails();
  }, [bookingDisplay]);

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
      <button
        onClick={(event) => {
          event.preventDefault();
          bookingDispatch(deleteBooking(bookingId));
          navigate('/bookings', { replace: true });
        }}
      >
        Delete Booking
      </button>
    </div>
  );
}
