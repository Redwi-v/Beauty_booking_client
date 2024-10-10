'use client';
import { HomeView } from '@/views/home';
import { useEffect, useState } from 'react';

export default function Home() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return <>{isClient && <HomeView />}</>;
}
