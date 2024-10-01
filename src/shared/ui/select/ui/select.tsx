import { FC, useState } from 'react';
import s from './select.module.scss';
import { ArrowIcon } from '@/shared/icons';
interface ISelectProps {
	label: string;
	options: Array<{
		value: string | number;
		label: string;
	}>;
	className?: string;

	activeValue: string | number;
	setActiveValue: (value: string | number) => void;
}

const Select: FC<ISelectProps> = props => {
	const { label, options, className, activeValue, setActiveValue } = props;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`${s.select} ${className}`}>
			<button
				onClick={() => {
					setIsOpen(prev => !prev);
				}}
				className={s.label}
			>
				<span>{options.find(option => option.value === activeValue)?.label}</span>
				<ArrowIcon className={s.arrow} />
			</button>
			<ul className={`${s.list} ${isOpen && s.open}`}>
				{options.map(item => (
					<li key={item.value}>
						<button
							onClick={() => {
								setActiveValue(item.value);
								setIsOpen(false);
							}}
						>
							{item.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Select;
