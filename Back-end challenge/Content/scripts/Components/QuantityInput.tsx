import React, { ReactElement } from "react";
import { ActionButton } from "./ActionButton";
import { TextInput } from "./TextInput";

export type QuantityInputProps = {
	value: number;
	onChange(value: number): void;
};

export const QuantityInput = (props: QuantityInputProps): ReactElement => {
	const {
		value,
		onChange
	} = props;

	const changeHandler = (value: string): void => {
		if (value === "") {
			onChange(0);
		} else if (value.match(/^\d+$/)) {
			onChange(parseInt(value, 10));

		}
	};

	const clickHandler = (amount: number): void => {
		onChange(value + amount);
	};

	return (
		<div className="quantity-input">
			<ActionButton
				icon="minus"
				kind="secondary"
				onClick={() => clickHandler(-1)}
			/>
			<div className="quantity-input__input">
				<TextInput
					value={value.toString()}
					onChange={changeHandler}
				/>
			</div>
			<ActionButton
				icon="plus"
				kind="secondary"
				onClick={() => clickHandler(+1)}
			/>

		</div>
	);
};
QuantityInput.displayName = "QuantityInput";
