import React, {
  useContext,
  useEffect,
} from 'react';
import {
  Outlet,
  NavLink,
} from 'react-router-dom';

import { CarStateContext, BookingStateContext } from '../providers/context.jsx';
import { getCars } from '../reducer/carReducer.js';
import { setStartDate, setEndDate } from '../reducer/bookingReducer.js';

export default function CarSearch() {
  const { carState, carDispatch } = useContext(CarStateContext);
  const { bookingState, bookingDispatch } = useContext(BookingStateContext);

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

  useEffect(() => {
    (async () => carDispatch(await getCars()))();
  }, []);

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
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='date'
              id='startDate'
              name='startDate'
              onChange={handleStartDateInput}
              value={bookingState.startDate} />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='endDate'>End Date</label>
            <input
              type='date'
              id='endDate'
              name='endDate'
              onChange={handleEndDateInput}
              value={bookingState.endDate} />
          </div>
          <button
            type={'submit'}
            onClick={async () => {
              await 'hello';
            }}
          >Search</button>
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
