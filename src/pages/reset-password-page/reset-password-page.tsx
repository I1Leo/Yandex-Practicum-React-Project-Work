import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./reset-password-page.module.scss"
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { NavLink, Navigate } from "react-router-dom";
import { resetPassword } from "../../utils/api";
import { useForm } from "../../hooks";


export default function ResetPasswordPage() : JSX.Element {

   const {values, handleChange } = useForm({
      newPassword: "",
      token: ""
   })

   const navigate = useNavigate();

   const handleSubmit = async (e : FormEvent<HTMLFormElement>) : Promise<void> => {
      e.preventDefault();

      const form = {
         "password": values.newPassword,
         "token": values.token
      }

      resetPassword(form);
      navigate('/login');
   }

   return (
      localStorage.getItem("resetPassword") ?
         <main className={s.main}>
            <form action="" method="post" className={`${s.form} pb-20`} onSubmit={handleSubmit}>
               <p className="text text_type_main-medium">Восстановление пароля</p>
               <PasswordInput name="newPassword" value={values.newPassword} onChange={handleChange} placeholder="Введите новый пароль" extraClass="mb-2" />
               <Input name="token" value={values.token} onChange={handleChange} type={'text'} placeholder={'Введите код из письма'} size={'default'} extraClass="ml-1" />
               <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Вспомнили пароль? <NavLink to="/login">Войти</NavLink></p>
         </main> :
         <Navigate to="/forgot-password" />
   )
}