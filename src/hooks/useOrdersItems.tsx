

import { Order } from "@models/Order"
import { OrderSent } from "@models/OrderSent"
import { Product2 } from "@models/Product2"
import { ProductOrder } from "@models/ProductOrder"

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"
import { useLocalStorage } from "@components/providers/useLocalStorage"

export const useOrderItems = (AFFILIATE_ID: number, orderItems: OrderSent[]) => {
    const [items, setItems] = useState<ProductOrder[]>([])


    const getAllOrdersItems = useCallback(async (AFFILIATE_ID: number, orderItems: OrderSent[]) => {
        try {
            const { status, data } = await TodoService.getAllOrderItems(AFFILIATE_ID, orderItems);



            setItems(data)
        } catch (err) {

        }


    }, [])





    return {
        items,
        getAllOrdersItems
    }
}