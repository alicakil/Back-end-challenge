export type StockItem = {
	Id: number;
	Name: string;
	Quantity: number;
}

export async function listStock(): Promise<readonly StockItem[]> {

	let response: Response;
	try {
		response = await fetch(
			"/api/Stock",
			{
				method: "GET",
				redirect: "error"
			}
		);
	} catch (e) {
		console.error(e);
		throw new Error("Failed to request stock");
	}

	if (response.status !== 200) {
		throw new Error("Failed to request stock");
	}

	return (await response.json()) as readonly StockItem[];
}