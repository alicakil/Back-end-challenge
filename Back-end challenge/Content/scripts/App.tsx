import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Layout } from "./Features/Layout";
import { Login } from "./Features/Login";
import { NavBar } from "./Features/NavBar";
import { OrderDialog } from "./Features/OrderDialog";
import { getUserInfo, logout, UserInfo } from "./Services/authenticationService";
import { Stock } from "./Features/Stock";

const {
	Header,
	Content,
	Footer
} = Layout;

const App = (): ReactElement => {
	const [didInitiallyLoad, setDidInitiallyLoad] = useState<boolean>(false);
	const [user, setUser] = useState<UserInfo | null>(null);
	const [view, setView] = useState<string>(() => {
		const hash: string = window.location.hash;
		if (hash?.length > 0 && hash[0] === "#") {
			return hash.substring(1);
		}

		return "home";
	});
	const [isOrdering, setIsOrdering] = useState<boolean>(false);

	useEffect(
		() => {
			window.history.replaceState(
				null,
				"",
				`#${view}`
			);
		},
		[view]
	);

	useEffect(
		() => {
			const load = async (): Promise<void> => {
				try {
					const userInfo: UserInfo = await getUserInfo();
					setUser(userInfo);
				} catch (e) {
					setIsOrdering(false);
					setView("home");
					console.error(e);
				} finally {
					setDidInitiallyLoad(true);
				}
			};

			load();
		},
		[]
	);

	const reloadUserInfo = async (): Promise<void> => {
		try {
			const userInfo: UserInfo = await getUserInfo();
			setUser(userInfo);
		} catch (e) {
			console.error(e);
		}
	};

	const authenticatedHandler = async (): Promise<void> => {
		await reloadUserInfo();
	};

	const purchasedHandled = async (): Promise<void> => {
		setIsOrdering(false);
		await reloadUserInfo();
	};

	const signoutHandler = async (): Promise<void> => {
		try {
			await logout();
			setView("home");
			setUser(null);
		} catch (e) {
			console.error(e);
		}
	};

	const changeViewHandler = async (name: string): Promise<void> => {
		console.log(name);
		switch (name) {
			case "buy":
				setIsOrdering(true);
				break;
			case "signout":
				signoutHandler();
				break;
			default:
				setView(name);
		}
	};

	const renderContent = (): ReactElement | null => {
		if (!didInitiallyLoad) {
			return null;
		}

		if (!user) {
			return <Login onAuthenticated={authenticatedHandler} />;
		}

		switch (view) {
			case "stock":
				return <Stock />
			case "home":
			default:
				return (
					<>
						<h2>Hello, {user!.Login}</h2>
						<p>Have a nice day</p>
					</>
				);
		}
	};

	return (
		<Layout>
			<Header>
				<NavBar user={user} onChangeView={changeViewHandler} />
				{user && (
					<div>{user.Balance} gold</div>
				)}
			</Header>
			<Content>
				{renderContent()}

				{(user && isOrdering) && (
					<OrderDialog
						onPurchased={purchasedHandled}
						onClose={() => setIsOrdering(false)}
					/>
				)}
			</Content>
			<Footer />
		</Layout>
	);
};
App.displayName = "App";

ReactDOM.render(
	<App />,
	document.querySelector("#app-host")
);