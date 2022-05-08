import classNames from "classnames";
import React, { ReactElement } from "react";

export type IconKind =
	| "cross"
	| "minus"
	| "plus";

export type IconProps = {
	kind: IconKind;
};

export const Icon = (props: IconProps): ReactElement => {
	const {
		kind,
	} = props;

	return (
		<i className={classNames("icon", `icon--${kind}`)}/>
	);
};
Icon.displayName = "Icon";
