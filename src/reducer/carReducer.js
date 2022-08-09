import axios from 'axios';
import {
  GET, SET,
} from '../assets/actions.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function carReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET:
      return { cars: [...payload.cars], carId: state.carId };
    case SET:
      return { cars: [...state.cars], carId: payload.carId };
    default:
      return { cars: [...state.cars], carId: state.carId };
  }
}

export const getCars = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/cars`);
  return { type: GET, payload: { cars: data } };
};

export const setCarId = (id) => ({ type: SET, payload: { carId: Number(id) } });
