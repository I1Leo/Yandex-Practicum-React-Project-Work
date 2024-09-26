import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./register-page.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../utils/api";
import { useForm } from "../../hooks";


export default function RegisterPage() {
   
   const { values, handleChange, setValues } = useForm({
      name: "",
      email: "",
      password: "",
   });

   const navigate = useNavigate();
 
   const handleSubmit = async (e) => {
      e.preventDefault();

      const form = {
         "email": values.email, 
         "password": values.password, 
         "name": values.name, 
       }
       
      register(form);
      navigate('/login');
   }

   return (
         <main className={s.main}>
            <form action="" method="post"  className={`${s.form} pb-20`} onSubmit={handleSubmit}>
               <p className="text text_type_main-medium">Регистрация</p>
               <Input name="name" type={'text'} value={values.name}  onChange={handleChange} placeholder={'Имя'} size={'default'} extraClass="ml-1"/>
               <Input name="email" type={'text'} value={values.email} onChange={handleChange} placeholder={'E-mail'} size={'default'} extraClass="ml-1"/>
               <PasswordInput name="password" value={values.password} onChange={handleChange}extraClass="mb-2"/>
               <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default ${s.text}`}>Уже зарегистрированы? <NavLink to="/login">Войти</NavLink></p>
         </main>
   )
}