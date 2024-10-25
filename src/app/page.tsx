'use client';
import WebApp from '@twa-dev/sdk';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
interface IPageProps {}

const Page: FC<IPageProps> = props => {
	const {} = props;
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined' && WebApp?.initDataUnsafe) {
			router.push(`/${WebApp.initDataUnsafe.start_param}`);
		}
	}, []);

	return <></>;
};

export default Page;
