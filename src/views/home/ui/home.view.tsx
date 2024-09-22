'use client'

import { NavigationList } from "@/entities/navigation.list";
import { IStudioPreviewInfo, StudioPreview } from "@/entities/studio.preview";
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { FC } from 'react';

interface HomeViewProps {
	studioInfo: IStudioPreviewInfo;
}

export const HomeView: FC<HomeViewProps> = ({ studioInfo }) => {
	console.log(WebApp);

	return (
		<section>
			<StudioPreview
				href={'/studio'}
				info={studioInfo}
			/>

			<NavigationList />
		</section>
	);
};
 