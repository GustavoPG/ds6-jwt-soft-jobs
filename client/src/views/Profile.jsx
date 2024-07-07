import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ENDPOINT } from '../config/constans';

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response: { data } }) => {
        console.error(data);
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Error al obtener los datos del usuario. Por favor, inicia sesión nuevamente.',
        }).then(() => {
          navigate('/');
        });
      });
  };

  useEffect(getDeveloperData, []);

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  );
};

export default Profile;
