import { useEffect, useState, useContext, useMemo, useRef } from "react";


import HeaderCheckout from "@components/Header/HeaderCheckout";
import Button from "@components/Buttons/Button";
import CheckoutList from "@components/Checkout/CheckoutList";
import UserAddress from "@components/Checkout/UserAddress";
import styles from "@styles/pages/Checkout.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";
import MapMarkerIcon from "@assets/icons/MapMarker";
import InputText from "@components/Inputs/InputText";
import { Cliente } from "@models/Cliente";
import { MetodoEntrega } from "@models/MetodoEntrega";
import UsersIcon from "@assets/icons/Users";
import EntregaIcon from "@assets/icons/Entrega";
import EntregueIcon from "@assets/icons/Entregue";
import EnderecoIcon from "@assets/icons/EnderecoIcon";
import DataIcon from "@assets/icons/DataIcon";
import PagueEntregaIcon from "@assets/icons/PagueEntregaIcon";
import PagueSiteIcon from "@assets/icons/PagueSiteIcon";
import AmexIcon from "@assets/icons/AmexIcon";
import MasterIcon from "@assets/icons/MsterIcon";
import DinersIcon from "@assets/icons/DinersIcon";
import VisaIcon from "@assets/icons/VisaIcon";
import EloIcon from "@assets/icons/EloIcon";
import { Affiliate } from "@models/Affiliate";
import { shipayItems } from "@models/Product2";
import React from "react";
import { Api } from "src/providers";

import styles2 from "@styles/components/checkout/loja.module.css";
import moment from "moment";
import DinheiroIcon from "@assets/icons/DinheiroIcon";
import CupomIcon2 from "@assets/icons/Cupom";
import MarkIcon from "@assets/icons/MarkIcon";
import MarkIconShow from "@assets/icons/MarkIconShow";
import { Enderecos } from "@models/Enderecos";
import { data } from "jquery";
import {
  ajustStrigfy,
  cepMask,
  cpfMask,
  cpfMaskString,
  cpfMaskValue,
  getMunicipios,
  isCPF,
  isEmail,
  isMyArea,
  validarEmail,
  validarEmailString,
} from "@models/masks";
import LoadingSpinner from "@components/Spinner";
import Footer from "@components/Footer/Footer";
import { verifyAccoutability } from "@models/accountability";
import PIXCard from "@components/Modals/PIXcard";
import { AppContext } from "./_app";
import SmartImage from "@components/SmartImage";

const payments = [
  {
    title: "American Express - Crédito",
    icon: <AmexIcon />,
  },
  {
    title: "American Express - Débito",
    icon: <AmexIcon />,
  },
  {
    title: "MasterCard - Crédito",
    icon: <MasterIcon />,
  },
  {
    title: "MasterCard - Débito",
    icon: <MasterIcon />,
  },
  {
    title: "Visa - Crédito",
    icon: <VisaIcon />,
  },
  {
    title: "Visa - Débito",
    icon: <VisaIcon />,
  },
  {
    title: "Diners",
    icon: <DinersIcon />,
  },
  {
    title: "Elo - Crédito",
    icon: <EloIcon />,
  },
  {
    title: "Elo - Débito",
    icon: <EloIcon />,
  },
  {
    title: "Dinheiro",
    icon: <DinheiroIcon fill={""} />,
  },
  {
    title: "Combinado com o setor de faturamento",
    icon: <DinheiroIcon fill={""} />,
  },
];

export interface cities {
  city: string;
  state: string;
}

export default function Checkout() {
  const {
    carts: cart,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  const retirada_valor = 0;
  const retirada_valor_fixo: any = 0;
  const retirada_descricao = "";
  const tamanhoCesta = 1;
  const localPagamento = "";

  const [tabTipoEnvio, setTabTipoEnvio] = useState("Receber em casa");
  const [formaDePagamento, setFormaDePagamento] = useState("Pague na entrega");
  const [client, setClient] = useState<Cliente>();
  const [valorEntrega, setValorEntrega] = useState(0);
  const [valorTotalDesconto, setValorTotalDesconto] = useState(0);
  const [step, setStep] = useState<number>(1);
  const [listCitys, setListCitys] = useState<cities[]>([]);
  const [orderIsReady, setOrderIsReady] = useState<boolean>(false);
  const [cpfOK, setCPFOK] = useState<boolean>(false);
  const [shoPixQr, setShowPixQr] = useState<boolean>(false);

  //store states
  const [retirada_padrao_periodo, setRetiradasPeriodo] =
    useState<any>("De seg a sáb");
  const [retirada_padrao_tempo, setRetiradasTempo] =
    useState<any>("Em até 48h");
  const [meusMetodos, setMeusMetodos] = useState<MetodoEntrega[]>([]);
  const [minhasLojas, setMinhasLojas] = useState<Affiliate[]>([]);
  const [retirar, setRetirar] = useState<boolean>(false);
  const [enderecoPreferido, setEnderecoPreferido] = useState<Enderecos | any>();

  //user states
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [metodo, setMetodo] = React.useState<string>("entrega");
  const [metodoEscolhido, setMetodoEscolhido] = React.useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [clientID, setClientID] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [metodoPagamento, setPagamento] = useState<string>("Dinheiro");
  const [msgFeedback, setFeedback] = useState<string>("");
  const [localEntrega, setLocalEntrega] = useState<string>("");
  const [cpfNF, setCpfNF] = useState<string>("");
  const [meusEnderecos2, setMeusEnderecos] = React.useState<Enderecos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertDadosPessoais, setAlertDadosPessoais] = useState<boolean>(false);
  const [alertEndereco, setAlertEndereco] = useState<boolean>(false);
  const [alertDataEntrega, setAlertDataEntrega] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [card, setCard] = useState({
    number: "",
    validity: "",
    cvv: "",
    name: "",
    cpf: "",
  });

  const { current: dataEntrega } = useRef<string>(
    moment().add("days", 1).format("YYYY-MM-DD")
  );
  const [goChange, setGoChange] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  //console.log('cart.cart_conteudo',cart.cart_conteudo)
  const produtos = useMemo(
    () =>
      cart && cart.cart_conteudo
        ? JSON.parse(ajustStrigfy(cart.cart_conteudo))
        : [],
    [cart]
  );
  const valorPedido = useMemo(
    () =>
      produtos.reduce(
        (acc = 0, product: any = {}) =>
          acc +
          (product.valor && product.quantidade >= product.minimo_para_desconto
            ? product.valor * product.quantidade
            : product.product_valor * product.quantidade),
        0
      ),
    [produtos]
  );

  const [valorDescontos, setDescontos] = useState<number>(0);
  const [valorCupom, setValorCupom] = useState<number>(0);
  const [descontosFiltro, setDescontosFiltro] = useState<any>();
  const [shipayItems, setShipayItems] = useState<shipayItems[]>([]);
  const [paymentDataReturn, setPaymentDataReturn] = useState<any>();

  const valorTotal = useMemo(
    () => valorPedido + valorEntrega - valorDescontos - valorCupom,
    [valorPedido, valorEntrega, valorDescontos, valorCupom]
  );

  async function pegaCities() {
    const det = await getMunicipios("SP", setListCitys);
  }

  const useListaProdutos = useMemo(
    () =>
      produtos.map((product: any) => {
        const preco =
          product.valor && product.quantidade >= product.produtoFinal.venda.minimo_para_desconto
            ? product.produtoFinal.venda.preco_venda * product.quantidade
            : product.product_valor * product.quantidade;
        //  console.log({ product, preco })
        return {
          quantity: product.quantidade,
          unit_price: preco,
          item_title: product.product_site_name,
          ean: product.product_ean,
        };
      }),
    [produtos]
  );

  useEffect(() => {
    //console.log({ useListaProdutos });
    setShipayItems(useListaProdutos);
  }, [useListaProdutos]);

  useEffect(() => {
    // console.log({ shipayItems });
  }, [shipayItems]);


  function callbackPix() {
    //console.log("PIX PAGO");
  }

  function verifyCEP_in_RANGE(range: any | undefined): boolean {
    //console.log(range)

    if (Array.isArray(range)) {
      if (range) {
        let ranges = range;
        let value1 = null,
          value2 = null;
        let mantem = true;
        for (const a in ranges) {
          if (ranges[a].posicao === "CEP_INICIAL") {
            value1 = ranges[a].valor;
          }
          if (ranges[a].posicao === "CEP_FINAL") {
            value2 = ranges[a].valor;
            if (cep >= value1 && cep <= value2) {
              mantem = false;
            }
            (value1 = null), (value2 = null);
          }
        }
        return mantem;
      } else {
        return false;
      }
    } else {
      if (range) {
        try {
          let ranges = JSON.parse(ajustStrigfy(range));
          let value1 = null,
            value2 = null;
          let mantem = true;
          for (const a in ranges) {
            if (ranges[a].posicao === "CEP_INICIAL") {
              value1 = ranges[a].valor;
            }
            if (ranges[a].posicao === "CEP_FINAL") {
              value2 = ranges[a].valor;
              if (cep >= value1 && cep <= value2) {
                mantem = false;
              }
              (value1 = null), (value2 = null);
            }
          }
          return mantem;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }

      return false;
    }
  }

  async function verPromo() {
    const verificaPromocao = await verifyAccoutability(
      produtos,
      valorPedido,
      cpf
    );
    //console.log("on checkout", verificaPromocao);
    setDescontosFiltro(verificaPromocao);
    let todosDescontos: number = 0,
      valorCupom2: number = 0;
    for (const k in verificaPromocao) {
      if (verificaPromocao[k].type !== "Cupom") {
        todosDescontos += verificaPromocao[k].desconto;
      }
      if (
        verificaPromocao[k].cupom.fromCPF &&
        verificaPromocao[k].cupom.toCPF ===
        cpf.replace(".", "").replace(".", "").replace("-", "") &&
        cpf !== "" &&
        verificaPromocao[k].type === "Cupom"
      ) {
        valorCupom2 = verificaPromocao[k].desconto;
      }
    }
    setValorCupom(valorCupom2);

    setDescontos(todosDescontos);
  }

  useEffect(() => {
    try {
      let totalDiscount = 0;
      for (const k in produtos) {
        //  console.log("aqui os produtos", produtos[k]);
      }
    } catch (e) {
      //console.log("erro ------", e);
    }
  }, [produtos, valorTotal]);

  useEffect(() => {
    pegaCities();
    let cepTxt = localStorage.getItem("CEP_CLIENTE_SMART");
    if (cepTxt == null) {
      cepTxt = "";
    }
    setCEP(cepTxt);
    getAddresByCEP(cepTxt);
    try {
      const LOJA: string | any =
        localStorage.getItem("FULL_DELIVERY_DEFAULT") || "";

      if (LOJA) {
        //console.log('LOJA', LOJA)
        var LOJA_FULL: any = JSON.parse(ajustStrigfy(LOJA));

        const stores = LOJA_FULL.reduce((list: any = [], item: any = {}) => {
          const storeIndex = list.findIndex(
            (store: any) => store.id === item.id
          );
          let txt = process.env.AFFILIATE_ID;
          if (txt == null) {
            txt = "0";
          }
          if (storeIndex < 0 && item.id == Number(txt)) {
            list.push({
              id: item.id,
              affiliates: item.master_affiliate_names,
              metodos: item.delivery_methods,
              cepsAccepted: item.faixa_cep_values,
              cepsBlocked: item.exclui_faixa_cep_values,
              horarios: item.retirada_agendada_horarios,
              address: item.affiliates_business_endereco,
              name: item.affiliates_business_name,
              telephone: item.affiliates_business_telefone,
            });
          }

          return list;
        }, []);

        const lastStore = stores[stores.length - 1];
        const firstStore = stores[0];
        try {
          //console.log(firstStore.metodos)
          const DELIVERY_METHODS: any = firstStore.metodos
            ? JSON.parse(ajustStrigfy(firstStore.metodos))
            : [];
          setMinhasLojas(stores);
        } catch (err) {
          //  console.log("123", err);
        }
      }

      let txt2: string | any = localStorage.getItem("USER") || "";
      txt2 != null ? JSON.parse(ajustStrigfy(txt2)) : "[]";
      var USER: Cliente = JSON.parse(ajustStrigfy(txt2));

      setClient(USER);

      if (USER.users_client_name != undefined && USER.users_client_name != "") {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }

      setNumero(USER.users_client_numero);
      setComplemento(USER.users_client_complemento);
      setName(USER.users_client_name);
      setTelefone(USER.users_client_telefone);
      if (validarEmailString(USER.users_client_mail)) {
        setEmail(USER.users_client_mail);
        setMailOk(true);
      }

      setCpf(cpfMaskString(cpfMaskValue(USER.users_client_cpf)));

      if (
        USER.users_client_cpf.length === 11 ||
        USER.users_client_cpf.length === 14
      ) {
        setCPFOK(true);
      }

      setEndereco(USER.users_client_endereco);
      setBairro(USER.users_client_bairro);
      setCidade(USER.users_client_cidade);
      setEstado(USER.users_client_estado);
      if (USER.users_client_estado.length > 2) {
        let state = USER.users_client_estado.split(" ");
        let UF = state[0].substring(0, 1) + state[1].substring(0, 1);
        setEstado(UF.toUpperCase());
      }

      setCEP(USER.users_client_cep);
      localStorage.setItem(
        "MEUS_ENDERECOS",
        `[{"nome":"${USER.users_client_complemento}", "id":"${USER.users_client_cep}",
          "endereco": "${USER.users_client_complemento},${USER.users_client_endereco},${USER.users_client_bairro},${USER.users_client_cidade},${USER.users_client_cep}"}]`
      );
    } catch (ee) { }
  }, []);

  useEffect(() => {
    //console.log("cpf mudou", cpf, valorPedido);
    if (valorPedido > 0) {
      verPromo();
    }
  }, [cpf, valorPedido]);

  function setarRetirada() {
    setValorEntrega(retirada_valor ? retirada_valor : 0);
    setMetodo("retirada");
    setRetirar(true);
  }

  function setarReceber() {
    tabTipoEnvioClick("Receber em casa");
    setMetodo("entrega");
    setRetirar(false);
  }

  useEffect(() => {
    let metodos: any = localStorage.getItem("METODOS_ENTREGA");
    let todaInfo: any = localStorage.getItem("TODA_INFO");
    if (todaInfo === "undefined" || todaInfo === undefined) {
      todaInfo = "[]";
    }
    metodos = JSON.parse(ajustStrigfy(metodos));
    setMeusMetodos(metodos);

    if (metodos.length === 1) {
      setMetodoEscolhido(metodo[0]);
    }
    try {
      if (metodos && todaInfo) {
        metodos = JSON.parse(ajustStrigfy(metodos));
        todaInfo = JSON.parse(ajustStrigfy(todaInfo));
        let txt = process.env.AFFILIATE_ID;
        if (txt == null) {
          txt = "0";
        }
        for (const k in todaInfo) {
          if (Number(txt) == todaInfo[k].affiliate_id) {
            setRetiradasPeriodo(todaInfo[k].retirada_padrao_periodo);
            setRetiradasTempo(todaInfo[k].retirada_padrao_tempo);
          }
        }

        ////
        setMeusMetodos(metodos);
      } else {
        let txt = process.env.AFFILIATE_ID;
        if (txt == null) {
          txt = "0";
        }
        Api.post("https://loja.api-smartcomerci.com.br/getById_public", {
          table: "delivery_default",
          id_name: "affiliate_id",
          id_value: Number(process.env.AFFILIATE_ID),
        })
          .then((response: {
            data: {
              [x: string]: {
                affiliate_id: number;
                retirada_padrao_periodo(retirada_padrao_periodo: any): unknown;
                retirada_padrao_tempo(retirada_padrao_tempo: any): unknown; delivery_methods: React.SetStateAction<MetodoEntrega[]>;
              };
            };
          }) => {
            let txt = process.env.AFFILIATE_ID;
            if (txt == null) {
              txt = "0";
            }
            for (const k in data) {
              if (response.data[k].affiliate_id == Number(txt)) {
                localStorage.setItem(
                  "METODOS_ENTREGA",
                  response.data[k].delivery_methods.toString()
                );
                setRetiradasPeriodo(response.data[k].retirada_padrao_periodo);
                setRetiradasTempo(response.data[k].retirada_padrao_tempo);
                //console.log('meus metodos', response.data[k].delivery_methods)
                //
                setMeusMetodos(response.data[k].delivery_methods);
              } else {
                ////
              }
            }

            try {
              localStorage.setItem("TODA_INFO", JSON.stringify(data));
            } catch (err) {
              ////
            }
          })
          .catch((errou: any) => {
            ////
          });
      }
    } catch (err) {
      ////
    }
  }, []);

  useEffect(() => {
    //  console.log({ meusMetodos })
    meusMetodos.forEach((met: MetodoEntrega) => {
      //  console.log({ met })
      if (met.ativo &&
        verifyCEP_in_RANGE(
          met.localidade_exclui_ceps
        )) {
        setMetodoEscolhido(met.descricao);
        setaValorTotal(Number(met.valor_fixo));
      }


    });
  }, [meusMetodos]);

  const [dataPersonalOk, setDatPersonal] = useState<boolean>(false);
  useEffect(() => {
    let address: string =
      client?.users_client_complemento +
      ", " +
      client?.users_client_numero +
      ", " +
      client?.users_client_bairro +
      ", " +
      client?.users_client_cidade +
      ", " +
      client?.users_client_cep;

    if (client?.users_client_telefone != "" && client?.users_client_cpf != "") {
      setDatPersonal(true);
    }

    if (localStorage.getItem("USER") == null) {
      let txt = localStorage.getItem("cart_without_account");
      if (txt == null) {
        txt = "0";
      }
      if (txt == "0") {
        location.replace("/minha-conta");
      } else {
        setDatPersonal(false);
        setLocalEntrega("");
        setEnderecoPreferido(null);
      }
    }
  }, []);

  useEffect(() => {
    let USER: string | any = localStorage.getItem("USER") || "";
    //console.log(USER)
    USER = USER ? JSON.parse(ajustStrigfy(USER)) : {};
    setNumero(USER.users_client_numero);
    setComplemento(USER.users_client_complemento);

    localStorage.setItem(
      "MEUS_ENDERECOS",
      `[{"nome":"${USER.users_client_complemento}", "id":"${USER.users_client_cep}",
          "endereco": "${USER.users_client_complemento},${USER.users_client_endereco},${USER.users_client_bairro},${USER.users_client_cidade},${USER.users_client_cep}"}]`
    );

    setClient(USER);

    if (USER.users_client_name != undefined && USER.users_client_name != "") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  useEffect(() => {
    let address: string =
      client?.users_client_complemento +
      ", " +
      client?.users_client_numero +
      ", " +
      client?.users_client_bairro +
      ", " +
      client?.users_client_cidade +
      ", " +
      client?.users_client_cep;
    setMeusEnderecos([
      {
        id: client?.id ? client?.id : Math.random(),
        nome: client?.users_client_name ? client?.users_client_name : "",
        endereco: address ? address : "",
      },
    ]);

    setEnderecoPreferido({
      id: client?.id ? client?.id : Math.random(),
      nome: client?.users_client_name ? client?.users_client_name : "",
      endereco: address ? address : "",
    });
    try {
      localStorage.setItem(
        "ENDERECO_PREFERIDO",
        JSON.stringify(enderecoPreferido)
      );
    } catch (err) {
      ////
    }
  }, [client]);

  function setPreferido(end: Enderecos) {
    try {
      localStorage.setItem("ENDERECO_PREFERIDO", JSON.stringify(end));
    } catch (err) {
      ////
    }
  }

  useEffect(() => {
    validadeAlerts();
  }, [meusEnderecos2]);

  const updateMetodoEntrega = (met: MetodoEntrega) => () => {
    // console.log({ metodoE: met })
    setMetodoEscolhido(met.descricao);
    setaValorTotal(Number(met.valor_fixo));

    validadeAlerts();
  };

  async function updateClienteDetail(fieldName: string, newValue: any) {
    var ID: number = Number(localStorage.getItem("MY_ID"));
    var AFFILIATE_ID: number = Number(localStorage.getItem("MY_AFFILIATE_ID"));
    var token: string | null = localStorage.getItem("token");
    if (token == null) {
      token = "";
    }

    Api.post(
      "/updateUserDetail",
      {
        affiliate_id: AFFILIATE_ID,
        clientId: ID,
        newValue: newValue,
        fieldName: fieldName,
      },
      { headers: { "x-access-token": token } }
    )
      .then(async (response: any) => {
        // localStorage.setItem("USER",'null')
        await updateLocalStorageUser();
      })
      .catch((error: any) => {
        //location.replace('/minha-conta')
      });
    validadeAlerts();
  }

  async function validadeAlerts() {
    if (verificaSTEP(1)) {
      await setAlertDadosPessoais(true);
    } else {
    }

    if (verificaSTEP(2)) {
      await setAlertEndereco(true);
    } else {
    }

    if (verificaSTEP(2)) {
      await setAlertDataEntrega(true);
    } else {
    }
  }

  async function fechandoPedido() {
    await setIsLoading(true);
    await validadeAlerts();

    if (
      alertDadosPessoais == true &&
      alertDataEntrega == true &&
      alertEndereco == true
    ) {
      setShowAlerts(false);

      let myIdTxt = localStorage.getItem("MY_ID");
      var ID: number;
      if (myIdTxt == null) {
        ID = 0;
      } else {
        ID = Number(myIdTxt);
      }

      var AFFILIATE_ID: number = Number(process.env.AFFILIATE_ID);
      setClientID(ID);
      setAffiliateID(AFFILIATE_ID);

      updateClienteDetail("users_client_telefone", telefone);
      updateClienteDetail("users_client_cpf", cpf);
      if (valorEntrega == 0) {
        setValorEntrega(0.0);
      }
      let dadoOrder = {
        affiliate_id: AFFILIATE_ID,
        client_id: ID,
        newClient: {
          users_client_affiliate_id: AFFILIATE_ID,
          users_client_name: name,
          users_client_mail: email,
          users_client_telefone: telefone,
          users_client_cpf: cpf,
          users_client_endereco: endereco,
          users_client_numero: numero,
          users_client_complemento: complemento,
          users_client_cep: cep,
          users_client_bairro: bairro,
          users_client_cidade: cidade,
        },
        table: "orders",
        fields: [
          { column: "order_affiliate_id", value: AFFILIATE_ID },
          { column: "order_client_id", value: ID },
          { column: "order_status", value: 1 },
          { column: "order_general_comment", value: comentario },
          { column: "order_data_entrega", value: dataEntrega },
          {
            column: "order_metodo_entrega",
            value: retirar ? "retirar na loja" : metodoEscolhido,
          },
          { column: "order_metodo_pagamento", value: metodoPagamento },
          { column: "order_local_pagamento", value: localPagamento },
          { column: "order_cpf_nf", value: cpfNF },
          { column: "order_tamanho_cesta", value: tamanhoCesta },
          { column: "order_conteudo", value: JSON.stringify(produtos) },
          { column: "order_valor_total", value: valorTotal },
          { column: "order_valor_entrega", value: valorEntrega },
          { column: "order_payment_data", value: JSON.stringify(paymentDataReturn ? paymentDataReturn.data : null) },
        ],
      };

      var token: string | null = localStorage.getItem("token");
      if (token == null) {
        token = "";
      }

      Api.post("/insertNew", dadoOrder, {
        headers: { "x-access-token": token },
      })
        .then((response: { data: { insertId: string; }; }) => {
          var tk: string | null = localStorage.getItem("token");
          if (tk == null) {
            tk = "";
          }

          Api.post("/sendMailTest", {
            message: {
              to: email,
              html: "Seu pedido foi realizado com sucesso!",
              subject: "Pedido realizado - Nº " + response.data.insertId,
              text: "",
              from: "naoresponda@smartcomerci.com.br",
            },
          })
            .then((response: any) => {
              //
            })
            .catch((err: any) => {
              alert("Algo saiu errado!\n\nTente novamente...");
              setIsLoading(false);
            });

          Api.post(
            "/updateCart",
            {
              affiliate_id: affiliateID,
              cart_conteudo: "[]",
              client_id: clientID,
            },
            { headers: { "x-access-token": tk } }
          )
            .then((response: any) => {
              // console.log("resposta pedido...", response);
              if (update) {
                update({});
              }

              location.replace("/pedido-finalizado");
            })
            .catch((error: any) => {
              alert("Algo saiu errado!\n\nTente novamente...");
              setIsLoading(false);
            });
        })
        .catch(async (error: any) => {
          let txt = process.env.AFFILIATE_ID;
          if (txt == null) {
            txt = "0";
          }
          let AFF_ID = Number(txt);
          localStorage.setItem(
            "FEEDBACK_PEDIDO_CRIADO",
            JSON.stringify(dadoOrder)
          );

          Api.post("/sendMailTest", {
            message: {
              to: email,
              html: "Seu pedido foi realizado com sucesso!",
              subject: "Pedido realizado ",
              text: "",
              from: "naoresponda@smartcomerci.com.br",
            },
          })
            .then((response: any) => {
              setIsLoading(false);
            })
            .catch((err: any) => {
              alert("Algo saiu errado!\n\nTente novamente...");
              setIsLoading(false);
            });

          await Api.post("/pedidoClienteNovo", dadoOrder)
            .then((response: { data: { insertClientId: string; }; }) => {
              // console.log("resposta pedido", response);

              localStorage.setItem(
                "ID_CLIENT_SEM_SENHA",
                response.data.insertClientId
              );
              localStorage.setItem("EMAIL_CLIENT_SEM_SENHA", email);
              location.replace("/pedido-finalizado");

              localStorage.setItem(
                "USER",
                JSON.stringify({
                  users_client_affiliate_id: AFF_ID,
                  users_client_name: name,
                  users_client_mail: email,
                  users_client_telefone: telefone,
                  users_client_cpf: cpf,
                  users_client_endereco: endereco,
                  users_client_numero: numero,
                  users_client_complemento: complemento,
                  users_client_cep: cep,
                  users_client_bairro: bairro,
                  users_client_cidade: cidade,
                })
              );
            })
            .catch((error: any) => {
              alert("Algo saiu errado!\n\nTente novamente...");
              setIsLoading(false);
            });
        });
    } else {
      window.scrollTo(0, 0);
      setShowAlerts(true);

      setIsLoading(false);
    }
  }

  const handleChangeCPFNF = (value: any) => setCpfNF(value);

  const verifyCupomCode = (value: any) => {
    // console.log(value);
    try {
      if (descontosFiltro && descontosFiltro.length > 0) {
        let exists = undefined;
        // const exists = descontosFiltro?.find((d: any) => d.cupom.toCPF === value.target.value && d.cupom.fromCPF)
        for (const k in descontosFiltro) {

          if (
            descontosFiltro[k].cupom.cupomCode === value.target.value &&
            !descontosFiltro[k].cupom.fromCPF
          ) {
            exists = descontosFiltro[k];
          }
        }
        console.log("exists desconto", exists);

        if (exists) {
          setValorCupom(exists.desconto);
        } else {
          setValorCupom(0);
        }
      }
    } catch (err) {
      console.log("err tal", err);
    }
  };

  const handleChangeCard = (field: string) => (value: any) =>
    setCard((card) => ({ ...card, [field]: value }));

  async function verifyOrderReady() {
    if (verificaSTEP(1) && verificaSTEP(2) && verificaSTEP(3)) {
      setOrderIsReady(true);
    }
  }

  const onkeydown = async (e: any) => {
    await setComentario(e.nativeEvent.target.value);
    //console.log(comentario,e)
  };

  //user infos update
  const onUpdateEmail = (valor: string) => {
    setEmail(valor);
  };
  const [mailOk, setMailOk] = useState<boolean>(false);
  function verificandoMail(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    if (validarEmail(e)) {
      setEmail(value);
      setMailOk(true);
    } else {
      setMailOk(false);
    }
  }

  const debouncePhoneField = useRef<any>(0);
  const onUpdateTelefone = (valor: string) => {
    setTelefone(valor);

    if (debouncePhoneField.current) {
      clearTimeout(debouncePhoneField.current);
    }

    debouncePhoneField.current = setTimeout(() => {
      updateClienteDetail("users_client_telefone", valor);
    }, 300);
  };

  const debounceCPField = useRef<any>(0);
  const onUpdateCPF = (valor: string) => {
    //
    setCpf(cpfMaskValue(valor));

    if (isCPF(valor)) {
      if (debounceCPField.current) {
        clearTimeout(debounceCPField.current);
      }

      debounceCPField.current = setTimeout(() => {
        updateClienteDetail("users_client_cpf", valor);
      }, 300);
      setCPFOK(true);
    } else {
      setCPFOK(false);
    }
  };

  const debounceNameField = useRef<any>(0);
  const onUpdateNome = (valor: string) => {
    setName(valor);

    if (debounceNameField.current) {
      clearTimeout(debounceNameField.current);
    }

    debounceNameField.current = setTimeout(() => {
      updateClienteDetail("users_client_name", valor);
    }, 300);
  };

  const handleChangeCep = (valor: string) => {
    setCEP(valor);

    if (valor.length >= 8) {
      getAddresByCEPClient(valor);
    }
  };

  const debounceAddressField = useRef<any>(0);
  const guardaEndereco = (valor: string) => {
    setEndereco(valor);

    if (debounceAddressField.current) {
      clearTimeout(debounceAddressField.current);
    }

    debounceAddressField.current = setTimeout(() => {
      updateClienteDetail("users_client_endereco", valor + ", " + numero);
    }, 300);
  };

  const debounceCityField = useRef<any>(0);
  const guardaCidade = (valor: string) => {
    setCidade(valor);
    try {
      const state = listCitys.find((city) => city.city === valor);
      let lugar = state?.state ? state?.state : "";
      guardaEstado(lugar);
    } catch (ee) {
      console;
    }

    if (debounceCityField.current) {
      clearTimeout(debounceCityField.current);
    }

    debounceCityField.current = setTimeout(() => {
      updateClienteDetail("users_client_cidade", cidade);
    }, 300);
  };

  const guardaEstado = (valor: string) => {
    if (valor.length > 2) {
      let state = valor.split(" ");
      let UF = state[0].substring(0, 1) + state[1].substring(0, 1);
      setEstado(UF.toUpperCase());
      valor = UF.toUpperCase();
    } else {
      setEstado(valor);
    }

    if (debounceCityField.current) {
      clearTimeout(debounceCityField.current);
    }
    debounceCityField.current = setTimeout(() => {
      updateClienteDetail("users_client_estado", valor);
    }, 300);
  };

  const debounceNumberField = useRef<any>(0);
  const guardaNumero = (valor: string) => {
    setNumero(valor);

    if (debounceNumberField.current) {
      clearTimeout(debounceNumberField.current);
    }

    debounceNumberField.current = setTimeout(() => {
      updateClienteDetail("users_client_numero", " " + valor);
    }, 300);
  };

  const guardaComplementoBlur = (valor: string) => {
    setComplemento(valor);
    if (debounceNumberField.current) {
      clearTimeout(debounceNumberField.current);
    }
    debounceNumberField.current = setTimeout(() => {
      updateClienteDetail("users_client_complemento", valor);
    }, 300);
  };

  const guardaComplemento = (valor: string) => {
    setComplemento(valor);
  };

  const debounceCEPield = useRef<any>(0);
  const guardaCep = (valor: string) => {
    getAddresByCEP(valor);

    setCEP(valor);

    if (debounceCEPield.current) {
      clearTimeout(debounceCEPield.current);
    }

    debounceCEPield.current = setTimeout(() => {
      updateClienteDetail("users_client_cep", valor);
    }, 300);
  };

  const debounceBairroField = useRef<any>(0);
  const guardaBairro = (valor: string) => {
    setBairro(valor);

    if (debounceBairroField.current) {
      clearTimeout(debounceBairroField.current);
    }

    debounceBairroField.current = setTimeout(() => {
      updateClienteDetail("users_client_bairro", valor);
    }, 300);
  };

  function tabTipoEnvioClick(tipoEnvio: string) {
    setTabTipoEnvio(tipoEnvio);
  }

  function tabFormaDePagamentoClick(tipoEnvio: string) {
    if (tipoEnvio == "Pagar pelo site") {
      setShowPixQr(!shoPixQr);
    }

    setFormaDePagamento(tipoEnvio);
  }

  function setaValorTotal(myValue: number) {
    setValorEntrega(myValue);
  }

  function getAddresByCEPClient(CEP: string) {
    Api.get("https://ws.apicep.com/cep/" + CEP + ".json")
      .then((response: { data: { city: string; district: string; state: string; address: string; code: string; }; }) => {
        try {
          updateClienteDetail("users_client_cidade", response.data.city);
          updateClienteDetail("users_client_bairro", response.data.district);
          updateClienteDetail("users_client_cep", CEP);
          setMeusEnderecos([
            {
              nome: response.data.city + ", " + response.data.state,
              id: Number(CEP),
              endereco:
                response.data.address +
                ", " +
                response.data.district +
                ", " +
                response.data.code,
            },
          ]);
          setEnderecoPreferido({
            nome: response.data.city + ", " + response.data.state,
            id: Number(CEP),
            endereco:
              response.data.address +
              ", " +
              response.data.district +
              ", " +
              response.data.code,
          });
          localStorage.setItem(
            "ENDERECO_PREFERIDO",
            JSON.stringify(enderecoPreferido)
          );

          localStorage.setItem(
            "ADDRESSES_CLIENT",
            JSON.stringify(meusEnderecos2)
          );
        } catch (erro) { }
      })
      .catch((error: any) => {
        //location.replace('/minha-conta')
      });
  }

  function verificaSTEP(step: number) {

    switch (step) {
      case 1:
        if (
          name != "" &&
          cpf != "" &&
          cpfOK &&
          telefone != "" &&
          email != "" &&
          mailOk
        ) {
          return true;
        } else {
          return false;
        }
      case 2:
        if (
          (cep != "" &&
            endereco != "" &&
            bairro != "" &&
            cidade != "" &&
            numero != "" &&
            isMyArea(cep)) ||
          retirar === true
        ) {
          return true;
        } else {
          return false;
        }
      case 3:
        let entregar = retirar ? "retirar na loja" : metodoEscolhido;
        if (metodoPagamento != "" && produtos.length > 0 && entregar != "") {
          return true;
        } else {
          return false;
        }

      default:
        return false;
    }
  }

  // useEffect(() => {
  //   //
  // }, [retirar])

  // useEffect(() => {

  //   if (produtos.length === 0) {
  //     console.log('sem produtos')
  //   }
  // }, [produtos])

  function getAddresByCEP(CEP: string) {
    CEP = CEP.replace(/-/g, "");

    if (CEP.length >= 8) {
      let isMyAreaOk = isMyArea(CEP);
      localStorage.setItem("IS_MY_AREA", String(isMyAreaOk));
      if (!isMyAreaOk) {
      }
      Api.get("https://ws.apicep.com/cep/" + CEP + ".json")
        .then((response: { data: { message: React.SetStateAction<string> | undefined; city: React.SetStateAction<string> | undefined; state: React.SetStateAction<string>; address: React.SetStateAction<string> | undefined; district: React.SetStateAction<string> | undefined; }; }) => {
          //console.log(response)

          if (response.data.message != undefined) {
            setFeedback(response.data.message);
          } else {
            setFeedback(
              "Informações preenchidas automáticamente, confira antes de prosseguir!"
            );
          }

          if (response.data.city != undefined) {
            setCidade(response.data.city);
            setEstado(response.data.state);

            updateClienteDetail("users_client_cidade", response.data.city);
            updateClienteDetail("users_client_estado", response.data.state);
          }
          if (response.data.address != undefined) {
            setEndereco(response.data.address);
            updateClienteDetail("users_client_endereco", response.data.address);
          }
          if (response.data.district != undefined) {
            setBairro(response.data.district);
            updateClienteDetail("users_client_bairro", response.data.district);
          }
        })
        .catch((error: any) => {
          //location.replace('/minha-conta')
        });
    }
  }

  function alertar(texto: string) {
    alert(texto);
  }

  function retunrStep() {
    if (step === 1) {
      window.history.back();
    } else if (step > 1) {
      setStep(step - 1);
    } else {
    }
  }
  useEffect(() => {
    let myMail = localStorage.getItem("MAIL_TO_USER_SMART");
    if (myMail == null) {
      myMail = "";
    } else {
      setEmail(myMail);
      if (validarEmailString(myMail)) {
        setMailOk(true);
      }
    }
  }, [alertDadosPessoais, alertDataEntrega, alertEndereco]);


  useEffect(() => {
    console.log({ metodoEscolhido })

  }, [metodoEscolhido])
  useEffect(() => {
    console.log({ paymentDataReturn })

    if (paymentDataReturn?.data.status === "approved") {
      if (verificaSTEP(1) == true &&
        verificaSTEP(2) == true &&
        verificaSTEP(3) == true) {
        fechandoPedido()
      }
      console.log("FAZER PEDIDOOOO")
    }
  }, [paymentDataReturn])

  async function updateLocalStorageUser() {
    let txt = localStorage.getItem("USER");
    let token = localStorage.getItem("token");
    if (token == null) {
      token = "";
    }
    if (txt == null || txt == "null") {
      txt = "[]";
    }

    try {
      //console.log('USER', txt)
      let USER = JSON.parse(ajustStrigfy(txt));

      await Api.post(
        "/clientConfere",
        {
          mail: USER.users_client_mail,
        },
        { headers: { "x-access-token": token } }
      )
        .then((response: { data: Cliente; }) => {
          let token = "";
          if (response.data.token) {
            token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("MY_ID", response.data.id.toString());
            localStorage.setItem(
              "MY_AFFILIATE_ID",
              response.data.users_client_affiliate_id.toString()
            );

            var USER: Cliente = response.data;

            localStorage.setItem("USER", JSON.stringify(response.data));
            localStorage.setItem("token_me", response.data.token_me);
            setComplemento(USER.users_client_complemento);
            setNumero(USER.users_client_numero);

            setClient(USER);

            if (
              USER.users_client_name != undefined &&
              USER.users_client_name != ""
            ) {
              setIsLogged(true);
            } else {
              setIsLogged(false);
            }

            localStorage.setItem(
              "MEUS_ENDERECOS",
              `[{"nome":"${USER.users_client_complemento}", "id":"${USER.users_client_cep}",
          "endereco": "${USER.users_client_complemento},${USER.users_client_endereco},${USER.users_client_bairro},${USER.users_client_cidade},${USER.users_client_cep}"}]`
            );
          }
        })
        .catch((error: any) => { });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className={styles.boxDesktop}>
        <HeaderCheckout />
      </div>
      <div className={`${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7">
              <h1 className={styles.pageTitle}>
                <div
                  onClick={() => retunrStep()}
                  className={`${styles.pageTitleIcon} d-lg-none`}
                >
                  <MobileModalCloseButton />
                </div>
                {step == 1
                  ? "Finalizar Pedido"
                  : step == 2
                    ? "Entrega"
                    : step == 3
                      ? "Pagamento"
                      : "Finalizar Pedido"}
              </h1>

              {step == 1 ? (
                <div className={`${styles.box} ${styles.boxDadosPessoais}`}>
                  <header>
                    <h2 className={styles.boxTitle}>
                      <span className={styles.titleIcon}>
                        <UsersIcon fill="var(--primary)" />
                      </span>
                      Dados pessoais
                    </h2>
                  </header>

                  {!isLogged || goChange || verificaSTEP(1) === false ? (
                    <div className={styles.boxBody}>
                      <p>
                        Você poderá salvar os dados para a próxima compra após a
                        finalização
                      </p>

                      <div className={styles.form}>
                        <InputText
                          label="Nome Completo"
                          focar={false}
                          defaultValue={name}
                          onchange={onUpdateNome}
                          id="nome"
                        />
                        {name != "" ? (
                          <div className="oculta"></div>
                        ) : (
                          <p className="colorRed">
                            * Preenchimento obrigatório!
                          </p>
                        )}

                        <InputText
                          label="Telefone"
                          onchange={onUpdateTelefone}
                          id="telefone"
                          focar={false}
                          defaultValue={telefone}
                          className={`${verificaSTEP(1) ? "" : "classError"}`}
                          inputMode={"numeric"}
                        />
                        {telefone != "" ? (
                          <div className="oculta"></div>
                        ) : (
                          <p className="colorRed">
                            * Preenchimento obrigatório!
                          </p>
                        )}
                        <InputText
                          label="E-mail"
                          onchange={onUpdateEmail}
                          onKeyUp={verificandoMail}
                          className={`${mailOk ? "" : "borderRed2"} ${verificaSTEP(1) ? "" : "classError"
                            }`}
                          id="email"
                          focar={false}
                          type="email"
                          defaultValue={email}
                        />
                        {mailOk ? (
                          <div className="oculta"></div>
                        ) : (
                          <p className="colorRed">
                            * Preenchimento obrigatório!
                          </p>
                        )}
                        <InputText
                          label="CPF"
                          onKeyUp={cpfMask}
                          onchange={onUpdateCPF}
                          id="cpf"
                          type="text"
                          focar={false}
                          defaultValue={cpf}
                          inputMode={"numeric"}
                          className={`${verificaSTEP(1) ? "" : "classError"}`}
                        />
                        {cpf != "" && cpfOK ? (
                          <div className="oculta"></div>
                        ) : (
                          <p className="colorRed">* Preencha corretamente!</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${styles.contentBoxContainer} ${showAlerts && !alertDadosPessoais
                        ? "alertBorderRed"
                        : ""
                        } `}
                    >
                      <div
                        className={`${styles.contentBoxItem} ativado leftCorreta`}
                      >
                        <br />
                        <div>
                          <div className={styles.enderecoContent}>
                            <b> {client?.users_client_name} </b>
                            <br />
                            {client?.users_client_mail}
                            <br />
                            {client?.users_client_telefone} - CPF:{" "}
                            {client?.users_client_cpf}
                          </div>
                        </div>
                        <MarkIconShow myClass={"check112"} />
                      </div>

                      <div
                        onClick={() => setGoChange(true)}
                        className={styles.alterarEndereco}
                      >
                        Alterar dados
                      </div>
                    </div>
                  )}

                  {alertDadosPessoais ? (
                    <div className="oculta"></div>
                  ) : (
                    <div>
                      <hr />
                      <p className="colorRed oculta">
                        Preencha todos os campos!
                      </p>
                    </div>
                  )}
                </div>
              ) : step == 2 ? (
                <div
                  className={`${styles.box} ${styles.boxTipoEnvio}   d-lg-none `}
                >
                  <header>
                    <div
                      className={`${styles.boxTab} ${tabTipoEnvio === "Receber em casa" ? styles.active : ""
                        }`}
                      onClick={() => setarReceber()}
                    >
                      <h2 className={`${styles.boxTabTitle} tabSelect2`}>
                        <span className={styles.titleIcon}>
                          <EntregaIcon fill={true} />
                        </span>
                        Receber em casa
                        {tabTipoEnvio == "Receber em casa" ? (
                          <i className={styles.boxTabCheck}>
                            <MarkIconShow myClass={"checkNormal"} />
                          </i>
                        ) : (
                          <div></div>
                        )}
                      </h2>
                    </div>

                    <div
                      className={`${styles.boxTab} ${tabTipoEnvio === "Retirar na loja" ? styles.active : ""
                        }`}
                      onClick={() => tabTipoEnvioClick("Retirar na loja")}
                    >
                      <h2
                        onClick={() => setarRetirada()}
                        className={`${styles.boxTabTitle} tabSelect2`}
                      >
                        <span className={styles.titleIcon}>
                          <EntregueIcon fill={true} />
                        </span>
                        Retire em nossa loja
                        {tabTipoEnvio == "Retirar na loja" ? (
                          <i className={styles.boxTabCheck}>
                            <MarkIconShow myClass={"checkNormal"} />
                          </i>
                        ) : (
                          <div></div>
                        )}
                      </h2>
                    </div>
                  </header>

                  <div className={`${styles.boxBody}`}>
                    <div
                      className={`${styles.contentBox}  ${tabTipoEnvio !== "Receber em casa" ? styles.hide : ""
                        }`}
                      id={styles.enderecos}
                    >
                      {/* Coloquei duas classes, uma para error (vermelha), outra para validado (verde) */}
                      <div
                        className={`${styles.boxInputWithIcon} ${styles.validate} ${styles.error}`}
                      >
                        <div className={styles.inputIcon}>
                          <MapMarkerIcon /> Endereço de entrega
                        </div>
                        {localEntrega != null && localEntrega != "" ? (
                          <div>
                            <InputText
                              onchange={guardaCep}
                              focar={false}
                              label="CEP"
                              onKeyUp={cepMask}
                              id="CEP"
                              defaultValue={cep}
                              inputMode={"numeric"}
                              className={` ${verificaSTEP(1) ? "" : "classError"
                                }`}
                            />
                            {isMyArea(String(cep)) ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Desculpe, não entregamos no cep informado!
                              </p>
                            )}
                            <div
                              onClick={() => setLocalEntrega("")}
                              className={styles.alterarEndereco}
                            >
                              Alterar Endereço
                              <br />
                            </div>
                          </div>
                        ) : (
                          <div className={` ${styles.form} `}>
                            <InputText
                              onchange={guardaCep}
                              focar={false}
                              label="CEP"
                              onKeyUp={cepMask}
                              id="CEP"
                              defaultValue={cep}
                              inputMode={"numeric"}
                              className={` ${verificaSTEP(1) ? "" : "classError"
                                }`}
                            />
                            {isMyArea(String(cep)) ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Desculpe, não entregamos no cep informado!
                              </p>
                            )}
                            <InputText
                              onchange={guardaEndereco}
                              focar={false}
                              label="Endereço"
                              id="endereco"
                              defaultValue={endereco}
                            />
                            {endereco != "" ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Preenchimento obrigatório!
                              </p>
                            )}
                            <InputText
                              onchange={guardaBairro}
                              label="Bairro"
                              focar={false}
                              id="bairro"
                              defaultValue={bairro}
                              className={`${verificaSTEP(1) ? "" : "classError"
                                }`}
                            />
                            {bairro != "" ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Preenchimento obrigatório!
                              </p>
                            )}
                            <datalist id="cities">
                              {listCitys.map((item, key) => (
                                <option key={key} value={item.city} />
                              ))}
                            </datalist>
                            <InputText
                              onchange={guardaCidade}
                              label="Cidade"
                              id="cidade"
                              focar={false}
                              defaultValue={cidade}
                              list={"cities"}
                              className={`${verificaSTEP(1) ? "" : "classError"
                                }`}
                            />
                            {cidade != "" ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Preenchimento obrigatório!
                              </p>
                            )}

                            <InputText
                              focar={false}
                              onchange={guardaEstado}
                              label="Estado"
                              id="estado"
                              defaultValue={estado}
                            />
                            {cidade != "" ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Preenchimento obrigatório!
                              </p>
                            )}
                            <InputText
                              onchange={guardaNumero}
                              label="Número"
                              focar={false}
                              id="numero"
                              inputMode={"numeric"}
                              type="text"
                              defaultValue={numero?.replace(/ /g, "")}
                            />
                            {numero != "" ? (
                              <div className="oculta"></div>
                            ) : (
                              <p className="colorRed">
                                * Preenchimento obrigatório!
                              </p>
                            )}
                            <InputText
                              onchange={guardaComplemento}
                              onBlur={guardaComplementoBlur}
                              label="Complemento"
                              id="complemento"
                              maxLenght={20}
                              focar={false}
                              defaultValue={complemento}
                            />
                            {msgFeedback.indexOf("não encontrado") > -1 ? (
                              <div className="danger">{msgFeedback}</div>
                            ) : (
                              <div className={styles.enderecoMensagem}>
                                {msgFeedback}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className={`${styles.cepMessage} oculta`}>
                        <div className={styles.cepMessageError}>
                          Não entregamos nessa região.
                        </div>
                        Que tal retirar em uma das nossas lojas?
                      </div>

                      <div className={`${styles.addressList} oculta`}>
                        <br />
                        {meusEnderecos2.map((end: Enderecos) =>
                          end?.nome != undefined ? (
                            <div onClick={() => setPreferido(end)} key={end.id}>
                              <UserAddress
                                name={end?.nome}
                                address={end?.endereco}
                              />
                            </div>
                          ) : (
                            <div key={Math.random()}></div>
                          )
                        )}
                      </div>
                    </div>

                    <div
                      className={`${styles.contentBox}  ${tabTipoEnvio !== "Retirar na loja" ? styles.hide : ""
                        }`}
                      id={styles.lojas}
                    >
                      <h3 className={styles.contentBoxTitle}>
                        <div className={styles.contentBoxIcon}>
                          <EnderecoIcon />
                        </div>
                        Onde deseja retirar?
                      </h3>

                      <div className={styles.contentBoxContainer}>
                        <h3 className={styles.contentBoxSubtitle}>
                          Listamos as lojas que possuem os itens do seu carrinho
                          .....
                        </h3>

                        <div className={styles.contentBoxList}>
                          {minhasLojas.map((aff: Affiliate) => (
                            <div
                              onClick={() => setRetirar(true)}
                              key={Math.random()}
                              className={`ativado ${styles2.loja} ondeRetirar ${retirar ? "ativado" : "ativado"
                                } `}
                            >
                              <MarkIconShow myClass={"check44"} />
                              <div
                                className={`${styles2.thumbnail} oculta`}
                              ></div>

                              <div
                                className={`${styles2.contentBox} ondeRetirar ativado`}
                              >
                                <div className={styles2.content}>
                                  <h5 className={styles2.nome}>{aff.name}</h5>

                                  <div className={styles2.endereco}>
                                    {aff.address}
                                    <br />
                                    Tel: {aff.telephone}
                                  </div>
                                </div>

                                <button
                                  /* onClick={() => setLocalRetirada(aff)} */
                                  className={`${styles2.button} oculta`}
                                >
                                  Retirar aqui
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.contentBox} id={styles.dates}>
                      {metodo == "entrega" ? (
                        <div>
                          <div className={styles.contentBoxTitle}>
                            <div className={styles.contentBoxIcon}>
                              <DataIcon />
                            </div>
                            Data da entrega
                          </div>
                          <div className={styles.contentBoxContainer}>
                            <div className={`${styles.contentBoxList}`}>
                              {meusMetodos &&
                                meusMetodos.map(
                                  (met: MetodoEntrega, index) =>
                                    met.ativo &&
                                    verifyCEP_in_RANGE(
                                      met.localidade_exclui_ceps
                                    ) && (
                                      <div
                                        onClick={updateMetodoEntrega(met)}
                                        key={index}
                                        className={`ativado metodoEntregaCard`}
                                      >
                                        <div className={`dateCardMetodo`}>
                                          <div>
                                            <div>{met.descricao}</div>
                                            <br />
                                            <div
                                              className={styles.col_esquerda}
                                            >
                                              {met.entrega_padrao_tempo} <br />
                                              <span className={styles.horario}>
                                                {met.entrega_padrao_periodo}
                                              </span>
                                            </div>
                                          </div>
                                          <hr />
                                          <div className={styles.price}>
                                            R${" "}
                                            {String(met.valor_fixo).replace(
                                              ".",
                                              ","
                                            )}
                                          </div>
                                        </div>
                                        <MarkIconShow myClass={"check33-2"} />
                                      </div>
                                    )
                                )}
                            </div>

                            <div className={styles.adicionarComentario}>
                              <input
                                type="text"
                                onChange={onkeydown}
                                placeholder="Adicione um comentário para o separador"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={styles.contentBoxTitle}>
                            <div className={styles.contentBoxIcon}>
                              <DataIcon />
                            </div>
                            Data da retirada
                          </div>

                          <div className={styles.contentBoxContainer}>
                            <div
                              key={Math.random()}
                              className={`${styles.contentBoxList} ${showAlerts && !alertDataEntrega
                                ? "alertBorderRed"
                                : ""
                                }`}
                            >
                              {retirada_valor_fixo === 1 ? (
                                <div
                                  onClick={() => setaValorTotal(retirada_valor)}
                                  key={Math.random()}
                                  className={`${styles.contentBoxItem} ativado`}
                                >
                                  <div className={styles.date}>
                                    <div className={styles.top}>
                                      <div className={styles.col_direita}>
                                        {retirada_descricao}
                                      </div>
                                      <br />
                                      <div className={styles.col_esquerda}>
                                        {retirada_padrao_periodo} <br />
                                        <span className={styles.horario}>
                                          {retirada_padrao_tempo}
                                        </span>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className={styles.price}>
                                      R$ {retirada_valor}
                                    </div>
                                  </div>
                                  <MarkIconShow myClass={"check33"} />
                                </div>
                              ) : (
                                <div
                                  onClick={() => setaValorTotal(0)}
                                  key={Math.random()}
                                  className={`${styles.contentBoxItem} ${showAlerts && !alertDataEntrega
                                    ? "alertBorderRed"
                                    : ""
                                    } ativado`}
                                >
                                  <div className={styles.date}>
                                    <div className={styles.top}>
                                      <div className={styles.col_direita}></div>
                                      <br />
                                      <div className={styles.col_esquerda}>
                                        {retirada_padrao_tempo} <br />
                                        <span className={styles.horario}>
                                          {retirada_padrao_periodo}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <MarkIconShow myClass={"check33"} />
                                </div>
                              )}
                            </div>
                            <div className={styles.adicionarComentario}>
                              <input
                                type="text"
                                onChange={onkeydown}
                                placeholder="Adicione um comentário para o separador"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {alertEndereco ? (
                    <div className="oculta"></div>
                  ) : (
                    <p className="colorRed oculta">Preencha todos os campos!</p>
                  )}
                </div>
              ) : step == 3 ? (
                <div>
                  <div
                    className={`${styles.box} ${styles.boxFormaDePagamento}`}
                  >
                    <header>
                      <div
                        className={`${styles.boxTab} ${formaDePagamento === "Pague na entrega"
                          ? styles.active
                          : ""
                          }`}
                        onClick={() =>
                          tabFormaDePagamentoClick("Pague na entrega")
                        }
                      >
                        <h2 className={`${styles.boxTabTitle} tabSelect`}>
                          <span className={styles.titleIcon}>
                            <PagueEntregaIcon />
                          </span>
                          Pague na entrega
                          <i className={styles.boxTabCheck}>
                            <MarkIconShow myClass={"checkNormal"} />
                          </i>
                        </h2>
                      </div>

                      <div

                        className={`ocultar ${styles.boxTab} ${formaDePagamento === "Pagar pelo site"
                          ? styles.active
                          : ""
                          }`}
                        onClick={() =>
                          tabFormaDePagamentoClick("Pagar pelo site")
                        }
                      >
                        <h2 className={`${styles.boxTabTitle} tabSelect`}>
                          <span className={styles.titleIcon}>
                            <PagueSiteIcon />
                          </span>
                          Pagar pelo site
                          <i className={styles.boxTabCheck}>
                            <MarkIcon fill="absolute" />
                          </i>
                        </h2>
                      </div>
                    </header>

                    <div className={styles.boxBody}>
                      <div
                        className={`${styles.contentBox} ${formaDePagamento !== "Pague na entrega"
                          ? styles.hide
                          : ""
                          }`}
                        id={styles.formaDePagamento}
                      >
                        <p>Selecione a forma de pagamento</p>

                        <div className={styles.contentBoxList}>
                          {payments.map(({ title, icon }) => (
                            <div
                              key={Math.random()}
                              onClick={() => setPagamento(title)}
                              className={`${styles.contentBoxItem
                                } metodoPagamento ${metodoPagamento == title ? "ativado" : ""
                                } outraLeft`}
                            >
                              <div className={styles.itemImg}>{icon}</div>

                              <div className={styles.itemTitle}>{title}</div>
                              {metodoPagamento == title ? (
                                <i>
                                  <MarkIconShow myClass={"check11"} />
                                </i>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div

                        className={`${styles.contentBox} ${formaDePagamento !== "Pagar pelo site"
                          ? styles.hide
                          : ""
                          }`}
                        id={styles.formaDePagamento}
                      >
                        <p>cartões de crédito: </p>

                        <div className={`${styles.formCartao} oculta`}>
                          <div className="row">
                            <div className="col-12 mb-5">
                              <InputText
                                defaultValue={card.number}
                                onchange={handleChangeCard("number")}
                                label="Número do cartão"
                                id="numero_cartao"
                                className="w-100"
                                focar={false}
                              />
                            </div>

                            <div className="col-12 col-lg-6 mb-5">
                              <InputText
                                defaultValue={card.validity}
                                onchange={handleChangeCard("validity")}
                                label="Validade (mm/aaaa)"
                                id="validade_cartao"
                                className="w-100"
                                focar={false}
                              />
                            </div>
                            <div className="col-12 col-lg-6 mb-5">
                              <InputText
                                defaultValue={card.cvv}
                                onchange={handleChangeCard("cvv")}
                                label="CVV"
                                id="cvv_cartao"
                                className="w-100"
                                focar={false}
                              />
                            </div>

                            <div className="col-12 mb-5">
                              <InputText
                                defaultValue={card.name}
                                onchange={handleChangeCard("name")}
                                label="Nome impresso no cartão"
                                id="nome_cartao"
                                className="w-100"
                                focar={false}
                              />
                            </div>

                            <div className="col-12">
                              <InputText
                                defaultValue={card.cpf}
                                onchange={handleChangeCard("cpf")}
                                label="CPF"
                                onKeyUp={cpfMask}
                                id="cpf_cartao"
                                className="w-100"
                                type="text"
                                focar={false}
                              />
                            </div>
                          </div>
                        </div>
                        <PIXCard
                          setPaymentData={setPaymentDataReturn}
                          show={shoPixQr}
                          valorTotal={valorTotal}
                          valorFrete={valorEntrega}
                          buyer={{
                            name,
                            email,
                            phone: telefone,
                            cpf_cnpj: cpf,
                          }}
                          items={shipayItems}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.notaFiscal}  d-lg-none `}>
                    <p className={styles.cpf}>
                      Quer o CPF/CNPJ na nota fiscal?
                    </p>
                    <InputText
                      defaultValue={cpf}
                      onchange={handleChangeCPFNF}
                      label="Insira seu CPF ou CPNJ"
                      id="cpf"
                      onKeyUp={cpfMask}
                      type="text"
                      focar={false}
                      className={`w-100 ${verificaSTEP(1) ? "" : "classError"}`}
                    />
                  </div>
                  {alertDataEntrega ? (
                    <div className="oculta"></div>
                  ) : (
                    <p className="colorRed oculta">Preencha todos os campos!</p>
                  )}
                </div>
              ) : (
                <div></div>
              )}

              <div
                className={`${styles.box} ${styles.boxTipoEnvio} ${styles.boxDesktop} `}
              >
                <header>
                  <div
                    className={`${styles.boxTab} ${tabTipoEnvio === "Receber em casa" ? styles.active : ""
                      }`}
                    onClick={() => setarReceber()}
                  >
                    <h2 className={`${styles.boxTabTitle} tabSelect2`}>
                      <span className={styles.titleIcon}>
                        <EntregaIcon fill={true} />
                      </span>
                      Receber em casa
                      {/* Versão DESK */}
                      {tabTipoEnvio == "Receber em casa" ? (
                        <i className={styles.boxTabCheck}>
                          <MarkIconShow myClass={"checkNormal"} />
                        </i>
                      ) : (
                        <div></div>
                      )}
                    </h2>
                  </div>

                  <div
                    className={`${styles.boxTab} ${tabTipoEnvio === "Retirar na loja" ? styles.active : ""
                      }`}
                    onClick={() => tabTipoEnvioClick("Retirar na loja")}
                  >
                    <h2
                      onClick={() => setarRetirada()}
                      className={`${styles.boxTabTitle} tabSelect2`}
                    >
                      <span className={styles.titleIcon}>
                        <EntregueIcon fill={true} />
                      </span>
                      Retire em nossa loja
                      {tabTipoEnvio == "Retirar na loja" ? (
                        <i className={styles.boxTabCheck}>
                          <MarkIconShow myClass={"checkNormal"} />
                        </i>
                      ) : (
                        <div></div>
                      )}
                    </h2>
                  </div>
                </header>

                <div className={`${styles.boxBody}`}>
                  <div
                    className={`${styles.contentBox}  ${tabTipoEnvio !== "Receber em casa" ? styles.hide : ""
                      }`}
                    id={styles.enderecos}
                  >
                    <div className={`${styles.boxTabTitle} tabSelect2`}>
                      <div className={styles.contentBoxIcon}>
                        <EnderecoIcon />
                      </div>
                      Endereço da entrega
                    </div>

                    <div className={styles.contentBoxContainer}>
                      <div className={styles.contentBoxList}>
                        <div
                          className={`${styles.contentBoxItem} ${showAlerts && !alertEndereco ? "alertBorderRed" : ""
                            } ${enderecoPreferido ? "ativado" : ""}`}
                        >
                          {enderecoPreferido &&
                            enderecoPreferido?.name != undefined ? (
                            <div>
                              <div className={`${styles.enderecoContent}`}>
                                <b>{enderecoPreferido?.name}</b>
                                <br />
                                {enderecoPreferido?.endereco} <hr />
                                CEP: {cep}
                              </div>
                            </div>
                          ) : (
                            <div className={styles.enderecoContent}>
                              <div className={styles.form}>
                                <InputText
                                  onchange={guardaCep}
                                  label="CEP"
                                  onKeyUp={cepMask}
                                  id="CEP"
                                  defaultValue={cep}
                                  inputMode={"numeric"}
                                  className={` ${verificaSTEP(1) ? "" : "classError"
                                    }`}
                                  focar={false}
                                />
                                {isMyArea(String(cep)) ? (
                                  <div className="oculta"></div>
                                ) : (
                                  <p className="colorRed">
                                    * Desculpe, não entregamos no cep informado!
                                  </p>
                                )}
                                <InputText
                                  onchange={guardaEndereco}
                                  label="Endereço"
                                  id="endereco"
                                  defaultValue={endereco}
                                  focar={false}
                                />
                                {endereco != "" ? (
                                  <div className="oculta"></div>
                                ) : (
                                  <p className="colorRed">
                                    * Preenchimento obrigatório!
                                  </p>
                                )}

                                <InputText
                                  defaultValue={bairro}
                                  onchange={guardaBairro}
                                  label="Bairro"
                                  id="bairro"
                                  focar={false}
                                  className={`${verificaSTEP(1) ? "" : "classError"
                                    }`}
                                />
                                <InputText
                                  defaultValue={cidade}
                                  onchange={guardaCidade}
                                  label="Cidade"
                                  id="cidade"
                                  focar={false}
                                  list={"cities"}
                                  className={`${verificaSTEP(1) ? "" : "classError"
                                    }`}
                                />

                                <InputText
                                  defaultValue={estado}
                                  onchange={guardaEstado}
                                  label="Estado"
                                  focar={false}
                                  id="estado"
                                />
                                <InputText
                                  focar={false}
                                  defaultValue={numero?.replace(/ /g, "")}
                                  onchange={guardaNumero}
                                  label="Número"
                                  type="text"
                                  inputMode={"numeric"}
                                  id="numero"
                                />
                                <InputText
                                  focar={false}
                                  onchange={guardaComplemento}
                                  onBlur={guardaComplementoBlur}
                                  label="Complemento"
                                  id="complemento"
                                  maxLenght={20}
                                  defaultValue={complemento}
                                />
                                {msgFeedback.indexOf("não encontrado") > -1 ? (
                                  <div
                                    style={{ color: "red" }}
                                    className="danger"
                                  >
                                    {msgFeedback}
                                  </div>
                                ) : (
                                  <div
                                    style={{ color: "red" }}
                                    className={styles.enderecoMensagem}
                                  >
                                    {msgFeedback}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {enderecoPreferido ? (
                            <MarkIconShow myClass={"check22"} />
                          ) : (
                            <div className="oculta"></div>
                          )}
                        </div>
                      </div>

                      <div
                        onClick={() => setEnderecoPreferido(null)}
                        className={styles.alterarEndereco}
                      >
                        Alterar Endereço
                        <br />
                      </div>

                      {/* <div
                            onClick={() =>
                              setLocalEntrega(`${complemento},${numero},${bairro},${cidade},${cep}`)
                            }
                            className={styles.enderecoMensagem}
                          >
                            Entregar neste endereço
                          </div> */}
                    </div>
                  </div>

                  <div
                    className={`${styles.contentBox}  ${tabTipoEnvio !== "Retirar na loja" ? styles.hide : ""
                      }`}
                    id={styles.lojas}
                  >
                    <h3 className={styles.contentBoxTitle}>
                      <div className={styles.contentBoxIcon}>
                        <EnderecoIcon />
                      </div>
                      Onde deseja retirar?
                    </h3>

                    <div className={styles.contentBoxContainer}>
                      <h3 className={styles.contentBoxSubtitle}>
                        Listamos as lojas que possuem os itens do seu carrinho
                        .....
                      </h3>

                      <div
                        className={`${styles.contentBoxList} ${showAlerts && !alertEndereco ? "alertBorderRed" : ""
                          } `}
                      >
                        {minhasLojas.map((aff: any) => (
                          <div
                            key={aff.id}
                            className={`${styles2.loja}  ondeRetirar ativado`}
                          >
                            <div className={`${styles2.thumbnail} oculta`}>
                              <SmartImage
                                src={aff.photo}
                                width={110}
                                height={90} objectFit={"contain"} layout={"responsive"}  ></SmartImage>
                            </div>
                            <MarkIconShow myClass={"check44"} />

                            <div className={`${styles2.contentBox}`}>
                              <div className={styles2.content}>
                                <h5 className={styles2.nome}>{aff.name}</h5>

                                <div className={styles2.endereco}>
                                  {aff.address}
                                  <br />
                                  Tel: {aff.telephone}
                                </div>
                              </div>

                              <button
                                /* onClick={() => setLocalRetirada(aff)} */
                                className={`${styles2.button}  oculta`}
                              >
                                Retirar aqui
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.contentBox} id={styles.dates}>
                    {metodo == "entrega" ? (
                      <div>
                        <div className={styles.contentBoxTitle}>
                          <div className={styles.contentBoxIcon}>
                            <DataIcon />
                          </div>
                          Data da entrega
                        </div>
                        <div className={styles.contentBoxContainer}>
                          <div className={`${styles.contentBoxList}`}>
                            {meusMetodos &&
                              meusMetodos.map(
                                (met: MetodoEntrega, index) =>
                                  met.ativo &&
                                  verifyCEP_in_RANGE(
                                    met.localidade_exclui_ceps
                                  ) && (
                                    <div
                                      onClick={updateMetodoEntrega(met)}
                                      key={index}
                                      className={`metodoEntregaCard ${meusMetodos.length === 1
                                        ? "ativado"
                                        : ""
                                        } ${styles.contentBoxItem} ${metodoEscolhido == met.descricao
                                          ? "activeFull ativado"
                                          : "ativado"
                                        } ${showAlerts && !alertDataEntrega
                                          ? "alertBorderRed"
                                          : ""
                                        } comoRetirar`}
                                    >
                                      <div className={`dateCardMetodo`}>
                                        <div>
                                          <div>{met.descricao}</div>
                                          <br />
                                          <div className={styles.col_esquerda}>
                                            {met.entrega_padrao_tempo} <br />
                                            <span className={styles.horario}>
                                              {met.entrega_padrao_periodo}
                                            </span>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className={styles.price}>
                                          R${" "}
                                          {String(met.valor_fixo).replace(
                                            ".",
                                            ","
                                          )}
                                        </div>
                                      </div>
                                      {metodoEscolhido == met.descricao ||
                                        meusMetodos.length === 1 ? (
                                        <MarkIconShow myClass={"check33-2"} />
                                      ) : (
                                        <div></div>
                                      )}
                                    </div>
                                  )
                              )}
                          </div>

                          <div className={styles.adicionarComentario}>
                            <input
                              type="text"
                              onChange={onkeydown}
                              placeholder="Adicione um comentário para o separador"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={styles.contentBoxTitle}>
                          <div className={styles.contentBoxIcon}>
                            <DataIcon />
                          </div>
                          Data da retirada
                        </div>

                        <div className={styles.contentBoxContainer}>
                          <div
                            key={Math.random()}
                            className={`${styles.contentBoxList}`}
                          >
                            {retirada_valor_fixo == 1 ? (
                              <div
                                onClick={() => setaValorTotal(retirada_valor)}
                                key={Math.random()}
                                className={`${styles.contentBoxItem}  ativado`}
                              >
                                <div className={styles.date}>
                                  <div className={styles.top}>
                                    <div className={styles.col_direita}>
                                      {retirada_descricao}
                                    </div>
                                    <br />
                                    <div className={styles.col_esquerda}>
                                      {retirada_padrao_periodo} <br />
                                      <span className={styles.horario}>
                                        {retirada_padrao_tempo}
                                      </span>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className={styles.price}>
                                    R$ {retirada_valor}
                                  </div>
                                </div>
                                <MarkIconShow myClass={"check33"} />
                              </div>
                            ) : (
                              <div
                                onClick={() => setaValorTotal(0)}
                                key={Math.random()}
                                className={`${styles.contentBoxItem} ativado`}
                              >
                                <div className={styles.date}>
                                  <div className={styles.top}>
                                    <div className={styles.col_direita}></div>
                                    <br />
                                    <div className={styles.col_esquerda}>
                                      {retirada_padrao_tempo} <br />
                                      <span className={styles.horario}>
                                        {retirada_padrao_periodo}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <MarkIconShow myClass={"check33"} />
                              </div>
                            )}
                          </div>
                          <div className={styles.adicionarComentario}>
                            <input
                              type="text"
                              placeholder="Adicione um comentário para o separador"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${styles.box} ${styles.boxFormaDePagamento} ${styles.boxDesktop}`}
              >
                <header>
                  <div
                    className={`${styles.boxTab} ${formaDePagamento === "Pague na entrega"
                      ? styles.active
                      : ""
                      }`}
                    onClick={() => tabFormaDePagamentoClick("Pague na entrega")}
                  >
                    <h2 className={`${styles.boxTabTitle} tabSelect`}>
                      <span className={styles.titleIcon}>
                        <PagueEntregaIcon />
                      </span>
                      Pague na entrega
                      <i className={styles.boxTabCheck}>
                        <MarkIconShow myClass={"checkNormal"} />
                      </i>
                    </h2>
                  </div>

                  <div
                    className={`ocultar ${styles.boxTab} ${formaDePagamento === "Pagar pelo site"
                      ? styles.active
                      : ""
                      }`}
                    onClick={() => tabFormaDePagamentoClick("Pagar pelo site")}
                  >
                    <h2 className={`${styles.boxTabTitle} tabSelect`}>
                      <span className={styles.titleIcon}>
                        <PagueSiteIcon />
                      </span>
                      Pagar pelo site
                      <i className={styles.boxTabCheck}>
                        <MarkIcon fill="absolute" />
                      </i>
                    </h2>
                  </div>
                </header>

                <div className={styles.boxBody}>
                  <div
                    className={`${styles.contentBox} ${formaDePagamento !== "Pague na entrega" ? styles.hide : ""
                      }`}
                    id={styles.formaDePagamento}
                  >
                    <p>Selecione a forma de pagamento</p>

                    <div className={styles.contentBoxList}>
                      {payments.map(({ icon, title }) => (
                        <div
                          key={Math.random()}
                          onClick={() => setPagamento(title)}
                          className={`${styles.contentBoxItem
                            } metodoPagamento ${metodoPagamento == title ? "ativado" : ""
                            } `}
                        >
                          <div className={styles.itemImg}>{icon}</div>

                          <div className={styles.itemTitle}>{title}</div>
                          {metodoPagamento == title ? (
                            <i>
                              <MarkIconShow myClass={"check11"} />
                            </i>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`${styles.contentBox} ${formaDePagamento !== "Pagar pelo site" ? styles.hide : ""
                      }`}
                    id={styles.formaDePagamento}
                  >
                    <p className="oculta">cartões de crédito: </p>

                    <div className={`${styles.formCartao} oculta`}>
                      <div className="row">
                        <div className="col-12 mb-5">
                          <InputText
                            defaultValue={card.number}
                            onchange={handleChangeCard("number")}
                            label="Número do cartão"
                            id="numero_cartao"
                            className="w-100"
                            focar={false}
                          />
                        </div>

                        <div className="col-12 col-lg-6 mb-5">
                          <InputText
                            defaultValue={card.validity}
                            onchange={handleChangeCard("number")}
                            label="Validade (mm/aaaa)"
                            id="validade_cartao"
                            className="w-100"
                            focar={false}
                          />
                        </div>
                        <div className="col-12 col-lg-6 mb-5">
                          <InputText
                            defaultValue={card.cvv}
                            onchange={handleChangeCard("cv.cvv")}
                            label="CVV"
                            id="cvv_cartao"
                            className="w-100"
                            focar={false}
                          />
                        </div>

                        <div className="col-12 mb-5">
                          <InputText
                            defaultValue={card.name}
                            onchange={handleChangeCard("name")}
                            label="Nome impresso no cartão"
                            id="nome_cartao"
                            focar={false}
                            className="w-100"
                          />
                        </div>

                        <div className="col-12">
                          <InputText
                            defaultValue={card.cpf}
                            onchange={handleChangeCard("cpf")}
                            label="CPF"
                            id="cpf_cartao"
                            onKeyUp={cpfMask}
                            className="w-100"
                            type="number"
                            focar={false}
                          />
                        </div>
                      </div>
                    </div>

                    <PIXCard
                      show={shoPixQr}
                      valorTotal={valorTotal}
                      valorFrete={valorEntrega}
                      setPaymentData={setPaymentDataReturn}
                      buyer={{
                        name,
                        email,
                        phone: telefone,
                        cpf_cnpj: cpf,
                      }}
                      items={shipayItems}
                    />
                  </div>
                </div>
              </div>

              <div className={`${styles.notaFiscal}  ${styles.boxDesktop}`}>
                <p className={styles.cpf}>Quer o CPF/CNPJ na nota fiscal?</p>
                <InputText
                  defaultValue={cpf}
                  onchange={handleChangeCPFNF}
                  label="Insira seu CPF ou CPNJ"
                  id="cpf"
                  onKeyUp={cpfMask}
                  focar={false}
                  className={`w-100 ${verificaSTEP(1) ? "" : "classError"}`}
                />
              </div>
              {verificaSTEP(1) == true &&
                verificaSTEP(2) == true &&
                verificaSTEP(3) == true ? (
                <Button
                  onClick={fechandoPedido}
                  className={`${styles.submit} ${styles.boxDesktop}`}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="oculta"></div>
                  )}
                  Fazer Pedido
                </Button>
              ) : (
                <Button
                  className={`${styles.submit} ${styles.boxDesktop} ${orderIsReady ? "" : "opacity05"
                    }`}
                >
                  Fazer Pedido
                </Button>
              )}
            </div>
            <div className={`${styles.boxDesktop} col-12 col-lg-5 `}>
              <div className={styles.boxResumoPedido}>
                <div className={styles.containerInner}>
                  <h2 className={styles.resumoTitle}>Resumo do pedido</h2>
                </div>

                <div className={styles.containerList}>
                  <CheckoutList
                    increase={increase}
                    decrease={decrease}
                    remove={remove}
                    products={produtos}
                  />
                </div>

                <div className={styles.containerInner}>
                  <div className={styles.cupom}>
                    <div className={styles.cupomIcon}>
                      <CupomIcon2 />
                    </div>

                    <input
                      className={styles.cupomInput}
                      type="text"
                      onKeyUp={verifyCupomCode}
                      placeholder="Adicione um cupom de desconto"
                    />
                  </div>
                </div>

                <div className={styles.calculator}>
                  {valorCupom && valorCupom > 0 ? (
                    <div className={styles.calculatorItem}>
                      <div className={styles.key}>Cupom de desconto</div>

                      <div className={styles.value}>
                        - R$ {Number(valorCupom).toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                  ) : (
                    <div className="oculta"></div>
                  )}
                  <div className={styles.calculatorItem}>
                    <div className={styles.key}>Subtotal</div>

                    <div className={styles.value}>
                      R$ {Number(valorPedido).toFixed(2).replace(".", ",")}
                    </div>
                  </div>

                  <div className={styles.calculatorItem}>
                    <div className={styles.key}>Entrega {metodoEscolhido}</div>

                    <div className={styles.value}>
                      R$ {Number(valorEntrega).toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                  <div className={styles.calculatorItem}>
                    <div className={styles.key}>Descontos</div>

                    <div className={styles.value}>
                      - R$ {Number(valorDescontos).toFixed(2).replace(".", ",")}
                    </div>
                  </div>

                  <div className={`${styles.calculatorItem} ${styles.total}`}>
                    <div className={styles.key}>Total</div>

                    <div className={styles.value}>
                      R$ {Number(valorTotal).toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {step == 3 && (
              <div className="col-12 col-lg-5  d-lg-none">
                <div className={styles.boxResumoPedido}>
                  <div className={styles.containerInner}>
                    <div className={styles.cupom}>
                      <div className={styles.cupomIcon}>
                        <CupomIcon2 />
                      </div>

                      <input
                        className={styles.cupomInput}
                        type="text"
                        onKeyUp={verifyCupomCode}
                        placeholder="Adicione um cupom de desconto"
                      />
                    </div>
                  </div>

                  <div className={styles.calculator}>
                    {valorCupom && valorCupom > 0 ? (
                      <div className={styles.calculatorItem}>
                        <div className={styles.key}>Cupom de desconto</div>

                        <div className={styles.value}>
                          - R$ {Number(valorCupom).toFixed(2).replace(".", ",")}
                        </div>
                      </div>
                    ) : (
                      <div className="oculta"></div>
                    )}
                    <div className={styles.calculatorItem}>
                      <div className={styles.key}>Subtotal</div>

                      <div className={styles.value}>
                        R$ {Number(valorPedido).toFixed(2).replace(".", ",")}
                      </div>
                    </div>

                    <div className={styles.calculatorItem}>
                      <div className={styles.key}>
                        Entrega {metodoEscolhido}
                      </div>

                      <div className={styles.value}>
                        R$ {Number(valorEntrega).toFixed(2).replace(".", ",")}
                      </div>
                    </div>

                    <div className={styles.calculatorItem}>
                      <div className={styles.key}>Descontos</div>

                      <div className={styles.value}>
                        - R${" "}
                        {Number(valorDescontos).toFixed(2).replace(".", ",")}
                      </div>
                    </div>

                    <div className={`${styles.calculatorItem} ${styles.total}`}>
                      <div className={styles.key}>Total</div>

                      <div className={styles.value}>
                        R$ {Number(valorTotal).toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.containerInner} mt-5`}>
                    <h2 className={styles.resumoTitle}>Resumo do pedido</h2>
                  </div>

                  <div className={styles.containerList}>
                    <CheckoutList
                      increase={increase}
                      decrease={decrease}
                      remove={remove}
                      products={produtos}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.footerDesktop}>
        <Footer />
      </div>

      <div className={styles.footerMobile}>
        {step == 1 ? (
          <div className="container px-0">
            <div className={`${styles.calculatorItem} ${styles.total} oculta`}>
              <div className={styles.key}>Total com a entrega</div>

              <div className={styles.value}>
                R$ {Number(valorTotal).toFixed(2).replace(".", ",")}
              </div>
            </div>
            {verificaSTEP(1) == true ? (
              <div
                onClick={() => setStep(step + 1)}
                className={styles.footerMobileContinuar}
              >
                <h3 className={styles.footerContinuarTexto}>Continuar</h3>
              </div>
            ) : (
              <div className={`${styles.footerMobileContinuar} opacity05`}>
                <h3 className={styles.footerContinuarTexto}>Continuar</h3>
              </div>
            )}
          </div>
        ) : step == 2 ? (
          <div className="container px-0">
            <div className={`${styles.calculatorItem} ${styles.total} oculta`}>
              <div className={styles.key}>Total com a entrega</div>

              <div className={styles.value}>
                R$ {Number(valorTotal).toFixed(2).replace(".", ",")}
              </div>
            </div>

            {verificaSTEP(2) == true ? (
              <div
                onClick={() => setStep(step + 1)}
                className={styles.footerMobileContinuar}
              >
                <h3 className={styles.footerContinuarTexto}>Continuar</h3>
              </div>
            ) : (
              <div className={`${styles.footerMobileContinuar} opacity05`}>
                <h3 className={styles.footerContinuarTexto}>Continuar</h3>
              </div>
            )}
          </div>
        ) : step == 3 ? (
          <div className="container px-0">
            <div className={`${styles.calculatorItem} ${styles.total}`}>
              <div className={styles.key}>Total com a entrega</div>

              <div className={styles.value}>
                R$ {Number(valorTotal).toFixed(2).replace(".", ",")}
              </div>
            </div>
            {verificaSTEP(1) == true &&
              verificaSTEP(2) == true &&
              verificaSTEP(3) == true ? (
              <div
                onClick={fechandoPedido}
                className={styles.footerMobileContinuar}
              >
                <h3 className={`${styles.footerContinuarTexto} `}>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="oculta"></div>
                  )}
                  Fazer Pedido
                </h3>
              </div>
            ) : (
              <div className={styles.footerMobileContinuar}>
                <h3
                  className={`${styles.footerContinuarTexto} ${orderIsReady ? "" : "opacity05"
                    }`}
                >
                  Fazer Pedido
                </h3>
              </div>
            )}
          </div>
        ) : (
          <div className="container px-0">
            <div
              onClick={() => setStep(0)}
              className={styles.footerMobileContinuar}
            >
              <h3 className={styles.footerContinuarTexto}>Continuar</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
