'use client'

import { FC, ReactNode, useEffect } from 'react';
import { userActiveUserStore } from '../model/active.user.store';

export const ClientRoot: FC = () => {
	const setUser = userActiveUserStore(state => state.setUser);

	return null;
};