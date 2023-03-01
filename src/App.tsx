import React from 'react';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import Router from 'components/router/Router';
import { store } from 'store/appointmentStore';
import { Provider } from 'react-redux'
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () =>  {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRu}>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          limit={3}
        />
        <Router/>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
