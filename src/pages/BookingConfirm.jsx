import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import { CarStateContext, BookingStateContext } from '../providers/context.jsx';

export default function BookingConfirm() {
  const { carState } = useContext(CarStateContext);
  const { bookingState, bookingDispatch } = useContext(BookingStateContext);

  const [carDisplay, setCarDisplay] = useState({});
  const [carId, setCarId] = useState(1);

  useEffect(() => {
    setCarId(carState.carId);
    setCarDisplay(carState.cars[carId]);
    console.log('CAR ID', carState.carId);
  }, [carState]);

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
      <form
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='StartDate'>Start Date</label>
            <input type={'date'} id='StartDate' name='StartDate' />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='EndDate'>End Date</label>
            <input type={'date'} id='EndDate' placeholder='EndDate' />
          </div>
          <input type={'submit'} value={'Search'} />
        </form>
      <Link to={'/bookings/confirm'}>Book Now</Link>
    </div>
  );
}
