import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import s from "./login-page.module.scss"
import {  useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FormEvent, FormEventHandler, useState } from "react";
import { login } from "../../services/api";
import { useAppDispatch } from "../../hooks";

export default function LoginPage() : JSX.Element {
   
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   
   const dispatch = useAppDispatch()
   const navigate = useNavigate();

   const form  = {
      "email": email, 
      "password": password, 
    }

   const handleClick = async (e : FormEvent<HTMLFormElement>) : Promise<void> => {
      e.preventDefault();
      await dispatch(login(form));
      navigate('/');
   }

   return (
         <main className={s.main}>
            <form action=""  className={`${s.form} pb-20`} onSubmit={handleClick}>
               <p className="text text_type_main-medium">Вход</p>
               <Input type={'text'} value={email} onChange={e => setEmail(e.target.value)} placeholder={'E-mail'} size={'default'} extraClass="ml-1"/>
               <PasswordInput value={password} onChange={e => setPassword(e.target.value)} extraClass="mb-2"/>
               <Button htmlType="submit" type="primary" size="large">Войти</Button>
            </form>
            <p className={`text text_type_main-default pb-4 ${s.text}`}>Вы — новый пользователь? <NavLink to="/register">Зарегистрироваться</NavLink></p>
            <p className={`text text_type_main-default ${s.text}`}>Забыли пароль? <NavLink to="/forgot-password">Восстановить пароль</NavLink></p>
         </main>
   )
}