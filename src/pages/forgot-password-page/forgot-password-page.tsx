import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./forgot-password-page.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { forgotPassword } from "../../utils/api";
import { useForm } from "../../hooks";


export default function ForgotPasswordPage() {
   
   const {values, handleChange } = useForm({email: ""})

   const navigate = useNavigate();

   const handleSubmit = async (e : FormEvent<HTMLFormElement>) : Promise<void> => {
      e.preventDefault();
      forgotPassword(values.email);
      navigate('/reset-password')
   }

   return (
         <main className={s.main}>
            <form action="submit" className={`${s.form} pb-20`} onSubmit={handleSubmit}>
               <p className="text text_type_main-medium">Восстановление пароля</p>
               <Input type={'text'} name="email" value={values.email} onChange={handleChange} placeholder={'Укажите e-mail'} size={'default'} extraClass="ml-1" />
               <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Вспомнили пароль? <NavLink to="/login">Войти</NavLink></p>
         </main>
   )
}