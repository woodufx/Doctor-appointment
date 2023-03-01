import React, { FC, useState, useRef, useEffect, FormEvent } from "react";
import {useDispatch} from 'react-redux';
import {setUser } from 'store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PageRoutes } from 'utils/constants/routes';
import "styles/views/loginPage/loginPage.scss";

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [])

    /** Функция авторизации с использованием firebase*/
    const handleLogin = () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
          console.log(user);
          dispatch(setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
          }));
          navigate(PageRoutes.ADMIN_PAGE);
      })
      .catch(() => toast.error('Неверный логин или пароль'));
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleLogin();
    }

    return (
        <div className="login-form">
          <form onSubmit={submitHandler}>
            <div className="login-form__inner">
                <div className="login-form__title"> Войти</div>
                <div className="login-form__line">
                    <div className="login-form__subtitle"> E-mail </div>
                    <input type="text"  ref={inputRef} value={email} placeholder="E-mail" className="login-form__input" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="login-form__line">
                    <div className="login-form__subtitle"> Пароль</div>
                    <input type="password" value={password} placeholder="Ваш пароль" className="login-form__input" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type= "submit" className="login-form__button">Войти</button>
              </div>
            </form>
        </div>  
    );
};

export default LoginPage;