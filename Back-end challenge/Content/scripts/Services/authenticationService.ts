import { BadRequestError, BadRequestResponseModel } from "./common";

export type UserInfo = {
	Login: string;
	Balance: number;
}

export async function login(
	login: string,
	password: string
): Promise<void> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Authentication/Login",
			{
				method: "POST",
				redirect: "error",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					login: login,
					password
				})
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to login");
	}

	if (response.status !== 200) {
		if (response.status === 400) {
			throw new BadRequestError(await response.json() as BadRequestResponseModel)
		}
		throw new Error("Failed to login");
	}
}

export async function logout(): Promise<void> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Authentication/Logout",
			{
				method: "POST",
				redirect: "error"
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to logout");
	}

	if (response.status !== 200) {
		throw new Error("Failed to logout");
	}
}

export async function getUserInfo(): Promise<UserInfo> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Authentication/UserInfo",
			{
				method: "GET",
				redirect: "error"
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to get user info");
	}

	if (response.status !== 200) {
		throw new Error("Failed to get user info");
	}

	return (await response.json()) as UserInfo;
}