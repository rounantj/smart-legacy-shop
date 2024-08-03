

import { Order } from "@models/Order"
import { Product2 } from "@models/Product2"

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"
import { useLocalStorage } from "@components/providers/useLocalStorage"

export const useAllOrders = (AFFILIATE_ID: number, clientId: number, myToken: string) => {
    const [orders, setOrders] = useState<Order[]>([])


    const getAllOrders = useCallback(async (AFFILIATE_ID: number, clientId: number, myToken: string) => {

        const { status, data } = await TodoService.getMyOrders(AFFILIATE_ID, clientId, myToken);


        setOrders(data)

    }, [])





    return {
        orders,
        getAllOrders
    }
}