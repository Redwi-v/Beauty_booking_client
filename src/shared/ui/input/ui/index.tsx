import { FC, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import s from './input.module.scss';

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
				<input
					type={type}
					placeholder={placeholder}
					{...inputProps}
				/>
			)}
			{error && <span className={s.err}>{error}</span>}
		</div>
	);
};
