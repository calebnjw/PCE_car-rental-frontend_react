import React from 'react';
import {
  Link,
  Outlet,
  NavLink,
} from 'react-router-dom';

export default function Head() {
  return (
    <div>
      <Link to={'/cars'}>
        <h1>Car Rental</h1>
      </Link>
      <nav>
        <NavLink to={'/cars'}>
          Cars
        </NavLink>
        <NavLink to={'/bookings'}>
          Bookings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
