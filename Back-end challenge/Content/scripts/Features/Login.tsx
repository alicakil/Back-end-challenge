import React, { FormEvent, ReactElement, useState } from "react";
import { Button } from "../Components/Button";
import { ErrorMessage } from "../Components/ErrorMessage";
import { FormItem } from "../Components/FormItem";
import { login } from "../Services/authenticationService";
import { TextInput } from "../Components/TextInput";
import { BadRequestError } from "../Services/common";

type LoginModel = {
	login: string;
	password: string;
};

export type LoginProps = {
	onAuthenticated(): void;
};

export const Login = (props: LoginProps): ReactElement => {
	const {
		onAuthenticated
	} = props;

	const [model, setModel] = useState<LoginModel>({ login: "", password: "" });
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const submitHandler = async (args: FormEvent): Promise<void> => {
		args.preventDefault();
		setErrorMessage(undefined);

		try {
			await login(model.login, model.password);
			onAuthenticated();
		} catch (e) {
			if (e instanceof BadRequestError) {
				setErrorMessage(e.model.Message);
			} else {
				console.error(e);
				alert("Something is not ok, check the console log");
			}
		}
	}

	return (
		<form onSubmit={submitHandler}>
			{errorMessage && (
				<ErrorMessage text={errorMessage} />
			)}

			<FormItem label="Login">
				<TextInput
					value={model.login}
					onChange={(v) => setModel((x) => ({ ...x, login: v }))}
				/>
			</FormItem>

			<FormItem label="Password">
				<TextInput
					type="password"
					value={model.password}
					onChange={(v) => setModel((x) => ({ ...x, password: v }))}
				/>
			</FormItem>

			<Button type="submit" kind="primary" text="Log in" />
		</form>
	);
};
Login.displayName = "Login";
