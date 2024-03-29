import styles from "@styles/components/minha-conta/Tabs.module.css";
import Lista from "@components/MinhaConta/Lista";
import { LISTA_COMPRA } from "@models/Product2";
import { useContext, useEffect, useState } from "react";
import { Api } from "src/providers";
import { AppContext } from "src/pages/_app";
import { ajustStrigfy } from "@models/masks";

interface TabProps {
  active?: boolean;
  handleAdd: any
}

export default function TabMinhasListas(props: TabProps) {

  const [listas, setListas] = useState<LISTA_COMPRA[]>([])
  const [essaLista, setEssaLista] = useState<LISTA_COMPRA>()
  const [newList, setNewList] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [clear, setClear] = useState(false);

  const {
    produtoLista,
    setProdutoLista,
    showLists,
    setShowLists
  } = useContext(AppContext);

  function increase(product_code: number, lista: string) {
    let total = 0
    type item = {
      product_code: number,
      quantidade: number
    }
    let itens: item[] = []

    try {
      for (const a in listas) {
        if (listas[a].lista_name === lista) {
          itens = JSON.parse(ajustStrigfy(listas[a].lista_conteudo))
          for (const k in itens) {
            if (product_code === itens[k].product_code) {
              itens[k].quantidade += 1
            }
          }
          let thisList: LISTA_COMPRA = listas[a]
          thisList.lista_conteudo = JSON.stringify(itens)
          updateList(thisList)
        }
      }


    } catch (ee) {
      //console.log('erro em get', ee)
    }


  }

  function decrease(product_code: number, lista: string) {
    let total = 0
    type item = {
      product_code: number,
      quantidade: number
    }
    let itens: item[] = []

    try {
      for (const a in listas) {
        if (listas[a].lista_name === lista) {
          itens = JSON.parse(ajustStrigfy(listas[a].lista_conteudo))
          for (const k in itens) {
            if (product_code === itens[k].product_code) {
              itens[k].quantidade = (itens[k].quantidade - 1) < 0 ? 0 : (itens[k].quantidade - 1)
            }
          }
          let thisList: LISTA_COMPRA = listas[a]
          thisList.lista_conteudo = JSON.stringify(itens)
          updateList(thisList)
        }
      }


    } catch (ee) {
      //console.log('erro em get', ee)
    }
  }


  function remove(product_code: number, lista: string) {
    let total = 0
    type item = {
      product_code: number,
      quantidade: number
    }
    let itens: item[] = []

    try {
      for (const a in listas) {
        if (listas[a].lista_name === lista) {
          itens = JSON.parse(ajustStrigfy(listas[a].lista_conteudo))
          let newItens: item[] = []
          for (const k in itens) {
            if (product_code !== itens[k].product_code) {
              newItens.push(itens[k])
            }
          }
          let thisList: LISTA_COMPRA = listas[a]
          thisList.lista_conteudo = JSON.stringify(newItens)
          updateList(thisList)
        }
      }


    } catch (ee) {
      //console.log('erro em get', ee)
    }
  }

  async function updateList(lista: LISTA_COMPRA) {
    //   setIsLoading(true)
    let affID = process.env.AFFILIATE_ID, msId = process.env.MASTER_ID
    let user = localStorage.getItem("USER")

    if (!user || user === null) {
      user = '[]'
    }
    let USER: any = JSON.parse(ajustStrigfy(user))
    let clientId = 0
    if (USER) {
      clientId = USER.id
    }

    let token = localStorage.getItem("token")
    if (token == null) { token = "" }

    //console.log("payload", {
    //   lista_affiliate_id: affID,
    //   lista_client_id: clientId,
    //   id: lista.id,
    //   lista_name: lista.lista_name,
    //   lista_conteudo: lista.lista_conteudo
    // },
    //   { headers: { "x-access-token": token } }
    // )
    Api.post('/updateListaCompras', {
      lista_affiliate_id: affID,
      lista_client_id: clientId,
      id: lista.id,
      lista_name: lista.lista_name,
      lista_conteudo: lista.lista_conteudo
    },
      { headers: { "x-access-token": token } }).then(response => {
        //console.log('response lista', response)
        getLists()

      }).catch(error => {
        //console.log('deu errooooooo', error)
      })

  }

  async function getLists() {
    let affID = process.env.AFFILIATE_ID, msId = process.env.MASTER_ID
    let user = localStorage.getItem("USER")

    if (!user || user === null) {
      user = '[]'
    }
    let USER: any = JSON.parse(ajustStrigfy(user))
    let clientId = 0
    if (USER) {
      clientId = USER.id
    }

    //console.log('USER', USER)

    let token = localStorage.getItem("token")
    if (token == null) { token = "" }

    // //console.log("payload", {
    //   lista_affiliate_id: affID,
    //   lista_client_id: clientId
    // },
    //   { headers: { "x-access-token": token } }
    // )
    Api.post('/getListaCompras', { lista_affiliate_id: affID, lista_client_id: clientId }, { headers: { "x-access-token": token } })
      .then(response => {
        //console.log('response lista', response)
        let LISTA: LISTA_COMPRA[] = []
        const lista = response.data
        for (const k in lista) {
          //console.log(lista[k])
          LISTA.push({
            lista_affiliate_id: lista[k].lista_affiliate_id,
            lista_client_id: clientId,
            lista_name: lista[k].lista_name,
            lista_conteudo: lista[k].lista_conteudo,
            id: lista[k].id,

            createdAt: lista[k].createdAt,
            updatedAt: lista[k].updatedAt
          })
        }
        //console.log("LISTAS", LISTA)
        setListasMain(LISTA)
        setIsLoading(false)
        //console.log("aqui sem erros...")
      }).catch(error => {
        //console.log(error)
      })

  }
  async function setListasMain(listas3: LISTA_COMPRA[]) {
    await setListas(listas3)
    //console.log('alteradas',listas)
  }

  useEffect(() => {
    getLists()
  }, [])

  useEffect(() => {
    //console.log("alterada as listas",listas)
  }, [listas])
  return (
    <div
      className={` ${styles.tab} ${props.active == true ? styles.active : ""} `}
    >
      {
        listas?.map(lista => (
          essaLista?.id === lista.id ?
            <Lista key={Math.random()} updateList={updateList} increase={increase} decrease={decrease} remove={remove} setLista={setListas} clica={setEssaLista} lista={lista} active />
            :
            <Lista key={Math.random()} updateList={updateList} increase={increase} decrease={decrease} remove={remove} setLista={setListas} clica={setEssaLista} lista={lista} />
        ))
      }

    </div>
  );
}


