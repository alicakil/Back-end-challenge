import React, { ReactElement } from "react";
import { QuantityInput } from "../Components/QuantityInput";
import { OrderStockItem } from "../Services/orderService";

export type OrderItemProps = {
	value: number;
	onChange(value: number): void;
	stockInfo: OrderStockItem;
};

export const OrderItem = (props: OrderItemProps): ReactElement => {
	const {
		value,
		onChange,
		stockInfo
	} = props;

	return (
		<div className="order-item">
			<img className="order-item__image" src={stockInfo.ImageUrl} />
			<span className="order-item__name">{stockInfo.Name}</span>
			<QuantityInput value={value} onChange={onChange} />
			<span className="order-item__total">{stockInfo.Price} gold</span>
		</div>
	);
}
OrderItem.displayName = "OrderItem";