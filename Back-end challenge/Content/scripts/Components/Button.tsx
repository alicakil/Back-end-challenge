import classNames from "classnames";
import React, { ReactElement } from "react";

export type ButtonProps = {
	text: string;
	type?: "button" | "submit";
	kind: "primary" | "secondary";
	onClick?(): void;
};

export const Button = (props: ButtonProps): ReactElement => {
	const {
		text,
		type = "button",
		kind,
		onClick
	} = props;

	return (
		<button
			type={type}
			className={classNames(
				"button",
				`button--${kind}`
			)}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
Button.displayName = "Button";
