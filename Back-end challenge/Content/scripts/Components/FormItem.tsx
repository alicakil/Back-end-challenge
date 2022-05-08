import React, { PropsWithChildren, ReactElement } from "react";

export type FormItemProps = {
	label: string;
};

export const FormItem = (props: PropsWithChildren<FormItemProps>): ReactElement => {
	const {
		label,
		children
	} = props;

	return (
		<div className="form-item">
			<label className="form-item__label">{label}</label>
			<div className="form-item__content">
				{children}
			</div>
		</div>
	);
};
FormItem.displayName = "FormItem";
