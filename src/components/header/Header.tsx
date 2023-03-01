import React, { FC } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { PageRoutes } from 'utils/constants/routes';
import {useDispatch} from 'react-redux';
import {removeUser} from 'store/slices/userSlice';
import exit from 'assets/exit.png'
import 'styles/components/header/header.scss'
import { toast } from "react-toastify";

const Header:  FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser());
    toast.success('Вы успешно вышли из аккаунта')
    navigate('/');
  }

  return <div className="header">
    <div className="header__inner">
      <div className="header__left">
        <NavLink className='header__link' to={PageRoutes.MAIN_PAGE}> Главная страница</NavLink>
        <NavLink className='header__link' to={PageRoutes.ADMIN_PAGE}> Панель администратора </NavLink>
        <NavLink className='header__link' to={PageRoutes.HISTORY_PAGE}> Архив </NavLink>
      </div>
      <div className="header__right" onClick={handleLogout}> 
        <div className="header__text">Выйти</div>
        <img className="header__exit" src={exit} alt="" />
      </div>

    </div>
  </div>
}

export default Header;