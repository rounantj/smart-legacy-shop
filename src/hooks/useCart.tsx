

import { Order } from "@models/Order"
import { Product2 } from "@models/Product2"

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"
import { useLocalStorage } from "src/providers/useLocalStorage"

export const useCarts = (AFFILIATE_ID: number,clientId: number, myToken: string) => {
    const [cart, setCarts] = useState<Order[]>([])
 

    const getCarts = useCallback( async (AFFILIATE_ID: number,clientId: number, myToken : string ) => {
 
        const {status, data}  = await TodoService.getMyCart(AFFILIATE_ID,clientId,myToken);
      
 
     
       setCarts(data)
        
    }, [])

 



    return{
        cart,
        getCarts
    }
}