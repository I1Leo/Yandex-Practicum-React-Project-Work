import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./reset-password-page.module.scss"
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink, Navigate } from "react-router-dom";
import { resetPassword } from "../../utils/api";


export default function ResetPasswordPage() {

   const [newPassword, setNewPassword] = useState('');
   const [token, setToken] = useState('');

   const navigate = useNavigate();

   const handleClick = async (e) => {
      e.preventDefault();

      const form = {
         "password": newPassword,
         "token": token
      }

      resetPassword(form);
      navigate('/login');

   }

   return (
      localStorage.getItem("resetPassword") ?
         <main className={s.main}>
            <form action="" method="post" className={`${s.form} pb-20`} onSubmit={handleClick}>
               <p className="text text_type_main-medium">Восстановление пароля</p>
               <PasswordInput value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Введите новый пароль" extraClass="mb-2" />
               <Input value={token} onChange={e => setToken(e.target.value)} type={'text'} placeholder={'Введите код из письма'} size={'default'} extraClass="ml-1" />
               <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Вспомнили пароль? <NavLink to="/login">Войти</NavLink></p>
         </main> :
         <Navigate to="/forgot-password" />
   )
}