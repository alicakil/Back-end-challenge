import { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

export type PortalProps = {
	children: ReactNode;
	container: string;
};

export const Portal = (props: PortalProps): ReactElement => {
	const {
		children,
		container
	} = props;

	const containerElement: Element | null = document.querySelector(container);
	if (!containerElement) {
		throw new Error(`${container} is not found in the DOM`);
	}

	return createPortal(
		children,
		containerElement
	);
};

Portal.displayName = "Portal";