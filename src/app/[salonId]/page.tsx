'use client';
import { HomeView } from '@/views/home';

export default function Home({ params }) {
	if (params?.salonId) {
		if (typeof window !== "undefined") {
			window &&	window.localStorage.setItem('lastSalon', params.salonId);
		}
	}


	return (
		<>
			<HomeView salonId={params?.salonId} />
		</>
	);
}
