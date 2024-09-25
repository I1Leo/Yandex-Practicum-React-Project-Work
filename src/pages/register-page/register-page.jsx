import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./register-page.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../utils/api";


export default function RegisterPage() {
   
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();
 
   

   const handleClick = async (e) => {
      e.preventDefault();

      const form = {
         "email": email, 
         "password": password, 
         "name": name, 
       }
       
      register(form);
      navigate('/login');
   }

   return (
         <main className={s.main}>
            <form action="" method="post"  className={`${s.form} pb-20`} onSubmit={handleClick}>
               <p className="text text_type_main-medium">Регистрация</p>
               <Input type={'text'} value={name}  onChange={e => setName(e.target.value)} placeholder={'Имя'} size={'default'} extraClass="ml-1"/>
               <Input type={'text'} value={email} onChange={e => setEmail(e.target.value)} placeholder={'E-mail'} size={'default'} extraClass="ml-1"/>
               <PasswordInput value={password} onChange={e => setPassword(e.target.value)}extraClass="mb-2"/>
               <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Уже зарегистрированы? <NavLink to="/login">Войти</NavLink></p>
         </main>
   )
}