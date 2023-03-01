import React, { FC, useState, useRef } from 'react';
import { Checkbox, ConfigProvider, Button, Input, DatePicker, TimePicker, Modal, Form } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { DatePickerProps, InputRef } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import useInput from 'utils/hooks/useInput';
import dayjs from 'dayjs';
import IconSlider from 'components/slider/IconSlider';
import 'styles/views/formPage/formPage.scss'
import { writeToDatabase } from 'utils/services/appointment.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormPage: FC = () => {
  const CheckboxGroup = Checkbox.Group;
  const { TextArea } = Input;
  const sympthoms: Array<string> = ['Головная боль', 'Повышенная температура', 'Кашель', 'Насморк', 'Головокружения', 'Тошнота'];
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(); // симптомы чекбоксов
  const [customSymthom, setCustomSynthom] = useState(false); // симптомы текстфилда
  const [textAreaValue, setTextAreaValue] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [openSubmit, setOpenSubmit] = useState(false);
  const name = useInput("", true);
  const surname = useInput("", true);
  const phone = useInput("", true);
  const email = useInput("", false);
  const navigate = useNavigate();
  const inputRef = useRef<InputRef>(null);

  /** функция записи значений чекбоксов и обнуления текстфилда */
  const onChangeCheckboxes = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setTextAreaValue('');
    setCustomSynthom(false);
  };

  /** функция установки даты */
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setVisitDate(dateString);
  };

  /** функция установки времени */
  const onChangeTime = (time: Dayjs | null, timeString: string) => {
    setVisitTime(timeString);
  }

  /** функция установки значения слайдера */
  const onSliderChange = (value: number) => {
    setSliderValue(value);
  }
  /** функция установки значения текстфилда */
  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  }
  
  /** функция установки недоступного времени */
  const disabledDateTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]
  });

  /** функция отмены заполнения формы */
  const cancelForm = () => {
    setOpenSubmit(false);
    navigate('/');
  }
  /** функция проверки ввода всех необходимых полей */
  const validateFields = (): boolean => {
    return !!(
      (checkedList?.length || textAreaValue) && visitTime && visitDate && name.value && surname.value && phone.value
    )
  }

  /** функция отправки формы в firebase database */
  const sendForm = () => {
    if (validateFields()) {
      // выбираем значения чекбоксов, если текстфилд пустое и наоборот. выбрать и то, и другое нельзя (по условию можно понять именно так)
      const sympthoms = customSymthom ? textAreaValue : checkedList?.join(', ');
      writeToDatabase(visitDate, visitTime, name.value, sliderValue, email.value, surname.value, phone.value, sympthoms, dayjs().unix());
      toast.success('Ваша запись успешно зарегистрирована!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error('Пожалуйста, заполните все поля и выберите симптомы!');
    }
  }

  /** функция запрета дат (запрет выбора дней до сегодняшнего) */
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    let customDate = dayjs().format("YYYY-MM-DD");
    return current && current < dayjs(customDate, "YYYY-MM-DD");
  };

  /** функция установки симптомов */
  const setCustomSympthomes = () => {
    const resetSympthomes: CheckboxValueType[] = [];
    setCheckedList(resetSympthomes);
    setCustomSynthom(true);
    inputRef.current!.focus({
      cursor: 'start',
    });
  }

  return <>
    <div className="formPage">
      <div className="formPage__title"> Заполните простую форму, чтобы записаться к лучшим врачам нашей клиники</div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F57955',
            lineWidth: 2,
          },
        }}
      >
        <div className="formPage__inner">
          <div className="formPage__subtitle"> 1. Выберите Ваши симптомы или опишите их вручную: </div>
          <div className="formPage__sympthoms">
            <div className="formPage__line">
              <CheckboxGroup options={sympthoms} value={checkedList} onChange={onChangeCheckboxes} />
              <Button type="primary" size='large' onClick={setCustomSympthomes}>
                Ввести собственные симптомы
              </Button>
            </div>
            <TextArea
              value={textAreaValue}
              bordered={true}
              maxLength={100}
              size='large'
              disabled={!customSymthom}
              ref={inputRef}
              placeholder='Введите собственные симптомы, нажав на соответствующую кнопку'
              onChange={onChangeTextfield}
            />
          </div>
          <div className="formPage__subtitle"> 2. Выберите желаемую дату и время </div>
          <div className="formPage__datetime">
            <div className="formPage__datepicker">
              <DatePicker
                disabledDate={disabledDate}
                onChange={onChangeDate}
                format='DD-MM-YYYY'
                size='large'
              />
            </div>
            <div className="formPage__timepicker">
              <TimePicker
                minuteStep={10}
                format='HH:mm'
                size='large'
                disabledTime={disabledDateTime}
                onChange={onChangeTime}
              />
            </div>
          </div>
          <p className="formPage__smalltext"> *После заполнения формы с Вами свяжется администратор, чтобы обсудить возможность записи на указанную дату и время. </p>
          <div className="formPage__subtitle"> 3. Оцените тяжесть ваших симптомов </div>
          <div className="formPage__slider">
            <IconSlider min={0} max={10} onChange={onSliderChange}/>
          </div>
          <div className="formPage__subtitle"> 4. Введите контакнтые данные для связи </div>
          <div className="formPage__contacts">
            <div className="formPage__contactliner">
                <Input {...name} style={{ width: '100%' }} size='large' placeholder="Ваше имя *"/>
                <Input {...surname} style={{ width: '100%' }} size='large' placeholder="Ваша фамилия *"/>
            </div>
            <div className="formPage__contactliner">
                <Input {...phone} style={{ width: '100%' }} size='large' placeholder="Ваше номер телефона *"/>
                <Input {...email} style={{ width: '100%' }} size='large' placeholder="Ваш e-mail"/>
            </div>
            <p className="formPage__smalltext"> *Поля, помеченные звездочкой, являются обязательными к заполнению! </p>
          </div>
          <div className="formPage__buttons">
              <Button type="primary" size='large' onClick={sendForm}> Записаться </Button>
              <Button type="default" size='large' onClick={() => setOpenSubmit(true)}> Отменить запись </Button>
              <Modal
                title="Вы действительно хотите отменить запись?"
                open={openSubmit}
                onOk={cancelForm}
                onCancel={() => setOpenSubmit(false)}
                okText="Да"
                cancelText="Нет"
              >
              </Modal>
          </div>
        </div>
      </ConfigProvider>

    </div>
  </>
}

export default FormPage;
