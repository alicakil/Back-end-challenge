import classNames from "classnames";
import React, { ReactElement, MouseEvent } from "react";
import { Icon, IconKind } from "./Icon";

export type ActionButtonProps = {
	icon: IconKind;
	kind: "transparent" | "secondary";
	onClick(): void;
};

export const ActionButton = (props: ActionButtonProps): ReactElement => {
	const {
		icon,
		kind,
		onClick
	} = props;

	const clickHandler = (args: MouseEvent): void => {
		args.stopPropagation();
		onClick();
	};

	return (
		<button
			type="button"
			className={classNames(
				"action-button",
				`action-button--${kind}`
			)}
			onClick={clickHandler}
		>
			<Icon kind={icon} />
		</button>
	);
};
ActionButton.displayName = "ActionButton";
