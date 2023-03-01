import React, { FC, useEffect, useState} from 'react';
import Header from 'components/header/Header';
import { db } from 'utils/firebase';
import {ref, onValue} from 'firebase/database';
import Card from 'components/card/Card';
import 'styles/views/adminPage/adminPage.scss'

const AdminPage : FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

   /** Получение всех заявок со статусом  "unchecked"*/
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setAppointments([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((appointment: any) => {
          if (appointment.status === "unchecked") {
            setAppointments(oldArray => [...oldArray, appointment]);
          }
        });
      }
    })
  }, []);
  
  /** Вывод всех необработанных заявок (сортировка по дате создания заявки)*/
  return <>
    <Header/>
    <div className="adminPage">
      {appointments.sort((a, b) => a.creationTime < b.creationTime ? 1 : -1).map(appointment => (
        <Card {...appointment} type="current"/>
      ))}
    </div>
  </>
}

export default AdminPage;
