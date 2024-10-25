import { FC } from 'react';
import s from './salon.disabled.module.scss';
interface IPageProps {}

const Page: FC<IPageProps> = props => {
	const {} = props;

	return (
		<section className={s.content}>
			<h1 className='h1'>
				Похоже что салон прекратил свою работу или забыл оплатить подписку на сервис
			</h1>
		</section>
	);
};

export default Page;
