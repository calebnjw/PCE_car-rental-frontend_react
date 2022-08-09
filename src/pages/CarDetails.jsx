import React, {
  useContext,
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
      <button
        onClick={(event) => {
          event.preventDefault();
          navigate('/bookings/confirm', { replace: true });
        }}
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
