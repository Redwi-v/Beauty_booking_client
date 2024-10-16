'use client';
import { NavigationList } from '@/entities/navigation.list';
import { StudioPreview } from '@/entities/studio.preview';
import { salonApi } from '@/shared/api/salon';
import { BookingList } from '@/widgets/booking.list';
import WebApp from '@twa-dev/sdk';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const HomeView: FC = () => {
	const { data } = useQuery({
		queryKey: ['SalonData'],
		queryFn: () =>
			salonApi.getSalonById(typeof window !== 'undefined' && +WebApp.initDataUnsafe.start_param),
	});

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<section>
			{isClient && (
				<>
					<StudioPreview data={data?.data} />

					<NavigationList />

					<BookingList />
				</>
			)}
		</section>
	);
};
