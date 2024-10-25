'use client';
import { NavigationList } from '@/entities/navigation.list';
import { StudioPreview } from '@/entities/studio.preview';
import { salonApi } from '@/shared/api/salon';
import { BookingList } from '@/widgets/booking.list';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import WebApp from '@twa-dev/sdk';

export const HomeView: FC<{ salonId: string }> = ({ salonId }) => {
	const router = useRouter();
	const { data, error } = useQuery({
		queryKey: ['SalonData'],
		queryFn: () => salonApi.getSalonById(+salonId),
		enabled: !!salonId,
		retry: false,
		onError: (error: { statusCode: number }) => {
			if (error?.statusCode === 403) {
				router.push('/salonDisabled');
			}
		},
	});

	return (
		<section>
			<StudioPreview data={data?.data} />

			<NavigationList />

			<BookingList />
		</section>
	);
};
