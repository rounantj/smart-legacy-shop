
import { Categorie } from "@models/Categorie"
import { Product2 } from "@models/Product2"
 

import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useSearchCat = (AFFILIATE_ID: number,lastID: number, limit: number, text : string) => {
    const [buscaCat, setBusca] = useState<Product2[]>([])

   

    const getSearchCat = useCallback( async (AFFILIATE_ID: number,lastID: number, limit: number, text : string) => {
        if(text === ''){text = ' '}
        const {status, data}  = await TodoService.getProductsSearchCat(AFFILIATE_ID,lastID,limit,text);
 
        setBusca(data)
  
        
    }, [])

 


    return{
        buscaCat,
        getSearchCat
    }
}