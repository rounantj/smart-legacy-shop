 
import { Product2 } from "@models/Product2"

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useProductInformation = (AFFILIATE_ID: number,number: number) => {
    const [tasks2, setTasks] = useState<Product2[]>([])


    const getAllInformation = useCallback( async (AFFILIATE_ID: number,number: number) => {
        const {status, data}  = await TodoService.getProductformation(AFFILIATE_ID,number);
  
        setTasks(data)
        
    }, [])

 



    return{
        tasks2,
        getAllInformation
    }
}
 