import CheckRoundedIcon from "@assets/icons/CheckRounded";
import FaceSmileRoundedIcon from "@assets/icons/FaceSmileRounded";
import TruckIcon from "@assets/icons/Truck";
import PagueEntregaIcon from "@assets/icons/PagueEntregaIcon";
import DolarIcon from "@assets/icons/Dolar";
import SmileFaceIcon from "@assets/icons/SmileFace";
import MailIcon from "@assets/icons/Mail";
import IphoneIcon from "@assets/icons/Iphone";
import styles5 from "@styles/components/minha-conta/EditarDados.module.css";
import HeaderCheckout from "@components/Header/HeaderCheckout";
import Button from "@components/Buttons/Button";
import TabPedidos from "@components/MinhaConta/TabPedidos";
import FooterCheckout from "@components/Footer/FooterCheckout";

import styles from "@styles/pages/PedidoFinalizado.module.css";
import { Cart } from "@models/Cart";
import Header from "@components/Header/Header";
import { ProductOrder } from "@models/ProductOrder";
import { useEffect, useState, useContext, useMemo } from "react";
import { Product2 } from "@models/Product2";
import React from "react";
import { useProductInformation } from "src/hooks/useProductInformation";
import { useProducts } from "src/hooks/useProducts";
import { useProducts1 } from "src/hooks/useProducts1";
import { useProducts2 } from "src/hooks/useProducts2";
import { useProducts3 } from "src/hooks/useProducts3";
import { useProductsRelateds } from "src/hooks/useProductsRelateds";
import { Api } from "@components/providers";
import { useLocalStorage } from "@components/providers/useLocalStorage";
import UsersIcon from "@assets/icons/Users";
import PedidosIcon from "@assets/icons/Pedidos";
import { Order } from "@models/Order";
import moment from "moment";

import { EU } from "@models/EU";
import InputText from "@components/Inputs/InputText";
import axios from "axios";
import { Cliente } from "@models/Cliente";
import { AppContext } from "./_app";

export default function PedidoFinalizado() {
  const {
    carts: cart,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);


  const produtos = useMemo(() => cart && cart.cart_conteudo ? JSON.parse(cart.cart_conteudo) : [], [cart]);
  const valorTotal = useMemo(() => produtos.reduce((acc = 0, product: any = {}) => acc + (product.valor && product.quantidade >= product.minimo_para_desconto ? product.valor * product.quantidade : product.product_valor * product.quantidade), 0), [produtos]);

  const [productCode, setProductCode] = useState(11);
  const [firstId, setFirstId] = useState(0);
  const [firstId1, setFirstId1] = useState(10);
  const [firstId2, setFirstId2] = useState(20);
  const [firstId3, setFirstId3] = useState(30);
  const [affiliateID, setAffiliateID] = useState<number>(0);

  const [productsRelateds, setProductsRelateds] = useState([
    8,
    10,
    38,
    45,
    141, // default relateds
  ]);

  const { tasks3, getAllRelacteds } = useProductsRelateds(
    affiliateID,
    productsRelateds
  );
  const { tasks2, getAllInformation } = useProductInformation(
    affiliateID,
    productCode
  );
  const { products, getAllProducts } = useProducts(affiliateID, 0);
  const { products1, getAllProducts1 } = useProducts1(affiliateID, firstId);
  const { products2, getAllProducts2 } = useProducts2(affiliateID, firstId);
  const { products3, getAllProducts3 } = useProducts3(affiliateID, firstId);

  const [email_cliente_sem_senha, setEmailSemSenha] = useState<string>("")
  const [id_cliente_sem_senha, setIdSemSenha] = useState<string>("")

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);

    const fetch = async () => {
      await getAllInformation(AFFILIATE_ID, productCode);
      localStorage.setItem("MY_CART", "[]")
      await getAllRelacteds(AFFILIATE_ID, productsRelateds);

      if (id_cliente_sem_senha != "") {
        let token = localStorage.getItem("token")
        if (token == null) { token = "" }
        Api.post(
          "/updateCart",
          {
            affiliate_id: AFFILIATE_ID,
            cart_conteudo: "[]",
            client_id: id_cliente_sem_senha,
          },
          { headers: { "x-access-token": token } }
        );
      }
    }
    fetch().then(result => {

    }).catch(err => {
      //console.log(err)
    })










  }, [getAllInformation, getAllRelacteds, productCode, productsRelateds]);

  function alteraSenhaNovoUser(myId: number, newPassword: string) {
    Api.post(
      "/alteraSenhaUsuarioNovo",
      { user_id: myId, new_password: newPassword }
    )
      .then((response) => {



        axios
          .post(process.env.SMART_API + "/clientAuth", {
            mail: email_cliente_sem_senha,
            password: newPassword

          })
          .then((response2) => {



            var USER: Cliente = response2.data

            localStorage.setItem("USER", JSON.stringify(response2.data));
            localStorage.setItem("token_me", response2.data.token_me)
            location.replace("/minha-conta")


          })
          .catch((error2) => {

          });

      })
      .catch((error) => {

      });

  }

  function OrdenaJson(lista: any, chave: string, ordem: string) {
    return lista.sort(function (a: any, b: any) {
      var x = a[chave];
      var y = b[chave];
      if (ordem === 'ASC') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      if (ordem === 'DESC') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts(AFFILIATE_ID, 0);
    products.map((prd) => {
      setFirstId(prd.id);
    });
    localStorage.setItem("MY_CART", "[]")
  }, [getAllProducts]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts1(AFFILIATE_ID, firstId1);
    products1.map((prd) => {
      setFirstId1(prd.id);
    });
    localStorage.setItem("MY_CART", "[]")
  }, [getAllProducts1]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts2(AFFILIATE_ID, firstId2);
    products2?.map((prd) => {
      setFirstId2(prd.id);
    });
    localStorage.setItem("MY_CART", "[]")
  }, [getAllProducts2]);

  React.useEffect(() => {
    var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
    getAllProducts3(AFFILIATE_ID, firstId3);
    products3.map((prd) => {
      setFirstId3(prd.id);
    });
    localStorage.setItem("MY_CART", "[]")
  }, [getAllProducts3]);

  React.useEffect(() => {
    var tk = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (tk == null) {
      tk = "";
    }
    var MY_ID = 0
    let tst = localStorage.getItem("MY_ID"), emailSS;
    if (tst == null) {
      tst = localStorage.getItem("ID_CLIENT_SEM_SENHA")
      emailSS = localStorage.getItem("EMAIL_CLIENT_SEM_SENHA") != null ? localStorage.getItem("EMAIL_CLIENT_SEM_SENHA") : ""
      MY_ID = Number(tst);
      let vai: string = tst != null ? tst : ""
      setIdSemSenha(vai)
      if (emailSS == null) { emailSS = "" }
      setEmailSemSenha(emailSS)

    }
    MY_ID = Number(tst);


    localStorage.setItem("MY_CART", "[]")

    var MY_AFFILIATE_ID = Number(process.env.AFFILIATE_ID);

    Api.post<Order[]>(
      "/getMyOrders",
      { affiliate_id: MY_AFFILIATE_ID, client_id: MY_ID },
      { headers: { "x-access-token": tk } }
    )
      .then((response) => {

        setOrders(response.data)
      })
      .catch((error) => {

      });

    localStorage.setItem("listShow", "0")
  }, [])
  const [orders, setOrders] = useState<Order[]>([])
  const [entrega, setEntrega] = useState<string>()
  const [pagamento, setPagamento] = useState<string>()
  const [valorPedido, setValorPedido] = useState<number>()
  const [dataEntrega, setDataEntrega] = useState<string>()
  const [numeroPedido, setNumeroPedido] = useState<string>()
  const [eu, setEu] = useState<EU>()

  React.useEffect(() => {

    if (orders.length > 0) {
      let Order: Order = OrdenaJson(orders, "updatedAt", "DESC")[0]
      console.log("A ORDEM", Order)
      let valorEntrega = Order?.order_valor_entrega ? Number(Order?.order_valor_entrega) : 0
      setEntrega(Order.order_metodo_entrega)
      setDataEntrega(moment(Order.order_data_entrega).format("DD/MM") + " das 08h às 17h  \n\n R$ " + valorEntrega.toFixed(2).replace(".", ","))
      setPagamento(Order.order_metodo_pagamento)
      setValorPedido(Order.order_valor_total)
      setNumeroPedido(Order.id.toString())
      localStorage.setItem("MY_CART", "[]")
    }



    // for (const k in orders) {
    //   setEntrega(orders[k].order_metodo_entrega)
    //   setDataEntrega(moment(orders[k].order_data_entrega).format("DD/MM") + " das 08h às 17h  \n\n R$ " + orders[k].order_valor_entrega.toFixed(2).replace(".", ","))
    //   setPagamento(orders[k].order_metodo_pagamento)
    //   setValorPedido(orders[k].order_valor_total)
    //   setNumeroPedido(orders[k].id.toString())
    // }
    var eu2 = localStorage.getItem("USER")
    if (eu2 == null) { eu2 = '[]' }

    var meusDados = JSON.parse(eu2)
    var USER: EU = {
      auth: true,
      id: meusDados.id,
      users_client_affiliate_id: meusDados.users_client_affiliate_id,
      users_client_name: meusDados.users_client_name,
      token: meusDados.token,
      token_me: meusDados.token_me,
      users_client_mail: meusDados.users_client_mail,
      users_client_telefone: meusDados.users_client_telefone,
      users_client_cpf: meusDados.users_client_cpf,
      users_client_endereco: meusDados.users_client_endereco,
      users_client_cep: meusDados.users_client_cep,
      users_client_bairro: meusDados.users_client_bairro,
      users_client_cidade: meusDados.users_client_cidade,
      users_client_listas_compras: meusDados.users_client_listas_compras,
      users_client_numero: meusDados.users_client_numero,
      users_client_complemento: meusDados.users_client_complemento,
    }
    setEu(USER)

  }, [orders])



  const [senha3, setSenha3] = useState<string>("")
  const [repeteSenha, setRepeteSenha] = useState<string>("")

  const onUpdateSenha = (valor: string) => {
    setSenha3(valor);
  };

  const onUpdateRepeteSenha = (valor: string) => {
    setRepeteSenha(valor);
  };

  // React.useEffect(() => {
  //   //('pagamento',pagamento)
  // }, [pagamento])
  // React.useEffect(() => {
  //   //('eu',eu)
  // }, [eu])

  return (
    <div>
      <Header
        noCarrinho={noCarrinho}
        produtos={produtos}
        detail={updateDetail}
        update={update}
        total={valorTotal}
        valorTotal={valorTotal}
        increase={increase}
        decrease={decrease}
        remove={remove}
        cart={cart}
      />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.pageHeader}>
            <div className={styles.checkIconRounded}>
              <CheckRoundedIcon />
            </div>
            <h1 className={styles.pageTitle}>Pedido Realizado com Sucesso,<br />Obrigado por sua compra</h1>
            <h2 className={styles.subTituloPedido}>O número do seu pedido é: <span className={styles.spanSubTitulo}>{numeroPedido}</span></h2>


          </div>

          <div className="model-page-interna">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className={styles.userInfos}>
                  <div className={styles.userInfosHeader}>
                    <div className={styles.userInfoBox}>
                      <i className={styles.iconSmart}>
                        <PedidosIcon fill={''} />
                      </i>
                      <h3 className={styles.tituloSmart}>Dados do pedido</h3>
                    </div>
                  </div>
                  <div className={styles.contentBox}>
                    <div className={` ${styles.icon} ${styles.iconFlip} `}>
                      <TruckIcon />
                    </div>

                    <div className={styles.contentBoxBody}>
                      <p className={styles.contentBoxTitle}>Entrega</p>

                      <p className={styles.contentBoxValue}>
                        {entrega}
                        <br></br>
                        <span className={styles.entregaInfos}>
                          {dataEntrega}
                        </span>

                      </p>

                      <p className={styles.contentBoxInfo}>
                        {eu?.users_client_complemento} - {eu?.users_client_numero}  - {eu?.users_client_bairro} - {eu?.users_client_cidade}, {eu?.users_client_cep}
                      </p>
                    </div>
                  </div>

                  <div className={styles.contentBox}>
                    <div className={` ${styles.icon} ${styles.iconDolar} `}>
                      <DolarIcon />
                    </div>

                    <div className={styles.contentBoxBody}>
                      <p className={styles.contentBoxTitle}>Valor Total</p>

                      <p className={styles.contentBoxValue}>R$ {valorPedido?.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>

                  <div className={styles.contentBox}>
                    <div className={styles.icon}>
                      <PagueEntregaIcon />
                    </div>

                    <div className={styles.contentBoxBody}>
                      <p className={styles.contentBoxTitle}>Pgto. na entrega</p>

                      <p className={styles.contentBoxValue}>{pagamento}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className={styles.userInfos}>
                  <div className={styles.userInfosHeader}>
                    <div className={styles.userInfoBox}>
                      <i className={styles.iconSmart}>
                        <UsersIcon fill="var(--primary)" />
                      </i>
                      <h3 className={styles.tituloSmart}>Dados pessoais</h3>
                    </div>
                  </div>

                  <div className={styles.userInfoBody}>
                    <div className={styles.userInfoBox}>
                      <i className={styles.userInfoIcon}>
                        <MailIcon />
                      </i>
                      {eu?.users_client_mail}
                    </div>

                    <div className={styles.userInfoBox}>
                      <i className={styles.userInfoIcon}>
                        <IphoneIcon />
                      </i>
                      {eu?.users_client_telefone}
                    </div>
                    <br />

                    <br />

                    {id_cliente_sem_senha != "" ?

                      <div className="container">
                        <h3 className={styles.tituloSmart}>Crie uma senha para a próxima vez!</h3>
                        <br />
                        <InputText
                          label="Senha"
                          onchange={onUpdateSenha}
                          focar={false}
                          id="senha2"
                          defaultValue={senha3}
                          type="password"
                          onBlur={onUpdateSenha}
                          value={senha3}


                        />
                        <br />
                        <br />
                        <InputText
                          label="Repetir senha"
                          onchange={onUpdateRepeteSenha}
                          id="repeteSenha2"
                          type="password"
                          focar={false}
                          onBlur={onUpdateRepeteSenha}
                          value={repeteSenha}
                          defaultValue={repeteSenha}


                        />
                        <br />
                        <br />
                        {senha3 === "" || repeteSenha != senha3 ?
                          <p className="colorRed">As senhas não conferem!</p>
                          :

                          <Button onClick={() => alteraSenhaNovoUser(Number(id_cliente_sem_senha), senha3)} className={styles.userInfoButton}>
                            Salvar senha
                          </Button>

                        }

                      </div>

                      :

                      <Button onClick={() => location.replace('../minha-conta')} className={styles.userInfoButton}>
                        Ver mais Informações
                      </Button>
                    }









                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className={styles.sectionPedidoInfoContainer}>
                  <div className={styles.headerInner}>
                    <div className={styles.containerInner}>
                      <h3 className={styles.tituloInfo}>
                        Dados importantes
                      </h3>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.checklistBox}>
                      {/*<h3 className={styles.checklistTitle}>O que posso fazer?</h3>*/}

                      <div className={styles.checklist}>
                        <div className={styles.item}>
                          <div className={styles.checkIconComun}>
                            <CheckRoundedIcon />
                          </div> Podemos entrar em contato para sanar possíveis dúvidas.
                        </div>

                        <div className={styles.item}>
                          <div className={styles.checkIconComun}>
                            <CheckRoundedIcon />
                          </div>  O valor total de sua compra poderá ser alterado, para mais ou para menos, devido aos produtos de peso variável.
                        </div>

                        <div className={styles.item}>
                          <div className={styles.checkIconComun}>
                            <CheckRoundedIcon />
                          </div> No caso de faltar algum produto, este não será entregue e o valor correspondente não será cobrado.
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

          <section className={styles.sectionPedidoInfo}>

          </section>

          <section className={styles.sectionPedidoEmAndamento}>
            {/* <TabPedidos orders={} /> */}
          </section>
        </div>
      </main>

      <FooterCheckout />
    </div>
  );
}
