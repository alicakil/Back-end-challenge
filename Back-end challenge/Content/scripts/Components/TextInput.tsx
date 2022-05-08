import React, { ChangeEvent, ReactElement } from "react";

export type TextInputProps = {
	value: string;
	onChange(value: string): void;
	type?: "text" | "password";
};

export const TextInput = (props: TextInputProps): ReactElement => {
	const {
		value,
		onChange,
		type = "text"
	} = props;

	const changeHandler = (args: ChangeEvent<HTMLInputElement>): void => {
		onChange(args.currentTarget.value);
	};

	return (
		<input
			type={type}
			value={value ?? ""}
			onChange={changeHandler}
			className={"text-input"}
		/>
	);
};
TextInput.displayName = "TextInput";
