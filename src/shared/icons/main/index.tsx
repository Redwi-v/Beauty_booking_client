import { FC } from 'react';

export const ArrowIcon: FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			className={className}
			width='24'
			height='25'
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M6 9.20001L12 15.2L18 9.20001'
				stroke='#D9D9D9'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export const ClockIcon: FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			className={className}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12 0C5.37097 0 0 5.37097 0 12C0 18.629 5.37097 24 12 24C18.629 24 24 18.629 24 12C24 5.37097 18.629 0 12 0ZM14.7629 16.9403L10.4952 13.8387C10.3452 13.7274 10.2581 13.5532 10.2581 13.3694V5.22581C10.2581 4.90645 10.5194 4.64516 10.8387 4.64516H13.1613C13.4806 4.64516 13.7419 4.90645 13.7419 5.22581V11.8887L16.8145 14.1242C17.0758 14.3129 17.129 14.6758 16.9403 14.9371L15.5758 16.8145C15.3871 17.071 15.0242 17.129 14.7629 16.9403Z'
				fill='#0FA3E2'
			/>
		</svg>
	);
};

export const DotsIcon: FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			className={className}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='11.5'
				cy='5.5'
				r='1.5'
				transform='rotate(90 11.5 5.5)'
				fill='#0FA3E2'
			/>
			<circle
				cx='11.5'
				cy='12.5'
				r='1.5'
				transform='rotate(90 11.5 12.5)'
				fill='#0FA3E2'
			/>
			<circle
				cx='11.5'
				cy='19.5'
				r='1.5'
				transform='rotate(90 11.5 19.5)'
				fill='#0FA3E2'
			/>
		</svg>
	);
};
