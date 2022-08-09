import axios from 'axios';
import {
  GET, SET, SETSTARTDATE, SETENDDATE, NEW, DEL,
} from '../assets/actions.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function bookingReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET:
      return {
        bookings: [...payload.bookings],
        bookingId: state.bookingId,
        startDate: state.startDate,
        endDate: state.endDate,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      };
    case SET:
      return {
        bookings: [...state.bookings],
        bookingId: state.bookingId,
        startDate: state.startDate,
        endDate: state.endDate,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      };
    case NEW:
      return {
        bookings: payload.bookings,
        bookingId: state.bookingId,
        startDate: state.startDate,
        endDate: state.endDate,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      };
    case DEL:
      return {
        bookings: payload.bookings,
        bookingId: state.bookingId,
        startDate: state.startDate,
        endDate: state.endDate,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      };
    default:
      return {
        bookings: state.bookings,
        bookingId: state.bookingId,
        startDate: state.startDate,
        endDate: state.endDate,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
      };
  }
}

export const getBookings = async (email) => {
  const { data } = await axios.post(`${BACKEND_URL}/cars`, { email });
  return { type: GET, payload: { bookings: data } };
};

export const setBookingId = (id) => ({ type: SET, id });

export const setStartDate = (startDate) => (
  { type: SETSTARTDATE, payload: { startDate } }
);

export const setEndDate = (endDate) => (
  { type: SETENDDATE, payload: { endDate } }
);
