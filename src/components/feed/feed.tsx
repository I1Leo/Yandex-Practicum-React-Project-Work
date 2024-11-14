import Preload from '../preload/preload';
import { TFeed, TFeedOrder } from '../types/feed';
import FeedItem from './feed-item/feed-item';
import FeedTotal from './feed-total/feed-total';
import s from './feed.module.scss';

export default function Feed({ data, type }: TFeed): JSX.Element {
	const orders: Array<TFeedOrder> = data.orders;

	return (
		<>
			{orders ? (
				<section className={s.section}>
					<h1 className='text text_type_main-large pt-10 pb-5'>
						Лента заказов
					</h1>
					<div className={s.container}>
						<ul className={s.feed_container}>
							{orders &&
								orders.map((order: TFeedOrder) => (
									<FeedItem type={type} key={order.number} order={order} />
								))}
						</ul>
						<FeedTotal data={data} />
					</div>
				</section>
			) : (
				<Preload />
			)}
		</>
	);
}
