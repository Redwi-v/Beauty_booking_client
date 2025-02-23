'use client';
import { Inter, Roboto } from 'next/font/google';
import './_styles/globals.scss';
import localFont from 'next/font/local';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Script from 'next/script';
import Head from 'next/head';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	display: 'swap',
	weight: ['400', '500', '700'],
});

const myFont = localFont({
	variable: '--font-sf_pro_text',

	src: [
		{
			path: '../../public/fonts/SF-Pro-Text-Medium.otf',
			weight: '500',
			style: 'normal',
		},

		{
			path: '../../public/fonts/SF-Pro-Text-Regular.otf',
			weight: '400',
			style: 'normal',
		},

		{
			path: '../../public/fonts/SF-Pro-Text-Semibold.otf',
			weight: '600',
			style: 'normal',
		},
	],
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='ru'>
			<body className={`${roboto.variable} ${myFont.variable}`}>
				<link
					rel='stylesheet'
					href='https://cdn.direct.i-dgtl.ru/VerifyWidget.css'
				/>
				<section>
					<ReactNotifications />
				</section>
				<QueryClientProvider client={queryClient}>
					<main className='content container'>{children}</main>
				</QueryClientProvider>
				<Script
					src='https://cdn.direct.i-dgtl.ru/VerifyWidget.umd.min.js'
					onLoad={() => {
						//@ts-ignore
						window.directIsReady = true;
					}}
				></Script>
			</body>
		</html>
	);
}
