import * as React from "react";
import Image from "next/image";

import ProductCardList from "@components/Products/ProductCardList";
import { Product } from "@models/Product";

import productCardStyle from "@styles/components/ProductCard.module.css";
import FavoriteIcon from "@assets/icons/FavoriteIcon";
import WishlistIcon from "@assets/icons/WishlistIcon";
import CartIcon from "@assets/icons/CartIcon";

import { Product2, PRODUTO_FINAL } from "@models/Product2";

import { Nutrition } from "@models/Nutrition";
import { Foto } from "@models/Foto";
import ProductCardListInner from "@components/Products/ProductCardListInner";
import WheightIcon from "@assets/icons/WheightIcon";
import UnityIcon from "@assets/icons/UnityIcon";
import image from "next/image";
import { useProductInformation } from "src/hooks/useProductInformation";
import { useRef, useState } from "react";
import { Api } from "src/providers";
import ArrowDown from "@assets/icons/ArrowDown";
import CartIconB from "@assets/icons/CartIconB";
import { ajustStrigfy, FULL_PRICES, setProductToList } from "@models/masks";
import ReactDOM from "react-dom";
import LoadingSpinnerG from "@components/SpinnerG";
import SmartImage from "@components/SmartImage";
import { AppContext } from "src/pages/_app";

interface ModalProductProps {
  productDetails: Product2[];
  productRelacteds?: Product2[];
  increase: any;
  decrease: any;
  isLoading: boolean
  totalCarrinho: any;
  detail: any;
  changeProductCode: any;
  handleAdd2: any;
  onCloseClick?: any;
}




export default function ModalProduct(props: ModalProductProps) {
  const {
    showLists,
    setShowLists,
    produtoLista,
    setProdutoLista
  } = React.useContext(AppContext);

  async function mudaLists(produto: Product2) {
    //  console.log('alterando show')
    await setShowLists(true)
    await setProdutoLista(produto)
    //   console.log('resultado', showLists)
  }


  const [quantidade, setQuantidade] = React.useState<number>(0);
  const [prd_code, setPrdCode] = React.useState<number>(0);
  const [medida, setMedida] = React.useState<string | any>("un");
  const [caracteristica, setCaracteristica] = React.useState<string | any>("");
  const [produto, setProduto] = React.useState<Product2[]>([]);
  const [relateds, setProductsRelateds] = React.useState<Product2[]>([]);
  const [imageShow, setImageShow] = React.useState<string>("");
  const [nutrition, setNutrition] = React.useState([]);
  const [affiliateID, setAffiliateID] = useState<number>(0);
  const [productCode, setProductCode] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true);

  const [produtoFinal, setProdutoFinal] = useState<PRODUTO_FINAL>()

  function alteraIMG(fotos: string) {
    let thisImage: string = fotos
      ? fotos
      : "https://loja.api-smartcomerci.com.br/" + fotos;
    if (thisImage.indexOf("http") > -1) {
    } else {
      thisImage = "https://loja.api-smartcomerci.com.br/" + fotos;
    }
    setImageShow(thisImage);


  }

  function setProduct() {

    window.scrollTo(0, 0)

  }

  function alteraMedida() {
    if (medida == "un") {
      setMedida("kg");
    } else {
      setMedida("un");
    }
  }
  function mudaCaracteristica(name: string) {
    setCaracteristica(name);

    props.detail(prd_code, "caracteristica", name);
  }

  function myIncrease(prd_code: number, prd: Product2) {

    setQuantidade(quantidade + 1);
    props.increase(prd_code, prd);
  }
  function myDecrease(prd_code: number, prd: any) {

    let n = quantidade - 1;
    if (n < 0) {
      n = 0;
    }
    setQuantidade(n);
    props.decrease(prd_code, prd);
  }

  React.useEffect(() => {
    for (const k in props.productDetails) {
      setPrdCode(props.productDetails[k].product_code);
      setProductCode(props.productDetails[k].product_code);
      setQuantidade(props.totalCarrinho(props.productDetails[k].product_code));
    }



    let imgS =
      "https://loja.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";
    imgS = props.productDetails[0]?.product_thumbnail
      ? props.productDetails[0]?.product_thumbnail
      : "https://loja.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";
    setImageShow(imgS);

    let N = "";
    for (const a in props.productDetails) {
      N = props.productDetails[a].product_site_nutrition;
      if (N != "" && N != undefined && N != null && N != "null") {
        try {

          setNutrition(JSON.parse(ajustStrigfy(N)));
        } catch (e) {

        }
      }
    }



  }, [props.productDetails]);

  React.useEffect(() => {

    sessionStorage.setItem("PRD_MODAL", JSON.stringify(produto))

    setProduto(props.productDetails);
  }, [productCode]);

  const [minimoParaDesconto, setMinimo] = useState<number>(1)

  React.useEffect(() => {

    let imgS =
      "https://loja.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";
    imgS = produto[0]?.product_thumbnail
      ? produto[0]?.product_thumbnail
      : "https://loja.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";
    setImageShow(imgS);

    let PRODUTO: Product2 = {
      id: 0,
      product_affiliate_id: 0,
      product_code: 0,
      product_ean: "",
      uploadImages: "",
      product_descricao: "",
      product_valor: 0,
      product_categoria: "",
      product_fabricacao: "",
      product_status: "",
      product_estoque: "",
      product_medida: "",
      product_etiquetas: "",
      product_thumbnail: "",
      product_site_tags: "",
      product_site_name: "",
      product_site_description: "",
      product_site_categories: "",
      product_site_variations: "",
      product_site_info: "",
      product_site_nutrition: "",
      product_site_value: 0,
      product_site_discount_value: "",
      product_site_discount_type: "",
      product_sell_by_weight: "",
      product_average_weight_value: "",
      product_average_weight_type: "",
      product_site_related_title: "",
      product_site_related_type: "",
      product_site_related_code: ""
    }
    for (const k in produto) {
      PRODUTO = produto[k]
      setProdutoFinal(FULL_PRICES(produto[k]))
    }

    //console.log("o produto => ",props, nutrition,produto) 
    if (props.productRelacteds) {
      //console.log('sou PRD2 ',props.productRelacteds)
    } else {
      props.productRelacteds = []
    }

    setIsLoading(props.isLoading)



  }, [produto]);
  React.useEffect(() => {

  }, [imageShow]);

  React.useEffect(() => {


    window.scrollTo(0, 0);
  }, [quantidade]);

  React.useEffect(() => {
    //console.log("loading => ", isLoading)


  }, [isLoading])

  React.useEffect(() => {
    //console.log("props.isLoading => ", props.isLoading)
    setIsLoading(props.isLoading)

  }, [props.isLoading])



  React.useEffect(() => {
    // console.log("o produto final => ", produtoFinal)


  }, [produtoFinal])


  function caseA(text: string) {
    var list = text.split(" "),
      newText = "";
    for (const k in list) {
      var word = list[k].split(""),
        counter = 0,
        newWord = "";
      for (const u in word) {
        if (counter === 0) {
          if (word[u] != "") {
            newWord += word[u].toUpperCase();
          }
        } else {
          newWord += word[u].toLowerCase();
        }
        counter++;
      }
      newText += newWord + " ";
    }
    return newText;
  }
  async function changeProduct(product_coded: number) {
    setIsLoading(true)
    props.handleAdd2(product_coded)
    SCROLL_TOP()
    window.document.getElementById('scrollTop')?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    localStorage.setItem("LAST_PRODUCT_CODE", product_coded.toString());
    var AFFILIATE_ID = process.env.AFFILIATE_ID;
    var AFF_ID: number = Number(process.env.AFFILIATE_ID);
    if (AFFILIATE_ID != null) {
      AFF_ID = Number(AFFILIATE_ID);
    }
    setProductCode(product_coded);
    await Api.post("/getProductInformation", {
      affiliate_id: AFF_ID,
      product_code: product_coded,
    })
      .then((response) => {
        console.log('resposta getProductInformation', response)
        setProduto(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setIsLoading(false)
      });
  }

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {

    event.currentTarget.src = 'https://admin.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg';
    event.currentTarget.srcset = 'https://admin.api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg';
    event.preventDefault();
    event.stopPropagation();
    //event.currentTarget.className = "error";
  };

  function SCROLL_TOP() {
    const node = messagesEndRef.current
    const executeScroll = () => node?.scrollIntoView();
    executeScroll();
  }

  React.useEffect(() => {
    ////console.log('mudando produto e quantidade', quantidade, produtoFinal)
    SCROLL_TOP()



  }, [props.totalCarrinho])

  function getQtd(qtd: number, weight: number) {
    return (qtd * weight)
  }

  async function MY_RELATEDS_DEFAULT(product_code: number, category: string) {
    let myRelateds: number[] = []
    await Api.post('/getRealatedsDefault', { affiliate_id: process.env.AFFILIATE_ID, category: category, product_code: product_code }).then(response => {
      //  console.log(response)
      for (const k in response.data) {
        myRelateds.push(response.data[k].product_code)
      }
      getRelacteds(myRelateds)

    }).catch(err => {
      // console.log('caiu no erro', err)
    })



  }
  type compraPeso = {
    compraPorPeso: boolean,
    mostrarPeso: boolean
  }
  const [imagens, setImagens] = useState<string[]>([])
  const [pesos, setPesos] = useState<compraPeso>({
    compraPorPeso: false,
    mostrarPeso: false
  })

  async function getRelacteds(listaIds: number[]) {
    await Api.post('/listaIds', { product_list_ids: listaIds, affiliate_id: process.env.AFFILIATE_ID }).then(response => {
      let listaProdutos = response.data
      setProductsRelateds(listaProdutos)
    }).catch(err => {
      //console.log('errr',err)
    })
  }

  React.useEffect
    (() => {
      const feth = async () => {
        await MY_RELATEDS_DEFAULT(produto[0].product_code, produto[0].product_categoria)
      }
      if (produto && produto.length > 0) {
        try {
          let img: string[] = JSON.parse(
            ajustStrigfy(produto[0].uploadImages.trim())
          )
          if (img) {
            setImagens(img)
          }

        } catch (erro) { }
        try {
          let pso: compraPeso = JSON.parse(
            ajustStrigfy(produto[0].product_sell_by_weight)
          )
          if (pso) {
            setPesos(pso)
          }

        } catch (erro) { }
        let nbr: number[] = []
        try {
          nbr = JSON.parse(
            ajustStrigfy(produto[0].product_site_related_code.trim())
          )

        } catch (erro) { }

        if (nbr && nbr.length > 0) {
          getRelacteds(nbr)
        } else {
          feth().catch(err => {
            // console.log(err)
          })
        }


      }
    }, [produto])




  function fecharModal() {
    // console.log('adicionando floow')
    document.body.style.overflow = "auto"
    props.onCloseClick()
  }





  return (

    isLoading ? <LoadingSpinnerG style={
      { marginTop: '25px', marginLeft: 'calc(50% - 30px)', maxWidth: '60px' }
    } /> :

      <div ref={messagesEndRef} className="modal-product">

        <section ref={messagesEndRef} id="scrollTop" className="section-main">
          <div className="modal-container container">
            <div className="product-header">
              <div className="row">
                <div className="col-12 col-lg-7">
                  <button

                    onClick={fecharModal}
                    className="d-lg-none btnCloseModalProduct"
                  >
                    <ArrowDown />
                  </button>
                  <div className="col-thumb">
                    <aside className="aside">
                      <div className="aside-header">
                        {isLoading === false && Array.from(produto)?.map((prd, index) =>
                          prd.product_site_tags ? (
                            <div
                              key={index}
                              onClick={() =>
                                location.replace(
                                  "../busca?" +
                                  prd.product_site_tags.split(",")[0]
                                )
                              }
                              className="aside-button category"
                            >
                              <FavoriteIcon />
                              <div key={prd.id}>
                                {prd.product_site_tags.split(",")[0]}
                              </div>
                            </div>
                          ) : (
                            <div key={Math.random()}></div>
                          )
                        )}

                        <div onClick={() => mudaLists(produto[0])} className="aside-button add-to-wishlist boxDesktop">
                          <WishlistIcon />
                          Adicionar à lista
                        </div>
                      </div>

                      <div className="gallery  hide-mobile">
                        {isLoading === false && Array.from(produto)?.map((prd) => (
                          <div key={prd.id}>
                            {imagens ? (
                              imagens.map(
                                (fotos: string, index) =>
                                  imageShow ==
                                    "https://loja.api-smartcomerci.com.br/" +
                                    fotos || imageShow == fotos ? (
                                    <div
                                      onClick={() => alteraIMG(fotos)}
                                      key={index}
                                      className="boxImg boxImgActive"
                                    >

                                      <SmartImage
                                        key={Math.random()}
                                        className="boxFoto"
                                        onError={imageOnErrorHandler}
                                        src={"https://loja.api-smartcomerci.com.br/" + fotos}
                                        layout="fill"
                                        objectFit="contain"
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => alteraIMG(fotos)}
                                      key={Math.random()}
                                      className="boxImg"
                                    >


                                      <SmartImage
                                        className="boxFoto"
                                        onError={imageOnErrorHandler}
                                        src={"https://loja.api-smartcomerci.com.br/" + fotos}
                                        layout="fill"
                                        objectFit="contain"
                                      />
                                    </div>
                                  )
                              )
                            ) : (
                              <div key={Math.random()}></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </aside>

                    <div className="product-thumbnail">
                      <div className="boxImg">
                        {isLoading === false && Array.from(produto)?.map((prd) => (
                          <SmartImage
                            key={prd.id}
                            onError={imageOnErrorHandler}
                            src={imageShow}
                            layout="fill"
                            objectFit="contain"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5">
                  <div className="product-details">
                    <div className="product-type">
                      {/*Array.from(produto)?.map((prd) =>  
                          <div key={prd.id}>{prd.product_fabricacao}</div>
                      )*/}
                    </div>
                    <h3 className="product-name">
                      {isLoading === false && produto ? (
                        Array.from(produto)?.map((prd) => (
                          <div key={prd.id}>{caseA(prd.product_site_name)}</div>
                        ))
                      ) : (
                        <div key={Math.random()}></div>
                      )}
                    </h3>
                    <div className="amount">
                      {isLoading === false && Array.from(produto)?.map((prd) => (
                        <div key={prd.id}>
                          {prd.product_average_weight_value ? (
                            <div>
                              1 unidade - aproximadamente{" "}
                              {produtoFinal?.produto.product_average_weight_value}{" "}
                              {produtoFinal?.produto.product_average_weight_type}
                            </div>
                          ) : (
                            <div key={Math.random()}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="rating">★★★★★</div>

                    <div className="price">
                      {isLoading === false && Array.from(produto)?.map((prd) => (
                        <div key={prd.id}>
                          {" "}
                          {produtoFinal?.venda.existe_desconto && quantidade >= produtoFinal?.venda.minimo_para_desconto ? (

                            produtoFinal?.venda.preco_venda < prd.product_valor ? (
                              <div>
                                R${" "}
                                {
                                  produtoFinal?.venda.preco_venda?.toFixed(2).replace(".", ",")
                                }
                                <span className="original-price">
                                  R${" "}
                                  {

                                    produtoFinal?.venda.valor_bruto?.toFixed(2).replace(".", ",")

                                  }
                                </span>
                              </div>
                            ) : (
                              <div>
                                R${" "}
                                {
                                  prd.product_site_value && produtoFinal?.venda.venda_por_peso ?
                                    prd.product_site_value?.toFixed(2).replace(".", ",")
                                    :
                                    prd.product_valor?.toFixed(2).replace(".", ",")

                                }
                              </div>
                            )
                          ) : (
                            <div>
                              R$ {
                                prd.product_site_value && produtoFinal?.venda.venda_por_peso ?
                                  prd.product_site_value?.toFixed(2).replace(".", ",")
                                  :
                                  prd.product_valor?.toFixed(2).replace(".", ",")

                              }
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div onClick={() => mudaLists(produto[0])} className="aside-button add-to-wishlist noShowDesktop ">
                      <WishlistIcon />
                      Adicionar à lista
                    </div>
                    <br />
                    <br />

                    {isLoading === false && Array.from(produto)?.map((prd, index) =>
                      prd.product_site_variations ? (
                        <div key={index} className="boxForm">
                          <div key={Math.random()}>
                            <h4 className="form-title">
                              Como você gostaria de receber o  produto?
                            </h4>
                            <div className="form-list">
                              {
                                prd.product_site_variations?.split(',').map(str => (
                                  <div key={Math.random()}
                                    onClick={() => mudaCaracteristica("Verde")}
                                    className="form-button"
                                  >
                                    <input
                                      type="radio"
                                      name="product-status"
                                      id="verde"
                                      value="Verde"
                                    />
                                    <label htmlFor="verde">str</label>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={Math.random()}></div>
                      )
                    )}

                    <div className="boxQuantidade">
                      {isLoading === false && Array.from(produto)?.map((prd, index) =>
                        pesos.compraPorPeso == true ? (
                          medida == "un" ? (
                            <nav key={index} className="menu-quantidade">
                              <div
                                onClick={() => alteraMedida()}
                                className="menu-item active"
                              >
                                <UnityIcon /> Unidade
                              </div>
                              <div
                                onClick={() => alteraMedida()}
                                className="menu-item "
                              >
                                <WheightIcon /> Peso
                              </div>
                            </nav>
                          ) : (
                            <nav className="menu-quantidade">
                              <div
                                onClick={() => alteraMedida()}
                                className="menu-item "
                              >
                                <UnityIcon /> Unidade
                              </div>
                              <div
                                onClick={() => alteraMedida()}
                                className="menu-item active"
                              >
                                <WheightIcon /> Peso
                              </div>
                            </nav>
                          )
                        ) : (
                          <div key={Math.random()}></div>
                        )
                      )}


                      {isLoading === false && Array.from(produto)?.map((prd) => (


                        <div
                          key={Math.random()}
                          className={`${pesos.compraPorPeso == true
                            ? "box-input-quantidade"
                            : "box-input-quantidade no-border"
                            }`}
                        >

                          {quantidade < 1 ? (
                            <div className="selector">
                              <div
                                onClick={() =>
                                  myIncrease(prd.product_code, prd)
                                }

                                className={productCardStyle.footer4}
                              >
                                <CartIconB />
                                <span>Adicionar</span>
                              </div>
                            </div>
                          ) : (
                            <div className="selector">
                              <div className="input-box">
                                <div
                                  key={prd.id}
                                  onClick={() =>
                                    myDecrease(prd.product_code, undefined)
                                  }
                                  className="input-sinal input-minus"
                                ></div>
                              </div>

                              <div className="input-value">
                                <span className="value">{medida.toLowerCase() == "un"
                                  ? quantidade
                                  : isLoading === false && Array.from(produto)?.map(
                                    (prd) => getQtd(quantidade, Number(prd.product_average_weight_value))
                                  )}
                                </span>
                                <span className="sufix  input-box5">
                                  {medida.toLowerCase() == "un"
                                    ? ""
                                    : isLoading === false && Array.from(produto)?.map(
                                      (prd) => prd.product_average_weight_type
                                    )}
                                </span>
                              </div>

                              <div className="input-box">
                                {isLoading === false && Array.from(produto)?.map((prd) => (
                                  <div
                                    key={prd.id}
                                    onClick={() =>
                                      myIncrease(prd.product_code, prd)
                                    }
                                    className="input-sinal input-plus"
                                  ></div>
                                ))}
                              </div>

                            </div>
                          )}

                        </div>


                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {isLoading === false && Array.from(produto)?.map((prd) =>
                prd.product_site_description ? (
                  <div key={Math.random()} className="boxDescription">
                    <h3 className="title">Descrição</h3>
                    <div className="description">
                      <p key={prd.id}>{prd.product_site_description}</p>
                    </div>
                  </div>
                ) : (
                  <div key={Math.random()}></div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="section-related-products">
          <div className="container">
            <h3 className="title">
              Ótimas Combinações{" "}
              <span onClick={() => window.scrollTo(0, 0)} className="ver-todas  hide-mobile">ver todas</span>{" "}
            </h3>

            <ProductCardListInner
              relacteds={relateds}
              noCarrinho={props.totalCarrinho}
              addCart={props.increase}
              removeCart={props.decrease}
              handleAdd2={props.changeProductCode}
              handleAdd3={changeProduct}
              products2={relateds}
            />



          </div>
        </section>

        <section className="section-infos">
          <div className="container">
            <div className="boxProductInfos">
              {isLoading === false && Array.from(produto)?.map((prd, index) =>
                prd.product_site_info &&
                  prd.product_site_info != "" &&
                  prd.product_site_info.length > 0 ? (
                  <div key={index} className="boxAviso">
                    <div className="container-inner">
                      <div className="boxAviso-title">Informação Importante:</div>
                      <div className="boxAviso-content">
                        {prd.product_site_info}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={Math.random()}></div>
                )
              )}

              {isLoading === false && Array.from(produto)?.map((prd) =>
                prd.product_site_nutrition != null &&
                  prd.product_site_nutrition != "null" &&
                  prd.product_site_nutrition != undefined &&
                  prd.product_site_nutrition.length > 0 ? (
                  <div key={Math.random()} className="boxTabelaNutricional">
                    <h3 className="title">
                      <div key={prd.id}>
                        {prd.product_site_nutrition ? (
                          <div key={Math.random()}> Tabela Nutricional</div>
                        ) : (
                          <div key={Math.random()}></div>
                        )}
                      </div>
                    </h3>

                    {isLoading === false && Array.from(produto)?.map((prd) => (
                      <div key={prd.id} className="tabela">
                        {nutrition &&
                          nutrition.length > 0 ? (
                          nutrition?.map((nut: Nutrition) => (
                            <div key={Math.random()} className="coluna">
                              <div className="valor">{nut.quantidade}</div>
                              <div className="nome">{nut.titulo}</div>
                            </div>
                          ))
                        ) : (
                          <div key={Math.random()}></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={Math.random()}></div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
  );
}
