import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks"
import IngredientCircle from "../ingredient-circle/ingredient-circle";
import s from "./order-info.module.scss"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import Preload from "../preload/preload";
import { getOrderByNumber } from "../../services/api";
import { ORDER_BY_NUMBER_URL } from "../../constants";
import { TOrdersInfo } from "../types/orders";
import { OrderStatus, TFeedOrder } from "../types/feed";
import { TIngredients } from "../types/ingredients";



export default function OrdersInfo ({ isModal, type }: TOrdersInfo) : JSX.Element | null {

   const { orderNumber } = useParams();

   if (!orderNumber) {
      return null
   }

   const currentOrder = useAppSelector<TFeedOrder | null>(state => {
      
      let order : TFeedOrder | undefined;

      if (type === "feed") {
         order = state.root.feed.feed?.orders.find((o : TFeedOrder) => o.number === +orderNumber);

         if (order) {
            return order
         }
      }

      if (type === "profile") {
         order = state.root.profileFeed.orders?.orders.find((o : TFeedOrder) => o.number === +orderNumber);

         if (order) {
            return order
         }
      }

      return state.root.profileFeed.currentOrder;
   })

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!currentOrder) {
         dispatch(getOrderByNumber(`${ORDER_BY_NUMBER_URL}/${orderNumber}`))
      }
   }, [])

   const ingredients = useAppSelector<TIngredients[]>(state => state.root.ingredients.ingredients);

   
   if ( !ingredients || !currentOrder) {
      return <Preload />;
   }

   const currentIngredients : string[] = currentOrder.ingredients;

   const currentIngredientsSet: {
      [key: string]: {
         name: string;
         price: number;
         img: string;
         value: number;
      };
   } = {};

   currentIngredients.forEach((currentIngredient : string) => {
      if (!(currentIngredient in currentIngredientsSet)) {
         const currentIngredientInfo : TIngredients | undefined = ingredients.find(ingredient => ingredient._id === currentIngredient);

         if (!currentIngredientInfo) {
            return null
         } 

         currentIngredientsSet[currentIngredient] = {
            name: currentIngredientInfo.name,
            price: currentIngredientInfo.price,
            img: currentIngredientInfo.image_mobile,
            value: 1,
         }
      } else {
         currentIngredientsSet[currentIngredient].value += 1;
      }
   })

   let totalPrice : number = 0;

   totalPrice = currentIngredients.reduce((sum : number, currentIngredient : string) => {
      const ingredient : TIngredients | undefined = ingredients.find((ingredient : TIngredients) => ingredient._id === currentIngredient);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);

   const orderStatus : string = currentOrder.status === "created" ? OrderStatus.created : currentOrder.status === "pending" ? OrderStatus.pending : OrderStatus.done;

   return (

      <>
         {
            !isModal ?
               <section>
                  <div className={s.container} >
                     <h3 className={`text text_type_digits-default pb-10 ${s.title}`}>#{currentOrder.number}</h3>
                     <p className="text text_type_main-large pb-3">{currentOrder.name}</p>
                     <p className={`text text_type_main-default pb-6 ${orderStatus === "Выполнен" && s.done_order}`}>{orderStatus}</p>
                     <p className="text text_type_main-large pb-6">Состав:</p>
                     <ul className={`pr-6 ${s.list}`}>
                        {
                           Object.values(currentIngredientsSet).map(currentIngredient => (
                              <li className={s.item} key={currentIngredient.name}>
                                 <IngredientCircle ingredient={ingredients.filter(ingredient => ingredient.name === currentIngredient.name)[0]} />
                                 <p className="text text_type_main-default">{currentIngredient.name}</p>
                                 <div className={s.price_container}>
                                    <p className="text text_type_digits-default">{`${currentIngredient.value} x ${currentIngredient.price}`}</p>
                                    <CurrencyIcon type="primary" />
                                 </div>

                              </li>
                           ))
                        }
                     </ul>
                     <div className={`${s.total_container} pt-10`}>
                        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(currentOrder.createdAt)} /></p>
                        <div className={s.total_price_container}>
                           <p className="text text_type_digits-default">{totalPrice}</p>
                           <CurrencyIcon type="primary" />
                        </div>
                     </div>
                  </div >
               </section > :

               <section>
                  <div className={`${s.container} ${s.container_modal}`} >
                     <p className="text text_type_main-large pb-3">{currentOrder.name}</p>
                     <p className={`text text_type_main-default pb-6 ${orderStatus === "Выполнен" && s.done_order}`}>{orderStatus}</p>
                     <p className="text text_type_main-large pb-6">Состав:</p>
                     <ul className={`pr-6 ${s.list}`}>
                        {
                           Object.values(currentIngredientsSet).map(currentIngredient => (
                              <li className={s.item} key={currentIngredient.name}>
                                 <IngredientCircle ingredient={ingredients.filter(ingredient => ingredient.name === currentIngredient.name)[0]} />
                                 <p className="text text_type_main-default">{currentIngredient.name}</p>
                                 <div className={s.price_container}>
                                    <p className="text text_type_digits-default">{`${currentIngredient.value} x ${currentIngredient.price}`}</p>
                                    <CurrencyIcon type="primary" />
                                 </div>

                              </li>
                           ))
                        }
                     </ul>
                     <div className={`${s.total_container} pt-10`}>
                        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(currentOrder.createdAt)} /></p>
                        <div className={s.total_price_container}>
                           <p className="text text_type_digits-default">{totalPrice}</p>
                           <CurrencyIcon type="primary" />
                        </div>
                     </div>
                  </div >
               </section >
         }

      </>
   )
}