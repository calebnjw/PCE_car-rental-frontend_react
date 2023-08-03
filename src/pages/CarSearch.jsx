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
    <div className='container'>
      <div className='sidebar'>
        <form className='search-form'>
          <div className='input-group'>
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='date'
              id='startDate'
              name='startDate'
              onChange={handleStartDateInput}
              value={bookingState.startDate} />
          </div>
          <div className='input-group'>
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
            onClick={(event) => {
              event.preventDefault();
              return 'hello';
            }} >
            Search
          </button>
        </form>
        <h3 className='section-head'>Available Cars</h3>
        <div className='column'>
          {carState.cars.length === 0 && <div>No cars matching your query were found</div>}
          {carState.cars.length > 0 && carState.cars.map((car) => (
            <NavLink
              to={`${car.id}`}
              key={car.id}
              className={({ isActive }) => (isActive ? 'item active' : 'item')} >
              <img src={`${car.image}`} className='car_thumb'></img>
              <div>
                <div className='item-title'>
                  <strong>{car.manufacturer} </strong>
                  {car.model}
                </div>
                <div className='property'>
                  <div className='prop-label'>
                    Rate:
                  </div>
                  <div className='prop-desc'>
                    ${car.rate}/week
                  </div>
                </div>
                <div className='property'>
                  <div className='prop-label'>
                    Seats:
                  </div>
                  <div className='prop-desc'>
                    {car.seats}
                  </div>
                </div>
              </div>
            </NavLink>
          )) }
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
