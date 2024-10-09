import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./profile-page.module.scss"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, updateUser } from "../../services/api";
import { Dispatch, FormEvent, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";


export default function ProfilePage(): JSX.Element {

   const user = useAppSelector(state => state.root.auth.user);

   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   const [isNameEditable, setIsNameEditable] = useState<boolean>(false);
   const [isEmailEditable, setIsEmailEditable] = useState<boolean>(false);
   const [isPasswordEditable, setIsPasswordEditable] = useState<boolean>(false);


   const nameRef = useRef<HTMLInputElement | null>(null);
   const emailRef = useRef<HTMLInputElement | null>(null);
   const passwordRef = useRef<HTMLInputElement | null>(null);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const location = useLocation();

   useEffect(() => {
      if (user) {
         setName(user.name);
         setEmail(user.email);
      }
   }, [user]);


   const handleLogout = (): void => {
      dispatch(logout());
      navigate("/login")
   }

   const handleEdit = (ref: MutableRefObject<HTMLInputElement | null>, setEditable: Dispatch<SetStateAction<boolean>>, isEditable: boolean) => {
      if (isEditable && ref.current) {
         ref.current.blur();
         setEditable(false);
      } else if (ref.current) {
         ref.current.focus();
         setEditable(true);
      }
   }


   const handleCancel = () => {
      if (user) {
         setName(user.name);
         setEmail(user.email);
      }
      setPassword('');
      setIsNameEditable(false);
      setIsEmailEditable(false);
      setIsPasswordEditable(false);
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
      e.preventDefault();

      const form = {
         "name": name,
         "email": email,
         "password": password
      }

      dispatch(updateUser(form)).then(() => {
         setPassword('');
         setIsNameEditable(false);
         setIsEmailEditable(false);
         setIsPasswordEditable(false);
      });


   }

   return (
      <main className={s.main}>
         <div className={s.container}>
            <nav>
               <ul className="pb-20">
                  <li className={`text text_type_main-large ${s.nav_text}`}><NavLink to="/profile" className={({ isActive }) => isActive ? 'text_color_default' : "text_color_inactive"} end>Профиль</NavLink></li>
                  <li className={`text text_type_main-large ${s.nav_text}`}><NavLink to="/profile/order" className={({ isActive }) => isActive ? 'text_color_default' : "text_color_inactive"}>История заказов</NavLink></li>
                  <li className={`text text_type_main-large ${s.nav_text} text_color_inactive `}><button onClick={() => handleLogout()}>Выход</button></li>
               </ul>
               <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете <br />изменить свои персональные данные</p>
            </nav>
            {
               location.pathname === "/profile" ?
                  <form className={s.form} onSubmit={handleSubmit}>
                     <Input type={'text'} placeholder={'Имя'} disabled={!isNameEditable} value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} onIconClick={() => handleEdit(nameRef, setIsNameEditable, isNameEditable)} size={'default'} extraClass="ml-1" icon={isNameEditable ? "CloseIcon" : "EditIcon"} />
                     <Input type={'email'} placeholder={'E-mail'} disabled={!isEmailEditable} value={email} ref={emailRef} onChange={(e) => setEmail(e.target.value)} onIconClick={() => handleEdit(emailRef, setIsEmailEditable, isEmailEditable)} size={'default'} extraClass="ml-1" icon={isEmailEditable ? "CloseIcon" : "EditIcon"} />
                     <Input type={'password'} placeholder={'Пароль'} disabled={!isPasswordEditable} value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} onIconClick={() => handleEdit(passwordRef, setIsPasswordEditable, isPasswordEditable)} size={'default'} extraClass="ml-1" icon={isPasswordEditable ? "CloseIcon" : "EditIcon"} />
                     <div className={isNameEditable || isEmailEditable || isPasswordEditable ? `${s.form_controls} ${s.isActive}` : s.form_controls}>
                        <button type="button" className={`text text_type_main-default ${s.cancel_btn}`} onClick={handleCancel}>Отмена</button>
                        <Button htmlType="submit" type="primary" size="large" >Сохранить</Button>
                     </div>
                  </form> :
                  <Outlet />
            }
         </div>
      </main>
   )
}