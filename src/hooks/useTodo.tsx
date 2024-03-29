
import { Categorie } from "@models/Categorie"


import { useCallback, useState } from "react"
import { TodoService } from "src/pages/api/TodoServices"

export const useTodo = (AFFILIATE_ID: number, MASTER_ID: number) => {
    const [tasks, setTasks] = useState<Categorie[]>([])



    const getAll = useCallback(async (AFFILIATE_ID: number, MASTER_ID: number) => {
        const { status, data } = await TodoService.getAll(AFFILIATE_ID, MASTER_ID);
        console.log("categorias", { status, data })
        localStorage.setItem("ALL_CATEGORIES", JSON.stringify(data))
        setTasks(data)

    }, [])




    return {
        tasks,
        getAll
    }
}