import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useRef } from 'react';
import s from './burger-ingredients.module.scss';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import { getIngredients } from '../../services/api';
import { BASE_URL } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TIngredients } from '../../services/burger-ingredients';

export default function BurgerIngredients() : JSX.Element{
	const [current, setCurrent] = useState<string>('Булки');

	const { ingredients } = useAppSelector((state) => state.root.ingredients);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients(`${BASE_URL}/ingredients`));
	}, [dispatch]);

	const burgerBuns = [...ingredients].filter(
		(ingredient : TIngredients) : boolean => ingredient.type === 'bun'
	);

	const burgerSauces = [...ingredients].filter(
		(ingredient : TIngredients) : boolean => ingredient.type === 'sauce'
	);

	const burgerMains = [...ingredients].filter(
		(ingredient : TIngredients) : boolean => ingredient.type === 'main'
	);

	const tabsRef = useRef<HTMLUListElement>(null);
	const sectionRefs = {
		Булки: useRef<HTMLDivElement>(null),
		Соусы: useRef<HTMLDivElement>(null),
		Начинки: useRef<HTMLDivElement>(null),
	};

	const handleScroll = () : void => {
		if (!tabsRef.current) return;

		const tabsRect = tabsRef.current.getBoundingClientRect();

		let closestTab = 'Булки';
		let minDistance = Infinity;

		Object.entries(sectionRefs).forEach(([tab, ref]) => {
			if (ref.current) {
				const sectionRect = ref.current.getBoundingClientRect();
				const distance = Math.abs(sectionRect.top - tabsRect.bottom);

				if (distance < minDistance) {
					minDistance = distance;
					closestTab = tab;
				}
			}
		});

		setCurrent(closestTab);
	};

	return (
		<section className=''>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			<ul className={s.tabs} ref={tabsRef}>
				<li>
					<Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
						Булки
					</Tab>
				</li>
				<li>
					<Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
						Соусы
					</Tab>
				</li>
				<li>
					<Tab
						value='Начинки'
						active={current === 'Начинки'}
						onClick={setCurrent}>
						Начинки
					</Tab>
				</li>
			</ul>
			<div
				className={`${s.sections_container} custom-scroll`}
				onScroll={handleScroll}>
				{ingredients.length !== 0 && (
					<>
						<BurgerIngredientsSection
							ingredient={burgerBuns}
							sectionRef={sectionRefs['Булки']}
						/>
						<BurgerIngredientsSection
							ingredient={burgerSauces}
							sectionRef={sectionRefs['Соусы']}
						/>
						<BurgerIngredientsSection
							ingredient={burgerMains}
							sectionRef={sectionRefs['Начинки']}
						/>
					</>
				)}
			</div>
		</section>
	);
}
