import React, { PropsWithChildren, ReactElement, MouseEvent } from "react";
import { UserInfo } from "../Services/authenticationService";

export type NavBarProps = {
	user: UserInfo | null;
	onChangeView(view: string): void;
};

export const NavBar = (props: PropsWithChildren<NavBarProps>): ReactElement => {
	const {
		user,
		onChangeView
	} = props;

	const clickHandler = (args: MouseEvent<HTMLAnchorElement>): void => {
		args.preventDefault();
		const href: string | null = args.currentTarget.getAttribute("href");
		if (!href) {
			return;
		}
		onChangeView(href.substring(1));
	};

	return (
		<ul className="nav-bar">
			<li className="nav-bar__item">
				<a href="#home" onClick={clickHandler}>Home</a>
			</li>
			{user && (
				<>
					<li className="nav-bar__item">
						<a href="#stock" onClick={clickHandler}>Stock</a>
					</li>

					<li className="nav-bar__item">
						<a href="#buy" onClick={clickHandler}>Buy</a>
					</li>

					<li className="nav-bar__item">
						<a href="#signout" onClick={clickHandler}>Sign out</a>
					</li>
				</>
			)}
		</ul>
	);
};
NavBar.displayName = "NavBar";
