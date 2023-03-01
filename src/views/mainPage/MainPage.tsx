import React, { FC } from 'react';
import 'styles/views/mainPage/mainPage.scss';
import { PageRoutes } from 'utils/constants/routes';
import { useNavigate } from 'react-router-dom';
import doctor from 'assets/doctor.png';
import blueParticles from 'assets/blue_particles.png';
import orangeParticles from 'assets/orange_particles.png';

const MainPage : FC = () => {
  const navigate = useNavigate();
  return <>
    <div className="mainPage">
      <div className="mainPage__header">
        <div className="mainPage__text">
          <div className="mainPage__title">
            Сохрани Время и Здоровье
          </div>
          <div className="mainPage__description">
            Мы фокусируемся на том, чтобы запись к врачу не являлась рутинной процедурой с огромными очередямми в регистратуре
          </div>
        </div>
        <img src={doctor} alt="" />
      </div>
      <div className="mainPage__subtitle">
        Выберите роль, чтобы продолжить
      </div>
      <div className="mainPage__roles">
        <div className="mainPage__role" onClick={() => navigate(PageRoutes.FORM_PAGE)}>
          <p className="mainPage__rolename">Продолжить как пациент</p>
          <img src={blueParticles} className="mainPage__particles" alt="" />
          <svg className="mainPage__waveBlue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#AAD3E5" fillOpacity="1" d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,138.7C840,149,960,139,1080,122.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
            </path>
          </svg>
        </div>
        <div className="mainPage__role" onClick={() => navigate(PageRoutes.ADMIN_PAGE)}>
          <p className="mainPage__rolename"> Продолжить как администратор</p>
          <img src={orangeParticles} className="mainPage__particles" alt="" />
          <svg className="mainPage__waveOrange"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#FF9E82" fillOpacity="1" d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,154.7C840,128,960,128,1080,117.3C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
              </path>
          </svg>
        </div>
      </div>
    </div>
  </>
}

export default MainPage;
