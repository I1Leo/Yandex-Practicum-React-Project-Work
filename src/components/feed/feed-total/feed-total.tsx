import { TFeed, TFeedOrder } from "../../types/feed";
import s from "./feed-total.module.scss"


export default function FeedTotal({ data }: Omit<TFeed, "type">) : JSX.Element {

   const orders : Array<TFeedOrder> = data.orders


   const doneOrders : Array<TFeedOrder> = orders ? orders.filter((order : TFeedOrder) => order.status === "done") : [];
   const pendingOrders : Array<TFeedOrder> = orders ? orders.filter((order : TFeedOrder)=> order.status === "pending") : [];

   return (
      <>
         <div>
            <div className={s.status_container}>
               <div>
                  <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
                  <div className={`${s.list_container} pb-15`}>
                     <ul className={s.list}>
                        {
                           doneOrders.slice(0, 5).map((doneOrder : TFeedOrder) => (
                              <li key={doneOrder.number} className={`text text_type_digits-default ${s.list_done_item}`}>{doneOrder.number}</li>
                           ))
                        }
                     </ul>
                     <ul className={s.list}>
                        {
                           doneOrders.slice(5, 10).map((doneOrder : TFeedOrder) => (
                              <li key={doneOrder.number} className={`text text_type_digits-default ${s.list_done_item}`}>{doneOrder.number}</li>
                           ))
                        }
                     </ul>
                  </div>
               </div>
               <div>
                  <h3 className="text text_type_main-medium pb-6">В работе:</h3>
                  <div className={`${s.list_container} pb-15`}>
                     <ul className={s.list}>
                        {
                           pendingOrders.slice(0, 5).map((pendingOrder : TFeedOrder) => (
                              <li key={pendingOrder.number} className={`text text_type_digits-default`}>{pendingOrder.number}</li>
                           ))
                        }
                     </ul>
                     <ul className={s.list}>
                        {
                           pendingOrders.slice(5, 10).map((pendingOrder : TFeedOrder) => (
                              <li key={pendingOrder.number} className={`text text_type_digits-default`}>{pendingOrder.number}</li>
                           ))
                        }
                     </ul>
                  </div>
               </div>
            </div>
            <div className={`pb-15`}>
               <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
               <p className={`text text_type_digits-large ${s.total_digits}`}>{data.total}</p>
            </div>
            <div>
               <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
               <p className={`text text_type_digits-large  ${s.total_digits}`}>{data.totalToday}</p>
            </div>
         </div>
      </>
   )
}