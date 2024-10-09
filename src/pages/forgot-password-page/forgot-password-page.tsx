import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./forgot-password-page.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../../utils/api";


export default function ForgotPasswordPage() : JSX.Element {
   const [email, setEmail] = useState<string>('');

   const navigate = useNavigate();

   const handleClick = async (email : string) : Promise<void> => {
      forgotPassword(email);
      navigate('/reset-password')
   }

   return (
         <main className={s.main}>
            <form action="submit" className={`${s.form} pb-20`}>
               <p className="text text_type_main-medium">Восстановление пароля</p>
               <Input type={'text'} value={email} onChange={e => setEmail(e.target.value)} placeholder={'Укажите e-mail'} size={'default'} extraClass="ml-1" />
               <Button htmlType="button" type="primary" size="medium" onClick={() => handleClick(email)}>Восстановить</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Вспомнили пароль? <NavLink to="/login">Войти</NavLink></p>
         </main>
   )
}