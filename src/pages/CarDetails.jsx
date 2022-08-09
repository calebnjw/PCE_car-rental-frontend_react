import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import { CarStateContext } from '../providers/context.jsx';
import { setCarId } from '../reducer/carReducer.js';

export default function CarDetails() {
  const { carState, carDispatch } = useContext(CarStateContext);
  const { carId } = useParams();

  const [carDisplay, setCarDisplay] = useState({});

  useEffect(() => {
    setCarDisplay(carState.cars[carId]);
  }, [carId]);

  return (
    <div>
      <button
        to={'/bookings/confirm'}
        onClick={() => { carDispatch(setCarId(carId)); }}
      >
        Book Now
      </button>
      <img src={`${carDisplay.image}`} className='car_display'></img>
      <div>
        <div>{carDisplay.manufacturer} {carDisplay.model}</div>
        <div>${carDisplay.rate}/week</div>
        <div>{carDisplay.seats}</div>
        <div>{carDisplay.vrm}</div>
        <div>{carDisplay.fuel}</div>
        <div>{carDisplay.manual ? 'Manual' : 'Auto'}</div>
      </div>
    </div>
  );
}
