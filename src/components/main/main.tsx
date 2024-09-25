import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrderDetails from '../../components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ingredientDetailsSlice } from '../../services/ingredient-details';
import { orderDetailsSlice } from '../../services/order-details';
import s from "./main.module.scss"
import { useNavigate } from 'react-router-dom';


export default function Main() {

   const { isIngredientDetailsModalActive } = useAppSelector(
      (state) => state.root.ingredientDetails
   );
   const { orderRequest, orderFailed, isOrderDetailsModalActive } =
      useAppSelector((state) => state.root.orderDetails);


   const { deactivateIngredientsDetailsModal } = ingredientDetailsSlice.actions;
   const { deactivateOrderDetailsModal } = orderDetailsSlice.actions;
   const dispatch = useAppDispatch();

   const handleClose = () => {
      dispatch(deactivateIngredientsDetailsModal());
      dispatch(deactivateOrderDetailsModal());

   };

   const navigate = useNavigate();

   const handleCloseIngredientsDetails = () => {
      dispatch(deactivateIngredientsDetailsModal());
      dispatch(deactivateOrderDetailsModal());
      navigate("/");
   };

   return (
      <main className={s.main}>
         {isIngredientDetailsModalActive && (
            <Modal title='Детали ингредиента' onClose={handleCloseIngredientsDetails}>
               <IngredientDetails />
            </Modal>
         )}
         {orderRequest && isOrderDetailsModalActive && (
            <Modal title='' onClose={handleClose}>
               <p className='text text_type_main-medium'>Оформление заказа...</p>
            </Modal>
         )}
         {!orderRequest && !orderFailed && isOrderDetailsModalActive && (
            <Modal title='' onClose={handleClose}>
               <OrderDetails />
            </Modal>
         )}
         <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
         </DndProvider>
      </main>
   )
}