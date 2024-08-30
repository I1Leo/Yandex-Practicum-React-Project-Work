import DoneIcon from '../../images/done-icon.png';
import s from './order-details.module.scss';

export default function OrderDetails() {
	return (
		<>
			<p className={`${s.order_number} text text_type_digits-large pt-15 pb-8`}>
				034536
			</p>
			<p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
			<div className='pb-15'>
				<img src={DoneIcon} alt="done icon" />
			</div>
			<p className='text text_type_main-default pb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive pb-15'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
}
