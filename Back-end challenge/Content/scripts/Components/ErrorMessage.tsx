import React, { ReactElement } from "react";

export type ErrorMessageProps = {
	text: string;
};

export const ErrorMessage = (props: ErrorMessageProps): ReactElement => {
	const {
		text
	} = props;

	return (
		<div className="error-message">
			{text}
		</div>
	);
};
ErrorMessage.displayName = "ErrorMessage";
