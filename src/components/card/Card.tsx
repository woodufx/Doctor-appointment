import React, { FC } from 'react';
import 'styles/components/card/card.scss';
import { updateAppointment } from 'utils/services/appointment.service';

interface ICard {
  type: 'current' | 'history'
  uuid: string,
  date: string,
  time: string,
  name: string,
  surname: string,
  status: string,
  phone: string,
  rate: number,
  sympthoms: string,
}

const Card: FC<ICard> = (props) => {
  const handleStatusChange = (status: string) => {
    updateAppointment(props.uuid, status);
  }
  return <>
    <div className="card">
      <div className="card__inner">
        <div className="card__top">
          <div className="card__topLeft">
            <div className="card__name">{props.name} {props.surname}</div>
            <div className="card__id">#{props.uuid}</div>
          </div>
          <div className="card__topRight">
            <div className="card__rate">Тяжесть: {props.rate}</div>
          </div>
        </div>
        <div className="card__bottom">
          <div className="card__sympthoms">Симптомы: {props.sympthoms}</div>
          <div className="card__line">
            <div className="card__datetime">Желаемая дата: {props.date} {props.time}</div>
            <div className="card__phone">Контактные данные: {props.phone}</div>
          </div>
          <div className="card__line">
            {props.type === 'current' ? (
              <>
                <button className='card__button' onClick={() => handleStatusChange("confirmed")}>Подтвердить</button>
                <button className='card__button orange' onClick={() => handleStatusChange("canceled")}>Отменить</button>
              </>
            ) : (
              <>
                <div className={props.status === 'confirmed' ? "card__confirmed" : "card__closed"}>{props.status==='confirmed' ? (<>Подтверждено</>) : (<>Отменено</>)}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Card;
