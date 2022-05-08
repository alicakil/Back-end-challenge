import React, { ReactElement, useEffect, useState } from "react";
import { ActionButton } from "../Components/ActionButton";
import { Button } from "../Components/Button";
import { ErrorMessage } from "../Components/ErrorMessage";
import { OrderItem } from "./OrderItem";
import { Portal } from "../Components/Portal";
import { listStockItemsForOrder, OrderItemModel, OrderStockItem, submitOrder } from "../Services/orderService";
import { BadRequestError } from "../Services/common";

type ItemState = {
	quantity: number;
	stockInfo: OrderStockItem;
};

export type OrderDialogProps = {
	onPurchased(): void;
	onClose(): void;
};

export const OrderDialog = (props: OrderDialogProps): ReactElement => {
	const {
		onPurchased,
		onClose
	} = props;

	const [orderItems, setOrderItems] = useState<readonly ItemState[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	useEffect(
		() => {
			const load = async (): Promise<void> => {
				const items: readonly OrderStockItem[] = await listStockItemsForOrder();
				setOrderItems(
					items.map((x) => ({ quantity: 0, stockInfo: x }))
				);
			};

			load();
		},
		[]
	);

	const changeHandler = (id: number, quantity: number): void => {
		setOrderItems(
			(x) => {
				const result: ItemState[] = [...x];
				const index: number = result.findIndex(x => x.stockInfo.Id === id);
				if (index !== -1) {
					result[index] = { ...result[index], quantity };
				}

				return result;
			}
		);
	};

	const buyHandler = async (): Promise<void> => {
		setErrorMessage(undefined);

		try {
			const order: OrderItemModel[] = orderItems.filter(x => x.quantity !== 0)
				.map((x) => ({ id: x.stockInfo.Id, quantity: x.quantity }));
			await submitOrder(order);
			onPurchased();
		} catch (e) {
			if (e instanceof BadRequestError) {
				setErrorMessage(e.model.Message);
			} else {
				console.error(e);
				alert("Something is not ok, check the console log");
			}
		}
	};

	return (
		<Portal container="body">
			<div className="dialog-backdrop" />
			<div className="dialog-container">
				<div className="dialog">
					<div className="dialog__header">
						<h2 className="dialog__title">Order</h2>
						<div className="dialog__close">
							<ActionButton icon="cross" kind="transparent" onClick={onClose} />
						</div>
					</div>
					<div className="dialog__body">
						{errorMessage && (
							<ErrorMessage text={errorMessage} />
						)}

						{orderItems.map((x) => (
							<OrderItem
								key={x.stockInfo.Id}
								stockInfo={x.stockInfo}
								value={x.quantity}
								onChange={(v) => changeHandler(x.stockInfo.Id, v)}
							/>
						))}

						<h3 className="order-dialog__total">
							<span>Total</span>
							<span>{orderItems.reduce((prev, x) => prev + (x.quantity * x.stockInfo.Price), 0)} gold</span>
						</h3>
					</div>
					<div className="dialog__footer">
						<Button
							kind="primary"
							text="Buy"
							onClick={buyHandler}
						/>

						<Button
							kind="secondary"
							text="Cancel"
							onClick={onClose}
						/>
					</div>
				</div>
			</div>
		</Portal>
	);
};

OrderDialog.displayName = "OrderDialog";
