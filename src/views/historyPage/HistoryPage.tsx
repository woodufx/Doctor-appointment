import React, { FC, useState, useEffect } from 'react';
import Card from 'components/card/Card';
import Header from 'components/header/Header';
import { db } from "utils/firebase";
import {ref, onValue } from 'firebase/database';
import 'styles/views/historyPage/historyPage.scss'

const HistoryPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  /** Получение всех заявок со статусом, отличным от "unchecked"*/
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setAppointments([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((appointment: any) => {
          if (appointment.status !== "unchecked") {
            setAppointments(oldArray => [...oldArray, appointment]);
          }
        });
      }
    })
  }, []);

    /** Выводим заявки с их измененным статусом*/
  return <>
  <Header/>
    <div className="historyPage">
      <div className="historyPage__inner">
        {appointments.sort((a, b) => a.creationTime < b.creationTime ? 1 : -1).map(appointment => (
          <Card {...appointment} type="history"/>
        ))}
      </div>
    </div>
  </>
}

export default HistoryPage;
