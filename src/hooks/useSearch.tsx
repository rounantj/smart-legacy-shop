
import { Categorie } from "@models/Categorie"
import { Product2 } from "@models/Product2"


import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useSearch = (AFFILIATE_ID: number, lastID: number, limit: number, text: string, config?: any) => {
  const [busca, setBusca] = useState<Product2[]>([]);

  const getSearch = useCallback(async (AFFILIATE_ID: number, lastID: number, limit: number, text: string) => {
    if(text === ''){text = ' '}
    const { status, data } = await TodoService.getProductsSearch(AFFILIATE_ID, lastID, limit, text);

    setBusca(old => config && config.preserveData ? [...old, ...data] : data)

  }, [busca])

  return {
    busca,
    getSearch
  }
}