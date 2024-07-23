import PropTypes from "prop-types";

import Button from "@components/Buttons/Button";
import ProductListInLista from "@components/MinhaConta/ProductListInLista";

import { Product } from "@models/Product";

import styles from "@styles/components/minha-conta/Lista.module.css";
import { LISTA_COMPRA, Product2 } from "@models/Product2";
import { useContext, useEffect, useState } from "react";
import { ajustStrigfy, FULL_PRICES } from "@models/masks";
import { Api } from "src/providers";
import { ProductOrder } from "@models/ProductOrder";
import { AppContext } from "src/pages/_app";

interface ListaProps {
  active: boolean;
  lista: LISTA_COMPRA
  clica: any
  setLista: any
  increase: any
  decrease: any
  remove: any
  updateList: any
}

function Lista(props: ListaProps) {
  const [productList, setProductList] = useState<Product2[]>([])
  const [filter, setFilter] = useState<Product2[]>([])
  const [valorTotal, setValorTotal] = useState<number>(0)
  const [valorTags, setValorTags] = useState<string[]>([])
  const [valorBusca, setValorBusca] = useState<string>("Todos")

  function mudaActive() {
    props.clica(props.lista)
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
      //console.log('cai foi aqui',err)
      return 0
    }

  }

  function getTotalItensQtd(code: number) {

    try {
      type item = {
        product_code: number,
        quantidade: number
      }

      let items: item[] = JSON.parse(ajustStrigfy(props.lista.lista_conteudo))
      let total = 0
      //console.log('items', items)
      for (const a in items) {
        if (items[a].product_code === code) {
          total = items[a].quantidade
        }
      }

      return total

    } catch (err) {
      //console.log('cai foi aqui',err)
      return 0
    }

  }

  async function start() {
    try {
      type item = {
        product_code: number,
        quantidade: number
      }
      let itens: item[] = JSON.parse(ajustStrigfy(props.lista.lista_conteudo))
      let lista: number[] = []
      for (const k in itens) {
        lista.push(itens[k].product_code)
      }

      Api.post('/listaIds', { product_list_ids: lista, affiliate_id: process.env.AFFILIATE_ID }).then(response => {

        //console.log('response prd', response)
        let listaProdutos = response.data

        setProductList(listaProdutos)
        let list: string[] = []
        for (const k in listaProdutos) {
          list.push(
            listaProdutos[k]?.product_categoria
          )
        }
        if (list.length > 0) {
          const result: string[] = Array.from(list.reduce((m, t) => m.set(t, t), new Map()).values());
          //console.log('lista',result)
          setValorTags(result)
        }



        setFilter(listaProdutos)
      }).catch(err => {
        //console.log('errr',err)
      })






    } catch (err) {
      //console.log('erros ',err)
    }
  }

  useEffect(() => {
    start()
  }, [])





  useEffect(() => {
    //console.log('productList tal',productList)

    let total = 0

    for (const k in productList) {
      let thisPrd = FULL_PRICES(productList[k])
      total += (thisPrd.venda.preco_venda * getTotalItensQtd(productList[k].product_code))
    }
    //console.log('valor Total', valorTotal)
    setValorTotal(total)
  }, [productList])




  useEffect(() => {


    let total = 0

    for (const k in productList) {
      let thisPrd = FULL_PRICES(productList[k])
      total += (thisPrd.venda.preco_venda * getTotalItensQtd(productList[k].product_code))
    }
    //console.log('valor Total', valorTotal)
    setValorTotal(total)
  }, [props.lista])


  function setFilterValue(value: string) {
    setValorBusca(value)
    if (value === "Todos") {
      setFilter(productList)
    } else {
      let list: Product2[] = []
      for (const k in productList) {
        if (value === productList[k].product_categoria) {
          list.push(productList[k])
        }
      }
      //console.log(list)
      if (list) {
        setFilter(list)
      }
    }


  }

  const {
    carts,
    decrease,
    increase,
    remove,

    update,
    updateDetail,
    noCarrinho,
    consolida
  } = useContext(AppContext);


  function consolidaTodos(produtos: Product2[]) {
    try {
      const products: any[] = [];
      for (const k in produtos) {
        if (incrementaUm(produtos[k])) {
          products.push(incrementaUm(produtos[k]))
        }

      }
      // //console.log("produtos",products)
      if (consolida) {
        consolida(products)
      }
      location.replace('../checkout')
    } catch (e) {
      // //console.log("erro",e)
    }



  }

  function incrementaUm(sourceProduct: Product2) {
    let product: ProductOrder;
    product = {
      ...sourceProduct,
      valor: sourceProduct.product_valor,
      comentario: "",
      caracteristica: "",
      quantidade: getTotalItensQtd(sourceProduct.product_code),
      desconto: 0,
    }
    return product

  }

  const onChangeName = (e: any) => {
    //console.log(e.target.value)
    props.updateList(
      {
        ...props.lista,
        lista_name: e.target.value
      }
    )
  }

  return (
    <div onClick={mudaActive} className={`${styles.lista} ${props.active ? styles.active : ''} `}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>
          <div className={styles.boxIcon}></div>

          <span className={styles.text}>{props.lista.lista_name} <span className={styles.value}>{getTotalItens(props.lista.lista_conteudo)}</span> </span>
        </h3>

        <Button onClick={() => consolidaTodos(productList)} className={styles.buttonAddListToCart}>Adicionar lista ao carrinho</Button>

        <input onBlur={onChangeName} className={styles.inputText} type="text" placeholder="Editar nome da lista" />
      </div>

      <div className={styles.body}>
        <nav className={styles.menu}>
          <button onClick={() => setFilterValue('Todos')} className={`${valorBusca === 'Todos' ? styles.active : ''} `}>Todos</button>
          {
            valorTags?.map(vl => (
              <button key={Math.random()} className={`${valorBusca === vl ? styles.active : ''} `} onClick={() => setFilterValue(vl)}>{vl}</button>
            ))
          }


        </nav>

        <ProductListInLista increase={props.increase} decrease={props.decrease} remove={props.remove} setLista={props.setLista} lista={props.lista} products={filter} />
      </div>

      <div style={{ display: 'inlineFlex', gap: '50px', width: '100%', paddingBottom: '100px' }} className={styles.footer}>
        <div className={styles.subtotal}>
          SubTotal: <span className={styles.value}>R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
        </div>
        {
          props.active ?
            <Button style={{ float: 'right', marginTop: '20px', display: 'inline-fex !important' }} onClick={() => consolidaTodos(productList)} className={styles.buttonAddListToCart}>Adicionar lista ao carrinho</Button>
            :
            <div className="oculta"></div>
        }

      </div>
    </div>
  );
}

Lista.propTypes = {
  active: PropTypes.bool,
};

Lista.defaultProps = {
  active: false,
};

export default Lista;