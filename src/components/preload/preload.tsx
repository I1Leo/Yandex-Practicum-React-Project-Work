import s from "./preload.module.scss"

export default function Preload() {
   return (
      <p className={`text text_type_main-large ${s.preload}`}>Загрузка...</p>
   )
}