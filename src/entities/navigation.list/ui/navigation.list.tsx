import Link from "next/link";
import { FC } from "react";
import s from './navigation.list.module.scss'
import Image from "next/image";
import { useParams } from 'next/navigation';

interface NavigationListProps {}

// FIXME: Убрать ели переиспользуем
const data = [
	{
		href: '/choice.specialist',
		title: 'Выбрать специалиста',
		icon: '/icons/list.svg',
	},

	{
		href: '/choice.date',
		title: 'Выбрать дату и время',
		icon: '/icons/calendar.svg',
	},

	{
		href: '/choice.service',
		title: 'Выбрать услуги',
		icon: '/icons/peoples.svg',
	},
];

export const NavigationList: FC<NavigationListProps> = () => {
	const { salonId } = useParams();

	return (
		<>
			<h1 className={`${s.title} h1`}>
				<Image
					src='/icons/peoples_full.svg'
					width={32}
					height={32}
					alt={'peoples'}
				/>
				Запись на услугу
			</h1>

			<ul className={`${s.list} flex flex-col gap-10`}>
				{data.map((item, index) => (
					<li key={index}>
						<Link
							className={`${s.link}`}
							href={`/${salonId}${item.href}`}
						>
							<div className={`${s.icon} flex all-center`}>
								<Image
									src={item.icon}
									width={20}
									height={20}
									alt={item.title}
								/>
							</div>

							<p className='p'>{item.title}</p>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
 