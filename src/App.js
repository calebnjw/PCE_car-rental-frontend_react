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
              <div>
                <Link to={'cars'} >Find A Car</Link>
                <Link to={'bookings'} >Check Your Bookings</Link>
              </div>
            } />
            <Route path='cars' element={<CarSearch />} >
              <Route index element={<div>Choose a car</div>} />
              <Route path=':carId' element={<CarDetails />} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='bookings' element={<BookingAll />} >
              <Route path='confirm' element={<BookingConfirm />} />
              <Route path=':bookingId' element={<BookingDetails />} />
              <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  );
}

export default App;
