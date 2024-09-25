import AppHeader from "../../components/app-header/app-header";
import s from "./not-found-page.module.scss"


export default function NotFoundPage () {
   return (
         <main className={s.main}>
            <p className="text text_type_main-large"> Страница не найдена</p>
         </main>
   )
}