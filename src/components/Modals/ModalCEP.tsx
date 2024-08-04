import * as React from "react";
import Image from "next/image";
import { useState, useEffect } from 'react';
import ModalCEP from "@styles/components/modals/ModalCEP.module.css";
import ModalStyle from "@styles/components/modals/Modal.module.css";
import UserAddress from "@components/Checkout/UserAddress";
import { MetodoEntrega } from "@models/MetodoEntrega";
import { Affiliate } from "@models/Affiliate";
import { Horarios } from "@models/Horarios";
import { Api } from "@components/providers";
import { Enderecos } from "@models/Enderecos";
import { ajustStrigfy, isMyArea } from "@models/masks";
import MdCep from "./MdCep";
import InputText2 from "@components/Inputs/InputText2";
import SmartImage from "@components/SmartImage";

interface ModalCEPProps {
  modalActive?: Boolean;
  onCloseClick: any
  disableClickOut?: any;
}

export default function ModalCEP_VIEW(props: ModalCEPProps) {


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };



  function success(pos: any) {

    var crd = pos.coords;






    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${crd.latitude}&lon=${crd.longitude}&json`

    Api.get(url).then(result => {

      setZipCode(result.data.address.postcode)

      setFeedback(!isMyArea(result.data.address.postcode))
      getAddresByCEP(result.data.address.postcode)
    }).catch(err => {

    })
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  function not() {

  }
  function guardaCep3(e: any) {

    let valor: string = e.target.value

    localStorage.setItem("CEP_CLIENTE_SMART", valor)

    if (Number(valor.replace('-', ''))) {

      setFeedback(!isMyArea(valor))
      getAddresByCEP(valor)
    } else {

      getAddressesByText(valor)
    }








  }
  const [casaLoja, setCasaLoja] = React.useState<boolean>(false)
  const [minhasLojas, setMinhasLojas] = React.useState<Affiliate[]>([])
  const [zipCode, setZipCode] = useState<string>()
  const [cache, setCache] = useState<string>('')

  const [meusEnderecos, setMeusEnderecos] = React.useState<Enderecos[]>([])

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

  function getAddressesByText(text: string) {
    let array = text.split(' ');
    let ur1: string, url2: string;

    if (array.length > 0) {
      let word2 = array[0]



      if (array.length > 0) {
        ur1 = 'https://viacep.com.br/ws/SP/' + word2 + '/'
        for (const k in array) {

          if (array[k] != word2) {
            ur1 += array[k] + "+"
          }

        }
        ur1 += '&';
        ur1 = ur1.replace('+&', "");
        ur1 += '/json';

        let word1 = ""
        let ultimaPalavra = array[array.length - 1] != "" && array[array.length - 1] != " " ? array[array.length - 1] : array.length > 1 ? array[array.length - 2] : array[array.length - 1]
        for (let a = 0; a < array.length; a++) {

          if (array[a] != undefined && array[a] != ultimaPalavra) {
            word1 += array[a] + "+"
          }

        }

        url2 = 'https://viacep.com.br/ws/SP/' + ultimaPalavra + '/' + word1
        url2 += '&';
        url2 = url2.replace('+&', "");
        url2 += '/json';




        try {
          Api.get(ur1)
            .then((response) => {


              let adr: Enderecos[] = []
              for (const k in response.data) {
                adr.push({
                  "id": Number(response.data[k].cep.replace(/-/g, '')),
                  "endereco": response.data[k].logradouro + ', ' + response.data[k].localidade + ', ' + response.data[k].bairro + ', ' + response.data[k].cep,
                  "nome": response.data[k].localidade + ', ' + response.data[k].uf
                })
              }
              setMeusEnderecos(adr)
              if (response.data.length == 0) {
                try {
                  Api.get(url2)
                    .then((response) => {


                      let adr: Enderecos[] = []
                      for (const k in response.data) {
                        setFeedback(!isMyArea(response.data[k].cep))
                        adr.push({
                          "id": Number(response.data[k].cep),
                          "endereco": response.data[k].logradouro + ', ' + response.data[k].localidade + ', ' + response.data[k].bairro + ', ' + response.data[k].cep,
                          "nome": response.data[k].localidade + ', ' + response.data[k].uf
                        })
                      }

                      setMeusEnderecos(adr)


                    })
                    .catch((error) => {


                    });
                } catch (erro2) {

                }
              }

            })
            .catch((error) => {


            });
        } catch (erro) {
          try {
            Api.get(url2)
              .then((response) => {


                let adr: Enderecos[] = []
                for (const k in response.data) {
                  setFeedback(!isMyArea(response.data[k].cep))
                  adr.push({
                    "id": Number(response.data[k].cep),
                    "endereco": response.data[k].logradouro + ', ' + response.data[k].localidade + ', ' + response.data[k].bairro + ', ' + response.data[k].cep,
                    "nome": response.data[k].localidade + ', ' + response.data[k].uf
                  })
                }
                setMeusEnderecos(adr)

              })
              .catch((error) => {


              });
          } catch (erro2) {

          }
        }
      }






    }

  }
  const [feedbackAddress, setFeedback] = useState<boolean>(false)
  const [areaOk, setIsMyArea] = useState<boolean>(false)
  function setThisAddress(id: string) {


    localStorage.setItem("CEP_CLIENTE_SMART", id)

    if (id.length == 9) {
      let isMyAreaOk = isMyArea(id);
      setIsMyArea(isMyAreaOk)
      setFeedback(!isMyAreaOk)
      localStorage.setItem("IS_MY_AREA", (String)(isMyAreaOk))
    }
    if (id != "000000000") {

      while (id.length < 8) {
        id = "0" + id
      }
      Api.get(
        "https://ws.apicep.com/cep/" + id + ".json",
      )
        .then((response) => {

          if (response.data.state?.toLocaleLowerCase() != 'sp') {
            setFeedback(true)
          } else {
            setFeedback(false)
            props.onCloseClick()
          }


        })
        .catch((error) => {

          //location.replace('/minha-conta')
        });
    } else {
      setFeedback(false)
      props.onCloseClick()
    }


  }




  async function finalCepSearch(e: any) {
    // console.log(e)

    try {
      let valor: string = e.target.value

      valor = valor.replace(/-/g, '')

      setZipCode(valor)

      //console.log(valor)
      await setCache(valor);
      if (Number(valor)) {
        getAddresByCEP(valor)
      } else {
        let url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${valor}&format=json&limit=100`
        Api.get(
          url,
        )
          .then((response) => {


            try {
              if (response.data.length > 0) {
                let Enderecos: Enderecos[] = []
                if (response.data.length === 1) {
                  let thisData = response.data.address
                  getAddresByCEP(thisData.postcode)
                  setFeedback(!isMyArea(thisData.postcode))

                } else {
                  for (const k in response.data) {

                    let thisData = response.data[k].address
                    let thisDisplayName = response.data[k].display_name
                    let distrito = thisData?.city_district
                    if (distrito == undefined) { distrito = '' }

                    let regiao = thisData?.region
                    if (regiao == undefined) { regiao = '' }

                    let estado = thisData?.state
                    if (estado == undefined) { estado = '' }
                    Enderecos.push({
                      nome: distrito + ', ' + regiao + ', ' + estado,
                      id: Number(thisData.postcode.replace('-', '')),
                      endereco: thisDisplayName
                    })

                    setFeedback(!isMyArea(thisData.postcode))
                  }
                  setMeusEnderecos(Enderecos)
                }


                setMeusEnderecos(Enderecos)





                localStorage.setItem("ADDRESSES_CLIENT", JSON.stringify(Enderecos))

              } else {

              }
            } catch (erro) {

            }



          })
          .catch((error) => {


          });
      }

    } catch (err) {
      //  console.log("erro modal CEP", err)
    }




  }


  function getAddresByCEP(CEP: string) {
    setFeedback(!isMyArea(CEP))

    Api.get(
      `https://viacep.com.br/ws/${CEP}/json`,
    )
      .then((response) => {



        if (response.data.uf != undefined) {

          setMeusEnderecos(
            [
              {
                nome: response.data.localidade + ', ' + response.data.uf,
                id: Number(CEP),
                endereco: response.data.logradouro + ', ' + response.data.localidade + ', ' + response.data.cep
              }
            ]
          )
          localStorage.setItem("ADDRESSES_CLIENT", JSON.stringify(meusEnderecos))

        }



      })
      .catch((error) => {

        //location.replace('/minha-conta')
      });
  }

  function fecharLogar() {

    props.onCloseClick()
    localStorage.setItem("cart_without_account", "1")
    location.replace("/minha-conta")
  }


  const contentRef = React.useRef<any>(null);

  useEffect(() => {
    // console.log("zipCode", zipCode)
  }, [zipCode])

  function componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {

            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {

          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

  React.useEffect(() => {
    const clickOutside = (e: any) => {
      if (props.modalActive && contentRef.current && !contentRef.current.contains(e.target)) {
        props.onCloseClick();
      }
    }

    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }








  }, [props.modalActive])

  React.useEffect(() => {
    var LOJA: string | any = localStorage.getItem("FULL_DELIVERY_DEFAULT")
      ? localStorage.getItem("FULL_DELIVERY_DEFAULT")
      : "";
    if (LOJA != null && LOJA != "" && LOJA != undefined) {
      var LOJA_FULL: any = JSON.parse(ajustStrigfy(LOJA))



      var metodos: MetodoEntrega[] = []
      var myStores: Affiliate[] = []
      var horariosRetiradas: Horarios[] = []
      var IDs = [], cuId = 0
      LOJA_FULL = OrdenaJson(LOJA_FULL, "id", "ASC")
      for (const a in LOJA_FULL) {
        if (cuId != LOJA_FULL[a].id) {
          IDs.push(LOJA_FULL[a])
        }
        cuId = LOJA_FULL[a].id
      }

      let tst = process.env.AFFILIATE_ID
      if (tst == null) { tst = '0' }
      let AFFILIATE_ID = Number(tst)
      for (const k in IDs) {
        var affID = process.env.AFFILIATE_ID
        horariosRetiradas = JSON.parse(ajustStrigfy(IDs[k].retirada_agendada_horarios))
        if (IDs[k].affiliate_id == AFFILIATE_ID) {
          myStores.push(
            {
              "address": IDs[k].affiliates_business_endereco,
              "name": IDs[k].affiliates_business_name,
              "telephone": IDs[k].affiliates_business_telefone,
              "photo": IDs[k].affiliates_business_photo,
            }
          )
        }




      }
      setMinhasLojas(myStores)
    }

  }, [])
  // React.useEffect(() => {

  // }, [minhasLojas, meusEnderecos])
  useEffect(() => {
    if (zipCode == undefined) {
      // componentDidMount()
    } else {

    }

  }, [])

  React.useEffect(() => {
    const clickOutside = (e: any) => {
      if (!props.disableClickOut && props.modalActive && contentRef.current && !contentRef.current.contains(e.target)) {
        props.onCloseClick();
      }
    }

    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }

  }, [props.modalActive])

  const [imagenBanerLado, setLado] = useState<string>(``)
  React.useEffect(() => {

    var AFFILIATE_ID = process.env.AFFILIATE_ID
    var MASTER_ID = process.env.MASTER_ID

    let txt = process.env.MASTER_ID



    if (txt == null) { txt = "2" }
    setLado(`${process.env.SMART_API}/${txt}.png`)
  }, [])




  return (
    <div ref={contentRef} >

      <div ref={contentRef} className={`${ModalCEP.modal} ${props.modalActive ? ModalCEP.modalActive : ModalCEP.modal2} boxDesktop`}>
        <div ref={contentRef} className={ModalCEP.modalCEP}>
          <div style={{ maxHeight: '750px', overflow: 'auto' }}>
            <button className={ModalStyle.btnClose} onClick={props.onCloseClick}>
              <span className={ModalStyle.btnCloseLine}></span>
              <span className={ModalStyle.btnCloseLine}></span>
            </button>
            <div className={ModalCEP.modalImage}>
              <SmartImage
                src={imagenBanerLado ? imagenBanerLado : "/images/modalCEP.png"}
                layout="responsive"
                width={145}
                height={153} objectFit={"contain"} />

            </div>
            <br />

            <h3 className={ModalCEP.modalTitle}>Como deseja receber suas compras?</h3>
            <div className={ModalCEP.listaAbas}>
              <div onClick={() => setCasaLoja(true)} className={`${ModalCEP.btnAba} ${casaLoja ? ModalCEP.btnAbaActive : ''}`}>
                <p className={`${ModalCEP.modalAba} ${casaLoja ? ModalCEP.abaActive : ''} `}>Receber em casa</p>
              </div>
              <div onClick={() => setCasaLoja(false)} className={`${ModalCEP.btnAba} ${casaLoja ? '' : ModalCEP.btnAbaActive}`}>
                <p className={`${ModalCEP.modalAba} ${casaLoja ? '' : ModalCEP.abaActive} `}>Retire em nossa loja</p>
              </div>
            </div>
            <div className={ModalCEP.borderAba}></div>


            {!casaLoja ?
              <div>
                <div className={`${ModalCEP.btnVoltar} oculta`}> </div>





                <div className={ModalCEP.areaLojas}>
                  {minhasLojas.map((loja) => (

                    <div key={Math.random()} className={ModalCEP.cardLoja}>
                      <div className={ModalCEP.imgLoja}>
                        <SmartImage
                          src={loja.photo}
                          width={110} height={90} objectFit={"contain"} layout={"responsive"} />
                      </div>
                      <div className={ModalCEP.areaTxt}>
                        <h4 className={ModalCEP.lojaTitle}>{loja.name}</h4>
                        <p className={ModalCEP.addressLoja}>{loja.address}
                          <br />
                          {loja.telephone = " - Segunda a sábado das 08:00h às 17:00h"}
                        </p>

                      </div>
                      <div className={ModalCEP.btnLoja}>
                        <p onClick={() => setThisAddress("000000000")} className={ModalCEP.txtBtn}>
                          Comprar aqui
                        </p>
                      </div>

                    </div>

                  ))}


                </div>
              </div>
              :
              <div key={Math.random()} className={ModalCEP.abaOne}>


                {
                  feedbackAddress ?

                    <InputText2
                      value={true}
                      onBlur={finalCepSearch}
                      onKeyUp={finalCepSearch}
                      onchange={finalCepSearch}

                      className={` inputNovoo`}
                      label="Insira o seu CEP ou Endereço:"
                      focar={false}
                      id="user"
                      name="user"
                      type="text"
                    />



                    :
                    <InputText2
                      className="inputNovoo"
                      onchange={finalCepSearch}
                      onKeyUp={finalCepSearch}

                      value={true}
                      label="Insira o seu CEP ou Endereço:"
                      type="text"
                      focar={false}
                      id="code"
                      name="code"
                      color={'red'}
                      inputError={not}
                    />
                }



                {
                  feedbackAddress ?


                    <div className={ModalCEP.areaLojas}>
                      <p className="feedbackNegativo esquerdinha">Desculpe, não entregamos nessa região.</p>
                      <p className={`${ModalCEP.modalAba} esquerdinha`}>Que tal retirar em uma das nossas lojas?</p>
                      {minhasLojas.map((loja) => (

                        <div key={Math.random()} className={ModalCEP.cardLoja}>
                          <div className={ModalCEP.imgLoja}>
                            <Image
                              src={loja.photo}
                              width={110} height={90} alt={""}                            >

                            </Image>
                          </div>
                          <div className={ModalCEP.areaTxt}>
                            <h4 className={ModalCEP.lojaTitle}>{loja.name}</h4>
                            <p className={ModalCEP.addressLoja}>{loja.address}
                              <br />
                              {loja.telephone = " - Segunda a sábado das 08:00h às 17:00h"}
                            </p>

                          </div>
                          <div className={ModalCEP.btnLoja}>
                            <p onClick={() => setThisAddress("000000000")} className={ModalCEP.txtBtn}>
                              Comprar aqui
                            </p>
                          </div>

                        </div>

                      ))}


                    </div>
                    :
                    <div key={Math.random()} className={ModalCEP.areaEnderco}>

                      {
                        meusEnderecos.length > 0 ?
                          meusEnderecos.map((end) => (

                            end.nome != undefined && end.nome != 'undefined' ?
                              <div className="hoverAddress" onClick={() => setThisAddress(end.id.toString().replace(/-/g, ''))} key={Math.random()}>
                                <UserAddress
                                  key={end.id}
                                  name={end.nome}
                                  address={end.endereco}
                                />
                                <br />
                              </div>
                              :
                              <div key={Math.random()} className="oculta"></div>







                          ))
                          :
                          <div key={Math.random()} className="oculta"></div>
                      }




                    </div>
                }

              </div>
            }

            <h3 className={ModalCEP.modalSubTitle}>Já tem um endereço salvo?</h3>
            <h3 className={ModalCEP.modalFooterTitle}>Entre na sua conta para selecionar seu endereço.</h3>
            <h3 onClick={() => fecharLogar()} className={ModalCEP.modalLink}>Entrar ou Cadastrar</h3>

          </div>
        </div>


      </div>

      <div ref={contentRef} className="cepMobile">
        <MdCep modalActive={props.modalActive} onCloseClick={props.onCloseClick}>

          <div ref={contentRef} className={ModalCEP.modalCEP}>
            <div className={ModalCEP.modalImage}>
              <Image
                src="/images/modalCEP.png"
                layout="responsive"
                width={145}
                height={153} alt={""} />

            </div>
            <br />

            <h3 className={ModalCEP.modalTitle}>Como deseja receber suas compras?</h3>
            <div className={`${ModalCEP.listaAbas} abasEmMobile`}>
              <div onClick={() => setCasaLoja(true)} className={`${ModalCEP.btnAba} ${casaLoja ? ModalCEP.btnAbaActive : ''}`}>
                <p className={`${ModalCEP.modalAba} ${casaLoja ? ModalCEP.abaActive : ''} `}>Receber em casa</p>
              </div>
              <div onClick={() => setCasaLoja(false)} className={`${ModalCEP.btnAba} ${casaLoja ? '' : ModalCEP.btnAbaActive}`}>
                <p className={`${ModalCEP.modalAba} ${casaLoja ? '' : ModalCEP.abaActive} `}>Retire em nossa loja</p>
              </div>
            </div>
            <div className={ModalCEP.borderAba}></div>


            {!casaLoja ?
              <div>
                <div className={`${ModalCEP.btnVoltar} oculta`}> </div>





                <div className={`${ModalCEP.areaLojas} areaLojaMobile`}>
                  {minhasLojas.map((loja) => (

                    <div key={Math.random()} className={`${ModalCEP.cardLoja}  cardLojaMobile`}>
                      <div className={ModalCEP.imgLoja}>
                        <Image
                          src={loja.photo}
                          width={110} height={90} alt={""}                        >

                        </Image>
                      </div>
                      <div className={ModalCEP.areaTxt}>
                        <h4 className={ModalCEP.lojaTitle}>{loja.name}</h4>
                        <p className={ModalCEP.addressLoja}>{loja.address}
                          <br />
                          {loja.telephone = " - Segunda a sábado das 08:00h às 17:00h"}
                        </p>

                      </div>
                      <div className={`${ModalCEP.btnLoja} pAreaMobile`}>
                        <p onClick={() => setThisAddress("000000000")} className={ModalCEP.txtBtn}>
                          Comprar aqui
                        </p>
                      </div>

                    </div>

                  ))}


                </div>
              </div>
              :
              <div key={Math.random()} className={ModalCEP.abaOne}>




                {/* <MobileModalCloseButton />   */}

                {/* 
         <input  ${ModalCEP.inputArea} 
           className={`inputArrumado `}
           onKeyDown={guardaCep3}
           defaultValue={zipCode}
           placeholder="Pesquise por CEP ou endereço"
         /> */}

                {
                  feedbackAddress ?
                    <InputText2
                      className="inputNovoo"
                      color={'red'}
                      onchange={not}
                      onKeyUp={finalCepSearch}

                      focar={false}
                      value={true}
                      label="Insira o seu CEP ou Endereço:"
                      type="text"
                    />

                    :
                    <InputText2
                      className="inputNovoo"
                      onchange={not}
                      onKeyUp={finalCepSearch}

                      label="Insira o seu CEP ou Endereço:"
                      type="text"
                      value={true}
                      focar={false}
                    />
                }



                {
                  feedbackAddress ?


                    <div className={`${ModalCEP.areaLojas} areaLojaMobile`}>
                      <p className="feedbackNegativo esquerdinha">Desculpe, não entregamos nessa região.</p>
                      <p className={`${ModalCEP.modalAba} esquerdinha`}>Que tal retirar em uma das nossas lojas?</p>
                      {minhasLojas.map((loja) => (

                        <div key={Math.random()} className={`${ModalCEP.cardLoja}  cardLojaMobile`}>
                          <div className={ModalCEP.imgLoja}>
                            <Image
                              src={loja.photo}
                              width={110} height={90} alt={""}                            >

                            </Image>
                          </div>
                          <div className={ModalCEP.areaTxt}>
                            <h4 className={ModalCEP.lojaTitle}>{loja.name}</h4>
                            <p className={ModalCEP.addressLoja}>{loja.address}
                              <br />
                              {loja.telephone = " - Segunda a sábado das 08:00h às 17:00h"}
                            </p>

                          </div>
                          <div className={`${ModalCEP.btnLoja} pAreaMobile`}>
                            <p onClick={() => setThisAddress("000000000")} className={ModalCEP.txtBtn}>
                              Comprar aqui
                            </p>
                          </div>

                        </div>

                      ))}


                    </div>
                    :
                    <div className={`${ModalCEP.areaEnderco} cardLojaMobile`}>

                      {
                        meusEnderecos.length > 0 ?
                          meusEnderecos.map((end) => (

                            end.nome != undefined && end.nome != 'undefined' ?
                              <div className="hoverAddress" onClick={() => setThisAddress(end.id.toString().replace(/-/g, ''))} key={Math.random()}>
                                <UserAddress
                                  key={end.id}
                                  name={end.nome}
                                  address={end.endereco}
                                />
                                <br />
                              </div>
                              :
                              <div key={Math.random()} className="oculta"></div>







                          ))
                          :
                          <div key={Math.random()} className="oculta"></div>
                      }




                    </div>
                }

              </div>
            }
            <div className="footerCepMobile">
              <h3 className={ModalCEP.modalSubTitle}>Já tem um endereço salvo?</h3>
              <h3 className={ModalCEP.modalFooterTitle}>Entre na sua conta para selecionar seu endereço.</h3>
              <h3 onClick={() => fecharLogar()} className={ModalCEP.modalLink}>Entrar ou Cadastrar</h3>
            </div>





          </div>



        </MdCep>

      </div>








    </div>
  );
}
