import { useEffect } from "react";
import FeedItem from "../../components/feed/feed-item/feed-item";
import Preload from "../../components/preload/preload";
import { TFeedOrder } from "../../components/types/feed";
import { useAppDispatch, useAppSelector } from "../../hooks"
import s from "./order-page.module.scss"
import { wsProfileFeedConnect, wsProfileFeedDisconnect } from "../../services/profile-feed/actions";
import { ORDERS_SERVER_URL } from "../../constants";

export default function OrderPage(): JSX.Element | null {

   let orders = useAppSelector<TFeedOrder[] | undefined>(state => state.root.profileFeed.orders?.orders);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(wsProfileFeedConnect(`${ORDERS_SERVER_URL}?token=${localStorage.getItem("accessToken")?.slice(7)}`))

      return () => {
         dispatch(wsProfileFeedDisconnect());
      };
   }, [dispatch]);

   if (!orders) {
      return null
   }

   return (
      <>
         {
            orders ?
               <ul className={s.list}>
                  {orders && orders.map((order: TFeedOrder) => <FeedItem type="profile" key={order.number} order={order} />)}
               </ul> :
               <Preload />

         }
      </>
   )
}