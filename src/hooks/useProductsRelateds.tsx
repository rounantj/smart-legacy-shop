import { Product2 } from "@models/Product2"
import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useProductsRelateds = (AFFILIATE_ID: number = 0, number: number[] = []) => {
    const [tasks3, setTasks] = useState<Product2[]>([]);
    const [lastCallTimestamp, setLastCallTimestamp] = useState<number>(0);
    const [cache, setCache] = useState<Product2[] | null>(null);

    const getAllRelacteds = useCallback(async (AFFILIATE_ID: number, number: number[]) => {
        const currentTimestamp = Date.now();

        // Verificar o cache e o intervalo de tempo
        if (cache && currentTimestamp - lastCallTimestamp < 20000) {
            setTasks(cache);
            return;
        }

        console.log({ AFFILIATE_ID, number })
        const { status, data, config } = await TodoService.getAllRelatedProducts(AFFILIATE_ID, number);
        console.log("API RETURN", { data, config, status })

        // Atualizar o cache e o timestamp
        setCache(data);
        setLastCallTimestamp(currentTimestamp);
        setTasks(data);
    }, [cache, lastCallTimestamp]);

    return {
        tasks3,
        getAllRelacteds
    }
}
