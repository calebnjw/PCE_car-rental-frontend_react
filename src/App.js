import React from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import GlobalContext from './providers/context.jsx';

import Head from './components/Head.jsx';
import CarSearch from './pages/CarSearch.jsx';
import CarDetails from './pages/CarDetails.jsx';
import BookingConfirm from './pages/BookingConfirm.jsx';
import BookingAll from './pages/BookingAll.jsx';
import BookingDetails from './pages/BookingDetails.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <GlobalContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Head />} >
            <Route index element={
              <div className='big-container'>
                <Link to={'cars'} className='big-button'>Find A Car</Link>
                <Link to={'bookings'} className='big-button'>Check Your Bookings</Link>
              </div>
            } />
            <Route path='cars' element={<CarSearch />} >
              <Route index element={<div>Please choose a car.</div>} />
              <Route path=':carId' element={<CarDetails />} />
            </Route>
            <Route path='bookings' element={<BookingAll />} >
              <Route index element={<div>Please select booking to view.</div>} />
              <Route path='confirm' element={<BookingConfirm />} />
              <Route path=':bookingId' element={<BookingDetails />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  );
}

export default App;
