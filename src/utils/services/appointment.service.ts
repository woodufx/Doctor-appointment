import { getDatabase, ref, set, update} from "firebase/database";
import { uid } from "uid";
import { db } from "utils/firebase";
import { useState, useEffect } from "react";
import { IForm } from "utils/types/IForm";

/** Функция записи в базу данных*/
export const writeToDatabase = (date: string, time: string, name: string, rate:number, email:string | null,  surname: string, phone: string, sympthoms: string | undefined, creationTime: number) => {
  const uuid = uid();
  set(ref(db, `/${uuid}`), {
    date,
    time,
    rate,
    name,
    surname,
    phone,
    status: "unchecked",
    email,
    sympthoms,
    creationTime,
    uuid,
  });
}

/** Функция обновления статуса конкретной заявки*/
export const updateAppointment = (tempUuid: string, status: string) => {
  update(ref(db, `/${tempUuid}`), {
    status,
    uuid: tempUuid,
  });
}
