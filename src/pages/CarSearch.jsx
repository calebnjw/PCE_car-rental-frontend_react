import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Outlet,
  NavLink,
} from 'react-router-dom';
import axios from 'axios';

import { CarStateContext, BookingStateContext } from '../providers/context.jsx';
import { getCars } from '../reducer/carReducer.js';

export default function CarSearch() {
  const { carState, carDispatch } = useContext(CarStateContext);
  const { bookingState, bookingDispatch } = useContext(BookingStateContext);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    (async () => carDispatch(await getCars()))();
  }, []);

  const handleStartDateInput = (event) => {
    const newDate = event.target.value;
    setStartDate(newDate);
    if (endDate < newDate) {
      setEndDate(newDate);
    }
  };

  const handleEndDateInput = (event) => {
    const newDate = event.target.value;
    setEndDate(newDate);
    if (newDate < startDate) {
      setStartDate(newDate);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <div>
        <form
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='StartDate'>Start Date</label>
            <input
              type={'date'}
              id='StartDate'
              name='StartDate'
              onChange={handleStartDateInput}
              value={startDate} />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='EndDate'>End Date</label>
            <input
              type={'date'}
              id='EndDate'
              name='EndDate'
              onChange={handleEndDateInput}
              value={endDate} />
          </div>
          <input type={'submit'} value={'Search'} />
        </form>
        <h3>Available Cars</h3>
        {carState.cars.length === 0 && <div>No cars matching your query were found</div>}
        {carState.cars.length > 0 && carState.cars.map((car) => (
            <NavLink
              to={`${car.id}`}
              key={car.id}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <img src={`${car.image}`} className='car_thumb'></img>
              <div
                style={{ marginLeft: '1rem' }}
              >
                <div><strong>{car.manufacturer}</strong> {car.model}</div>
                <div>{car.rate}</div>
                <div>{car.seats}</div>
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
