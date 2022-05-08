import { BadRequestError, BadRequestResponseModel } from "./common";

export type OrderStockItem = {
	Id: number;
	Name: string;
	ImageUrl: string;
	Price: number;
};

export type OrderItemModel = {
	id: number;
	quantity: number;
};

export async function listStockItemsForOrder(): Promise<readonly OrderStockItem[]> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Order/Items",
			{
				method: "GET",
				redirect: "error"
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to list stock items for order");
	}

	if (response.status !== 200) {
		throw new Error("Failed to list stock items for order");
	}

	return (await response.json()) as readonly OrderStockItem[];
}

export async function submitOrder(
	items: readonly OrderItemModel[]
): Promise<void> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Order",
			{
				method: "POST",
				redirect: "error",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(items)
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to submit order");
	}

	if (response.status !== 200) {
		if (response.status === 400) {
			throw new BadRequestError(await response.json() as BadRequestResponseModel)
		}
		throw new Error("Failed to submit order");
	}
}