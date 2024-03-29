
import { Categorie } from "@models/Categorie"
import { Product2 } from "@models/Product2"
 

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useProducts = (AFFILIATE_ID: number,lastID: number) => {
    const [products, setTasks] = useState<Product2[]>([])
   

    const getAllProducts = useCallback( async (AFFILIATE_ID: number,lastID: number) => {
        const {status, data}  = await TodoService.getAllProducts(AFFILIATE_ID,lastID);
 
        setTasks(data)
        
    }, [])

 


    return{
        products,
        getAllProducts
    }
}