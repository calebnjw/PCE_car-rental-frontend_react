import axios from 'axios';
import {
  GET, SET, SETSTARTDATE, SETENDDATE, SETFIRSTNAME, SETLASTNAME, SETEMAIL, NEW, DEL,
} from '../assets/actions.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function bookingReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET:
      return {
        ...state, bookings: [...payload.bookings],
      };
    case SETSTARTDATE:
      return {
        ...state, startDate: payload.startDate,
      };
    case SETENDDATE:
      return {
        ...state, endDate: payload.endDate,
      };
    case SETFIRSTNAME:
      return {
        ...state, firstName: payload.firstName,
      };
    case SETLASTNAME:
      return {
        ...state, lastName: payload.lastName,
      };
    case SETEMAIL:
      return {
        ...state, email: payload.email,
      };
    case SET:
      return {
        ...state, bookingId: payload.bookingId,
      };
    case NEW:
      return {
        ...state,
        startDate: state.startDate,
        endDate: state.endDate,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
      };
    case DEL:
      return {
        ...state, bookingId: 0,
      };
    default:
      return state;
  }
}

export const getBookings = async (email) => {
  const { data } = await axios.post(`${BACKEND_URL}/bookings/get`, { email });
  return { type: GET, payload: { bookings: data.bookings } };
};

export const setBookingId = (id) => ({ type: SET, id });

export const setStartDate = (startDate) => (
  { type: SETSTARTDATE, payload: { startDate } }
);

export const setEndDate = (endDate) => (
  { type: SETENDDATE, payload: { endDate } }
);

export const setFirstName = (firstName) => (
  { type: SETFIRSTNAME, payload: { firstName } }
);

export const setLastName = (lastName) => (
  { type: SETLASTNAME, payload: { lastName } }
);

export const setEmail = (email) => (
  { type: SETEMAIL, payload: { email } }
);

export const newBooking = async (input) => {
  const {
    carId, startDate, endDate, email, firstName, lastName,
  } = input;
  const { data } = await axios.post(`${BACKEND_URL}/bookings/new`, {
    carId, startDate, endDate, email, firstName, lastName,
  });
  return { type: SET, payload: { bookingId: data.id } };
};

export const deleteBooking = async (bookingId) => {
  await axios.delete(`${BACKEND_URL}/bookings/${bookingId}`);
  return { type: DEL };
};
