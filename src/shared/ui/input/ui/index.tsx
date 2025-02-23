import { FC, InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import s from './input.module.scss';
import { EyeIcon } from '@/shared/icons';

interface IInputProps {
	placeholder?: string;
	title?: string;
	error?: string | null;
	required?: boolean;

	inputProps?: UseFormRegisterReturn<any>;
	mask?: string;

	type?: 'text' | 'password';
}

export const Input: FC<IInputProps> = ({
	placeholder,
	title,
	error,
	required,
	mask,
	inputProps,
	type,
}) => {

	const [ inputType, setInputType ] = useState(type || 'text') 

	return (
		<div className={s.content}>
			<span className={`${s.form_title} ${required && s.required}`}>{title}</span>
			{mask ? (
				<ReactInputMask
					mask={mask}
					required={false}
					alwaysShowMask={false}
					placeholder={placeholder}
					{...inputProps}
				/>
			) : (
				<div className={s.input_wrapper}>
					<input
						type={inputType}
						placeholder={placeholder}
						{...inputProps}
					/>
					{type === 'password' && (
						<button className={`${ s.password_button } ${ inputType !== 'password' ? s.show_password: '' }`} type='button' onClick={() => {
							setInputType(prev => prev === 'password' ? 'text' : 'password')
						}}>
							<EyeIcon />
						</button>
					)}
				</div>
			)}
			{error && <span className={s.err}>{error}</span>}
		</div>
	);
};
