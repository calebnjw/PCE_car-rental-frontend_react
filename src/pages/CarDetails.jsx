import React, {
  useEffect,
  useState,
} from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

export default function CarDetails() {
  const navigate = useNavigate();

  const { carId } = useParams();

  const [carDisplay, setCarDisplay] = useState({});

  const getCarDetails = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cars/${carId}`);
    if (!data) {
      navigate('/404', { replace: true });
    }
    setCarDisplay(data);
  };

  useEffect(() => {
    getCarDetails();
  }, [carId]);

  return (
    <div>
      <img src={`${carDisplay.image}`} className='car_display'></img>
      <div className='description'>
        <div className='item-title'>
          {carDisplay.manufacturer} {carDisplay.model}
        </div>
        <div className='property'>
          <div className='prop-label'>
            Rate:
          </div>
          <div className='prop-desc'>
            ${carDisplay.rate}/week
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Seats:
          </div>
          <div className='prop-desc'>
            {carDisplay.seats}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Fuel:
          </div>
          <div className='prop-desc'>
            {carDisplay.fuel}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            Drive:
          </div>
          <div className='prop-desc'>
            {carDisplay.manual ? 'Manual' : 'Auto'}
          </div>
        </div>
        <div className='property'>
          <div className='prop-label'>
            VRM:
          </div>
          <div className='prop-desc'>
            {carDisplay.vrm}
          </div>
        </div>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          navigate('/bookings/confirm');
        }}
      >
        Book Now
      </button>
    </div>
  );
}
