import WishlistIconV2 from "@assets/icons/WishlistIconV2";
import PlusRoundedIcon from "@assets/icons/PlusRounded";
import ModalCloseIcon from "@assets/icons/MobileModalCloseButton";

import ModalStyle from "@styles/components/modals/Modal.module.css";
import styles from "@styles/components/modals/ModalListas.module.css";
import { LISTA_COMPRA, Product2 } from "@models/Product2";
import { useContext, useEffect, useState } from "react";
import { Api } from "@components/providers";
import InputText from "@components/Inputs/InputText";
import Button from "@components/Buttons/Button";
import styles4 from "@styles/components/minha-conta/Lista.module.css";
import LoadingSpinner from "@components/Spinner";
import { ajustStrigfy } from "@models/masks";
import { AppContext } from "src/pages/_app";


interface ModalListasProps {
  modalActive?: Boolean;
  onCloseClick: any;
}

export default function ModalListas(props: ModalListasProps) {
  const [listas, setListas] = useState<LISTA_COMPRA[]>([])
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


  async function createList(name: string) {
    setIsLoading(true)
    if (name != "") {
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

      //console.log('crud pay', {
      //   lista_affiliate_id: affID,
      //   lista_client_id: clientId,
      //   lista_name: name,
      //   lista_conteudo: '[]'
      // }, { headers: { "x-access-token": token } })

      Api.post('insertListaCompras', {
        lista_affiliate_id: affID,
        lista_client_id: clientId,
        lista_name: name,
        lista_conteudo: '[]'
      }, { headers: { "x-access-token": token } }).then(response => {
        //console.log(response)
        getLists()
        setNewList(false)
      }).catch(error => {
        location.replace('../minha-conta')
        //console.log(error)
      })
    } else {
      //console.log("lista vazia", thisList)
    }

  }

  async function updateList(lista: LISTA_COMPRA) {

    setIsLoading(true)
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
        setProdutoLista(null)
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
    //console.log('alteradas', listas)
  }

  useEffect(() => {
    getLists()
  }, [])
  useEffect(() => {
    //console.log('mudou listas', listas)
  }, [listas])

  const [thisList, setThisList] = useState<string>("")
  const myNewList = async (e: any) => {
    //console.log(e)
    await setThisList(e)
    //console.log('listaEditada', thisList)
    e = ""
  }

  function getTotalItens(texto: string) {

    texto = texto.replace(/\n\r/g, '')
    try {
      if (texto && texto != 'undefined') {
        return JSON.parse(ajustStrigfy(texto)).length
      } else {
        return 0
      }
    } catch (err) {
      //console.log("erro no tezto", texto)
      //console.log('cai foi aqui', err)
      return 0
    }

  }


  async function addProductsInList(lista: string) {
    //console.log('tentando listas ', lista, produtoLista)
    try {

      if (produtoLista) {
        if (listas?.length > 0) {
          //console.log("cjhguei aqui", listas)
          for (const k in listas) {
            let { lista_name, lista_conteudo } = listas[k]
            if (lista_name === lista) {
              let products = JSON.parse(ajustStrigfy(lista_conteudo))
              let exists = products.find((prd: { product_code: number; quantidade: number }) => prd.product_code === produtoLista.product_code)
              let total = exists ? exists.quantidade + 1 : 1
              products.push(
                {
                  product_code: produtoLista.product_code,
                  quantidade: total
                }
              )
              //console.log(products)
              lista_conteudo = ajustStrigfy(JSON.stringify(products))
              listas[k].lista_conteudo = lista_conteudo
              updateList(listas[k])
            }
          }
        }

      }




    } catch (erro) {
      //console.log(erro)
    }


  }





  return (
    <div
      className={` ${styles.modalListas} ${props.modalActive ? styles.modalActive : ""
        }`}
    >
      <div className={styles.modalTitle}>
        <i className="hide-mobile">
          <WishlistIconV2 />
        </i>
        <i onClick={() => setShowLists(false)} className={`d-lg-none ${styles.modalMobileTitleIcon}`}>
          <ModalCloseIcon />
        </i>
        Listas
      </div>

      <div className={styles.content}>
        <div
          className="row"
          style={{ display: 'inline-flex' }}
        >
          <div
            //style={{ width: '400px' }} 
            className={`${styles.buttonLista} ${styles.buttonCreateLista}`}>
            {
              listas?.length === 0 && !newList ?
                <div className={`${styles.modalDica} col`}>
                  Crie sua primeira lista e facilite compras recorrentes
                </div>
                :

                <div className="oculta"></div>
            }


            {
              newList ?
                <>
                  <InputText label={"Escolha um nome para sua lista"}
                    focar={false}
                    onBlur={myNewList}
                    className={"w-100"}

                  />
                </>

                :
                <>
                  <i className={styles.icon}>
                    <PlusRoundedIcon />
                  </i>
                  <span onClick={() => setNewList(true)} className={styles.buttonListaTitle}>Criar nova lista</span>
                </>
            }




          </div>

          {
            newList ?
              <Button
                style={{ maxWidth: '400px', minWidth: '300px', margin: '30px' }}
                onClick={() => createList(thisList)} className={`${styles4.buttonAddListToCart} col`}>
                {isLoading ? <LoadingSpinner /> : <div className="oculta"></div>}
                Criar lista</Button>
              :

              <div className="oculta"></div>
          }
        </div>



        <div className={`${styles.separator} d-lg-none`}></div>

        <h3 className={`${styles.titleSelectList} d-lg-none`}>Selecione uma lista</h3>

        <div className={styles.lista}>

          {
            showAll ?
              <>
                {
                  listas?.map(lista => (
                    <div onClick={() => addProductsInList(lista.lista_name)} key={lista.id} className={`${styles.buttonLista} ${styles.active}`}>
                      <i className={styles.icon}>
                        <WishlistIconV2 />
                      </i>
                      <span className={styles.buttonListaTitle}>
                        {lista.lista_name} <span className={styles.counter}>{getTotalItens(lista.lista_conteudo)}</span>
                      </span>
                    </div>

                  ))
                }


                <button onClick={() => location.replace('../minha-conta?filter=TabMinhasListas')} className={styles.btnAddAnotherList}>
                  Edite suas listas
                </button>
              </>

              :
              <>
                {

                  listas?.slice(0, 5).map(lista => (
                    <div onClick={() => addProductsInList(lista.lista_name)} key={lista.id} className={`${styles.buttonLista} ${styles.active}`}>
                      <i className={styles.icon}>
                        <WishlistIconV2 />
                      </i>
                      <span className={styles.buttonListaTitle}>
                        {lista.lista_name} <span className={styles.counter}>{getTotalItens(lista.lista_conteudo)}</span>
                      </span>
                    </div>

                  ))
                }

                <button onClick={() => setShowAll(true)} className={styles.btnAddAnotherList}>
                  Adicionar em outra lista
                </button>
              </>

          }



        </div>


      </div>

      <button style={{ maxHeight: '30px' }} className={`${ModalStyle.btnClose} hide-mobile`} onClick={props.onCloseClick}>
        <span className={ModalStyle.btnCloseLine}></span>
        <span className={ModalStyle.btnCloseLine}></span>
      </button>
    </div>
  );
}
