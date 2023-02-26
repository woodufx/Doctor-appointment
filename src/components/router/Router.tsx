import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageRoutes } from 'utils/constants/routes';
import AdminPage from 'views/adminPage/AdminPage';
import HistoryPage from 'views/historyPage/HistoryPage';
import MainPage from 'views/mainPage/MainPage';
import LoginPage from 'views/loginPage/LoginPage';

const Router: FC = () => {

  const isAuthorized = false;
  
  return (
    <BrowserRouter>
    {
      isAuthorized
        ? (
          <Routes>
            <Route path={PageRoutes.ADMIN_PAGE} element={<AdminPage/>} />
            <Route path={PageRoutes.HISTORY_PAGE} element={<HistoryPage/>} />
            <Route path={PageRoutes.MAIN_PAGE} element={<MainPage/>} />
            <Route
              path="*"
              element={<Navigate to={PageRoutes.ADMIN_PAGE} replace />}
            />
          </Routes>
        )
        : (
          <Routes>
            <Route path={PageRoutes.MAIN_PAGE} element={<MainPage/>} />
            <Route path={PageRoutes.LOGIN_PAGE} element={<LoginPage/>} />
            <Route
              path="*"
              element={<Navigate to={PageRoutes.MAIN_PAGE} replace />}
            />
        </Routes>
        )
      }
    </BrowserRouter>
  );
};

export default Router;
