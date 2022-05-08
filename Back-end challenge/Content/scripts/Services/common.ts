export type BadRequestResponseModel = {
	Message: string;
};

export class BadRequestError extends Error {
	public readonly model: Readonly<BadRequestResponseModel>;

	constructor(model: BadRequestResponseModel) {
		super(`Server returned a bad request: ${JSON.stringify(model)}`);
		this.model = model;
	}
}