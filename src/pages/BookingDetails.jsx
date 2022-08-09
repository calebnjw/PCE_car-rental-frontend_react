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
      <div>
        <div>{carDisplay.manufacturer} {carDisplay.model}</div>
        <div>${carDisplay.rate}/week</div>
        <div>{carDisplay.seats}</div>
        <div>{carDisplay.vrm}</div>
        <div>{carDisplay.fuel}</div>
        <div>{carDisplay.manual ? 'Manual' : 'Auto'}</div>
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
