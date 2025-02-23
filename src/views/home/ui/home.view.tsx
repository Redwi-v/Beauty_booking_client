'use client';
import { NavigationList } from '@/entities/navigation.list';
import { StudioPreview } from '@/entities/studio.preview';
import { BookingList } from '@/widgets/booking.list';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { SalonApi } from '@/shared/api';
import { UserApi } from '@/shared/api/user';

export const HomeView: FC<{ salonId: string }> = ({ salonId }) => {
	const router = useRouter();
	const { data, error } = useQuery({

		queryKey: ['SALON_DATA', salonId],
		queryFn: () => SalonApi.getSalonById(+salonId),

		

		onError: (error: { statusCode: number }) => {
			if (error?.statusCode === 403) {
				router.push('/salonDisabled');
			}
		},
	});

	const { data: session  } = useQuery({
		queryKey: ['SESSION'],
		queryFn: () => UserApi.getSession()
	})


	return (
		<section>
			<StudioPreview data={data}  session={session?.data}/>

			<NavigationList />

			<BookingList session={session?.data}/>
		</section>
	);
};
