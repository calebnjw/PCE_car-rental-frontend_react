import React from 'react';
import {
  Link,
  Outlet,
  NavLink,
} from 'react-router-dom';
import { Column } from '@carbon/react';

export default function Head() {
  return (
    <Column sm={16}>
      <div className='header'>
        <Link to={'/cars'}>
          <h1>RENT-A-CAR</h1>
        </Link>
        <nav>
          <NavLink to={'/cars'}>
            Find Cars
          </NavLink>
          <NavLink to={'/bookings'}>
            Bookings
          </NavLink>
        </nav>
      </div>
      <hr />
      <Outlet />
    </Column>
  );
}
