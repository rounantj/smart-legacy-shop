import { SetStateAction, useEffect, useState } from "react";

import Button from "@components/Buttons/Button";
import ModalPassword from "@components/Modals/ModalPassword";
import InputText from "@components/Inputs/InputText";

import { useLocalStorage } from "@components/providers/useLocalStorage";
import styles2 from "@styles/components/minha-conta/Tabs.module.css";
import styles from "@styles/components/minha-conta/EditarDados.module.css";
import AcctounFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import { Cliente } from "@models/Cliente";
import { Api } from "@components/providers";
import { ajustStrigfy, cepMask, cpfMask2, isCNPJ, isCPF, isMyArea, validarEmail, validarEmailString, validarEmailText } from "@models/masks";
import LoadingSpinner from "@components/Spinner";

interface TabProps {
  active?: boolean;
  cliente: Cliente | any;
  handlerAdd: any;
}
interface TIPOS_ENDERECOS {
  numero?: string
  endereco?: string
  complemento?: string
  cidade?: string
  bairro?: string
  cep?: string
}
export default function TabEditarDados(props: TabProps) {
  const [step, setStep] = useState(1);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
  const [qtdSteps, setQtdSteps] = useState(2);
  const [mailOrigin, setMailOrigin] = useState<string>()
  const [nameUser, setNameUser] = useState("");

  const [cpfUser, setCpfUser] = useState("");
  const [telUser, setTelUser] = useState("");
  const [mailUser, setMailUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passOk, setPassOk] = useState<boolean>(false)

  const [currentCEP, setCurrentCEP] = useState("");
  const [currentCIDADE, setCurrentCIDADE] = useState("");
  const [currentBAIRRO, setCurrentBAIRRO] = useState("");
  const [currentNUMERO, setCurrentNUMERO] = useState("");
  const [currentCOMPLEMENTO, setCurrentCOMPLEMENTO] = useState("");
  const [currentENDERECO, setCurrentENDERECO] = useState("");
  const [senhasIguais, setSenhasIguais] = useState<boolean>(false)


  const [todosEnderecos, setTodosEnderecos] = useState<TIPOS_ENDERECOS[]>();

  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [pass, setPass] = useState('null');
  const [stage, setStage] = useState("editarDados");
  const [cpfOK, setCPFOK] = useState<boolean>(false)
  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [token, setToken] = useLocalStorage<string | null>("token");
  const [client, setClient] = useState<Cliente>();
  const [modalPass, setModalPass] = useState<boolean>(false)
  const [mailOK, setMailOK] = useState<boolean>(false)

  const [isMyAreaOK, setIsMyAreaOK] = useState<boolean>(false)

  function triggerModalPass(stage: string) {
    setStage(stage)
    setModalPass(!modalPass)
  }
  const [isLoading, setIsLoading] = useState(false);



  function handlePasswordChange(value: any, isValidValue: boolean) {

    setPass(value);
    //console.log(value)
  }

  function insertAddress() {
    let thisAddress: any = []
    try {
      let txt = localStorage.getItem("USER")
      if (txt == null) { txt = "null" }

      let USER = JSON.parse(ajustStrigfy(txt))
      thisAddress = JSON.parse(ajustStrigfy(USER.users_client_todos_enderecos))
      if (USER.users_client_token !== null && USER.users_client_token !== undefined && USER.users_client_token !== '') {
        setPassOk(true)
      }
    } catch (e) { }

    if (!thisAddress || thisAddress == null) { thisAddress = [] }

    let thisNew: TIPOS_ENDERECOS = {
      numero: currentNUMERO,
      endereco: currentENDERECO,
      complemento: currentCOMPLEMENTO,
      cidade: currentCIDADE,
      bairro: currentBAIRRO,
      cep: currentCEP
    }

    thisAddress.push(thisNew)
    let data = {
      table: "users_clients",
      fieldName: "users_client_todos_enderecos",
      newValue: JSON.stringify(thisAddress),
      userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
      myToken: pass
    }

    Api.post(
      "/updateClientDetailsFront", data)
      .then(async (response: any) => {
        //console.log(response)
        setModalPass(!modalPass)

        setTodosEnderecos(thisAddress)
        await updateUserStorage()

      })
      .catch((error: any) => {
        //console.log(error)
        setModalPass(!modalPass)

      });

  }



  async function updateUserStorage() {
    var tk = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (tk == null) { tk = "" }

    var tk_me = localStorage.getItem("token_me")
      ? localStorage.getItem("token_me")
      : "";
    if (tk_me == null) { tk_me = "" }
    Api.post('/clientAuthReverso', { "token_me": tk_me }, { headers: { "x-access-token": tk } }).then((response: { data: { token_me: string; }; }) => {
      //console.log(response.data)
      localStorage.setItem("USER", JSON.stringify(response.data));
      localStorage.setItem("token_me", response.data.token_me)

    })
      .catch((error: any) => {
        //console.log(error)
      });
  }


  function handleCep(value: any, isValidValue: boolean) {
    getAddresByCEP(value)
    setCurrentCEP(value);
  }

  useEffect(() => {
    let t = localStorage.getItem("MAIL_TO_USER_SMART")
    if (!t) {
      t = ''
    }
    setMailOrigin(t)
  }, [localStorage.getItem("MAIL_TO_USER_SMART")])

  useEffect(() => {
    //console.log('mailOrigin',mailOrigin)
  }, [mailOrigin])

  function tornarPadrao(end: TIPOS_ENDERECOS) {
    setIsLoading(true);
    let data = [
      {
        table: "users_clients",
        fieldName: "users_client_numero",
        newValue: end.numero,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_cidade",
        newValue: end.cidade,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_bairro",
        newValue: end.bairro,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_endereco",
        newValue: end.endereco,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_complemento",
        newValue: end.complemento,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_cep",
        newValue: end.cep,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      }
    ]

    let updates = []

    for (const k in data) {

      Api.post(
        "/updateClientDetailsFront", data[k])
        .then((response: any) => {
          //console.log(response)
          updates.push(response)

          if (updates.length === 6) {
            updateUserStorage()
            location.reload()
          }

        })
        .catch((error: any) => {
          //console.log(error)
          updates.push(error)
        });

    }


  }



  function getAddresByCEP(CEP: string) {
    CEP = CEP.replace(/-/g, "")


    if (CEP.length >= 8) {
      let isMyAreaOk = isMyArea(CEP);
      localStorage.setItem("IS_MY_AREA", (String)(isMyAreaOk))
      if (!isMyAreaOk) {
        setIsMyAreaOK(false)
      } else {
        setIsMyAreaOK(true)
      }
      Api.get(
        "https://ws.apicep.com/cep/" + CEP + ".json",
      )
        .then((response: { data: { city: string | undefined; state: string; address: SetStateAction<string> | undefined; district: SetStateAction<string> | undefined; }; }) => {


          if (response.data.city != undefined) {
            setCurrentCIDADE(response.data.city + ', ' + response.data.state)
          }
          if (response.data.address != undefined) {
            setCurrentENDERECO(response.data.address)
          }
          if (response.data.district != undefined) {
            setCurrentBAIRRO(response.data.district)

          }






        })
        .catch((error: any) => {

          //location.replace('/minha-conta')
        });
    }


  }


  function handleComplemento(value: any, isValidValue: boolean) {
    setCurrentCOMPLEMENTO(value);
    //console.log(value)
  }

  function handleBairro(value: any, isValidValue: boolean) {
    setCurrentBAIRRO(value);
    //console.log(value)
  }


  function handleNumero(value: any, isValidValue: boolean) {
    setCurrentNUMERO(value);
    //console.log(value)
  }


  function handleEndereco(value: any, isValidValue: boolean) {
    setCurrentENDERECO(value);
    //console.log(value)
  }

  function handleCidade(value: any, isValidValue: boolean) {
    setCurrentCIDADE(value);
    //console.log(value)
  }




  function handleName(value: any, isValidValue: boolean) {
    setNameUser(value);
    //console.log(value)
  }
  function handleCPF(value: any, isValidValue: boolean) {
    if (cpfUser.length === 11 || cpfUser.length === 14) {
      if (isCPF(value)) {
        setCPFOK(true)
      } else {
        setCPFOK(false)
      }
    }

    else {
      if (isCNPJ(value)) {
        setCPFOK(true)
      } else {
        setCPFOK(false)
      }
    }
    setCpfUser(value);
    //console.log(value)
  }
  function handleTelefone(value: any, isValidValue: boolean) {
    setTelUser(value);
    //console.log(value)
  }
  function handleMail(value: any, isValidValue: boolean) {


    setMailUser(value);
    //console.log(value)
  }

  async function handleNewPasswordChange(value: any, isValidValue: boolean) {
    await setNewPass(value);
    //console.log(value)
  }

  async function handleConfirmNewPasswordChange(value: any, isValidValue: boolean) {
    await setConfirmNewPass(value);

    //console.log(value)
  }

  const handleInputChange = (setState: any) => (value: any) => {
    if (setState) {
      if (validarEmail(value)) {
        setMailOK(true)
      } else {
        setMailOK(false)
      }
      //console.log(value)
      setState(value);
    }
  }

  const onkeydownPass = (e: any) => {
    //console.log(e)
    //console.log(e.nativeEvent.target.value);
  };




  function forgotPasswordClick() {
    setForgotPasswordStep(true);
    setPassOk(false)
  }

  function togglePassword() {
    if (inputPasswordType === "password") {
      setInputPasswordType("text");
    } else {
      setInputPasswordType("password");
    }
  }

  useEffect(() => {
    let USER: string | any = localStorage.getItem("USER") || '';
    try {
      USER = USER ? JSON.parse(ajustStrigfy(USER)) : {};

      setClient(USER);
    } catch (err) {
      //console.log('erro', err)
    }

  }, [])

  useEffect(() => {
    if (validarEmailString(mailUser)) {
      setMailOK(true)
    } else {
      setMailOK(false)
    }
  }, [mailUser])

  useEffect(() => {
    try {
      let user = localStorage.getItem("USER");
      if (user == null) {
        user = '[]'
      }

      let USER = JSON.parse(ajustStrigfy(user))


      setTelUser(USER.users_client_telefone)
      setNameUser(USER.users_client_name)
      setCpfUser(USER.users_client_cpf)

      if (USER.users_client_cpf.length === 11 || USER.users_client_cpf.length === 14) {
        setCPFOK(true)
      } else {
        setCPFOK(false)
      }
      if (USER.users_client_token !== null && USER.users_client_token !== undefined && USER.users_client_token !== '') {
        setPassOk(true)
      }



      setMailUser(USER.users_client_mail)

      try {
        if (validarEmailText(USER.users_client_mail)) {
          setMailOK(true)
        }

      } catch (e) {

      }

      let todosEnd: any = []
      try {
        todosEnd = JSON.parse(ajustStrigfy(USER.users_client_todos_enderecos))
      } catch (e) {

      }

      if (todosEnd.length > 0) {
        const END: TIPOS_ENDERECOS[] = []
        todosEnd.forEach((tdE: TIPOS_ENDERECOS) => {
          END.push({
            numero: tdE.numero,
            cep: tdE.cep,
            bairro: tdE.bairro,
            endereco: tdE.endereco,
            cidade: tdE.cidade,
            complemento: tdE.complemento,
          })
        });

        //console.log(END)
        setTodosEnderecos(END)
      }

    } catch (erru) {
      //console.log('erouu', erru)
    }





  }, [client]);

  useEffect(() => {
    //console.log("endereços novos", todosEnderecos)
  }, [todosEnderecos])


  async function autenticateClient() {
    try {
      let affId = process.env.AFFILIATE_ID;
      if (affId == null) {
        affId = '0'
      }

      let user = localStorage.getItem("USER");
      if (user == null) {
        user = '[]'
      }

      let USER = JSON.parse(ajustStrigfy(user))


      setTelUser(USER.users_client_telefone)
      setNameUser(USER.users_client_name)
      setCpfUser(USER.users_client_cpf)
      setMailUser(USER.users_client_mail)
      if (USER.users_client_token !== null && USER.users_client_token !== undefined && USER.users_client_token !== '') {
        setPassOk(true)
      }



      Api.post(
        "/autenticateClient",
        {
          users_client_affiliate_id: Number(affId),
          mail: USER.users_client_mail,
          pass: pass
        }
      )
        .then((response: any) => {


          setStep(2)


        })
        .catch((error: any) => {


        });

    } catch (e) {
      //console.log('erro aki',e)
    }

  }


  async function atualizandoCredenciais() {

    let token = localStorage.getItem("token");

    if (token == null) {
      token = ""
    }

    let data = {
      table: "users_clients",
      fieldName: "users_client_token",
      newValue: newPass,
      userMail: mailOrigin,
      myToken: pass
    }
    // console.log(data)


    Api.post(
      "/updateClientDetailsFront", data)
      .then(async (response: any) => {
        // console.log(response)
        setModalPass(!modalPass)
        localStorage.clear()
        await updateUserStorage()
        location.reload()
      })
      .catch((error: any) => {
        //console.log(error)

      });
  }

  async function verificaSenhasIguais() {
    // console.log(newPass,confirmNewPass)
    if (newPass === confirmNewPass) {
      await setSenhasIguais(true)
    } else {
      setSenhasIguais(false)
    }
  }

  async function atualizandoDados() {

    let token = localStorage.getItem("token");

    if (token == null) {
      token = ""
    }

    let data = [
      {
        table: "users_clients",
        fieldName: "users_client_telefone",
        newValue: telUser,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_cpf",
        newValue: cpfUser,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_name",
        newValue: nameUser,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      },
      {
        table: "users_clients",
        fieldName: "users_client_mail",
        newValue: mailUser,
        userMail: localStorage.getItem("MAIL_TO_USER_SMART"),
        myToken: pass
      }
    ]

    let updates = []

    for (const k in data) {

      Api.post(
        "/updateClientDetailsFront", data[k])
        .then(async (response: any) => {
          //console.log(response)
          updates.push(response)

          if (updates.length === 4) {
            setModalPass(!modalPass)
          }
          await updateUserStorage()

        })
        .catch((error: any) => {
          //console.log(error)
          updates.push(error)
        });

    }



  }

  return (
    <div className={` ${styles2.tab} ${styles.editarDados} ${props.active ? styles.active : "oculta"} `}>
      <section className={styles.box}>
        <header className={styles.boxHeader}>
          <h2 className={styles.boxTitle}>
            <i className={styles.boxIcon}></i>
            Meus Dados
          </h2>

          <Button onClick={() => triggerModalPass("editarDados")}>Editar Dados</Button>
        </header>

        <div className={styles.boxBody}>
          <div className={styles.field}>
            <div className={styles.fieldTitle}>Nome completo</div>
            <div className={styles.fieldValue}>{nameUser}</div>
          </div>

          <div className={styles.fieldList}>
            <div className={` ${styles.field} ${styles.fieldEmail} `}>
              <div className={styles.fieldTitle}>E-mail</div>
              <div className={styles.fieldValue}>
                {mailUser}
              </div>
            </div>

            <div className={` ${styles.field} ${styles.fieldPhone} `}>
              <div className={styles.fieldTitle}>Telefone</div>
              <div className={styles.fieldValue}>{telUser}</div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldTitle}>CPF</div>
              <div className={styles.fieldValue}>{cpfUser}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={` ${styles.box} ${styles.boxSeguranca} `}>
        <header className={styles.boxHeader}>
          <h2 className={styles.boxTitle}>
            <i className={styles.boxIcon}></i>
            Segurança
          </h2>
        </header>

        <div className={styles.boxBody}>
          <div className={styles.field}>
            <div className={styles.fieldTitle}>Senha</div>
            <div className={styles.fieldValue}>************</div>
          </div>

          <Button onClick={() => triggerModalPass("alterarSenha")}>Alterar Senha</Button>
        </div>
      </section>

      <section className={`${styles.box} oculta`}>
        <header className={styles.boxHeader}>
          <h2 className={styles.boxTitle}>
            <i className={styles.boxIcon}></i>
            Formas de pagamento
          </h2>
        </header>

        <div className={styles.boxBody}>
          <div className={styles.cardsList}>
            <div className={` ${styles.card} ${styles.active}`}>
              <div className={styles.cardBody}>
                <div className={styles.cardImageBox}></div>

                <div className={styles.cardDetails}>
                  <h3 className={styles.cardTitle}>MasterCard - Crédito</h3>

                  <div className={styles.cardTerminadoEm}>
                    Terminado em 0123
                  </div>
                  <div className={styles.cardVencimento}>Vencimento 01/01</div>
                </div>
              </div>

              <footer className={styles.cardFooter}>
                <div>
                  <button className={styles.cardButton}>Tornar padrão</button>

                  <div className={styles.cardDefaultBox}>
                    <i className={styles.cardDefaultBoxIcon}></i>
                    Forma de pagamento padrão
                  </div>
                </div>

                <button className={styles.cardDelete}>
                  <span className="d-lg-none">Apagar meio de pagamento</span>
                </button>
              </footer>
            </div>

            <div className={` ${styles.card}`}>
              <div className={styles.cardBody}>
                <div className={styles.cardImageBox}></div>

                <div className={styles.cardDetails}>
                  <h3 className={styles.cardTitle}>MasterCard - Crédito</h3>

                  <div className={styles.cardTerminadoEm}>
                    Terminado em 0123
                  </div>
                  <div className={styles.cardVencimento}>Vencimento 01/01</div>
                </div>
              </div>

              <footer className={styles.cardFooter}>
                <div>
                  <button className={styles.cardButton}>Tornar padrão</button>

                  <div className={styles.cardDefaultBox}>
                    <i className={styles.cardDefaultBoxIcon}></i>
                    Forma de pagamento padrão
                  </div>
                </div>

                <button className={styles.cardDelete}>
                  <span className="d-lg-none">Apagar meio de pagamento</span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.box}>
        <header className={styles.boxHeader}>
          <h2 className={styles.boxTitle}>
            <i className={styles.boxIcon}></i>
            Meus Endereços
          </h2>
        </header>

        <div className={styles.boxBody}>
          <button onClick={() => triggerModalPass("editarEndereco")} className={styles.addAddress}>
            <i className={styles.addAddressIcon}></i> Adicionar Endereço
          </button>

          <div className="listandoEnderecos">

            <div className={` ${styles.card}`}>
              <div className={styles.cardBody}>
                <div className={styles.cardDetails}>
                  <h3 className={styles.cardTitle}>{client?.users_client_complemento} </h3>

                  <div className={styles.cardDescription}>
                    {client?.users_client_complemento + ", " + client?.users_client_numero + ", " + client?.users_client_bairro + ", " + client?.users_client_cidade + ", " + client?.users_client_cep}
                  </div>
                </div>
              </div>

              <footer className={styles.cardFooter}>
                <div>


                  <div className={styles.cardDefaultBox}>
                    <i className={styles.cardDefaultBoxIcon}></i>
                    Endereço padrão
                  </div>
                </div>

                <button className={`${styles.cardDelete} oculta`}>
                  <span className="d-lg-none">Apagar endereço</span>
                </button>
              </footer>
            </div>

            {
              todosEnderecos?.map((end) =>

                <div key={Math.random()} className={` ${styles.card}`}>
                  <div className={styles.cardBody}>
                    <div className={styles.cardDetails}>
                      <h3 className={styles.cardTitle}>{end.complemento},{end.endereco} </h3>

                      <div className={styles.cardDescription}>
                        {end.complemento + ", " + end.numero + ", " + end.bairro + ", " + end.cidade + ", " + end.cep}
                      </div>
                    </div>
                  </div>

                  <footer className={styles.cardFooter}>
                    <div>
                      <button disabled={isLoading} onClick={() => tornarPadrao(end)} className={styles.cardButton}>
                        {isLoading ? <LoadingSpinner /> : <div className="oculta"></div>}
                        Tornar padrão</button>

                      <div className={styles.cardDefaultBox}>
                        <i className={styles.cardDefaultBoxIcon}></i>
                        Endereço padrão
                      </div>
                    </div>

                    <button className={`${styles.cardDelete} oculta`}>
                      <span className="d-lg-none">Apagar endereço</span>
                    </button>
                  </footer>
                </div>

              )
            }

          </div>




        </div>
      </section>

      <ModalPassword modalActive={modalPass} onCloseClick={triggerModalPass}>

        {
          step == 1 && passOk ?
            <div className={styles.step1}>
              <h3 className={styles.modalTitle}>
                Informe sua Senha atual para continuar
              </h3>
              {/* 
              <InputText
                defaultValue=""
                // onchange={handleInputChange(setPass)}
                //onKeyUp={onkeydownPass}
                className="w-100"
                label="Digite sua senha"
                id="password"
                name="password"
                type="password"
              /> */}

              <InputText
                defaultValue={pass}
                onchange={handlePasswordChange}
                className='w-100'
                label="Digite sua senha"
                id="password"
                name="password"
                focar={false}
                inputMode={"text"}
                type={inputPasswordType}
              // inputError={loginError}
              />

              <div className={AcctounFlowStyle.passwordOptions}>
                <div className={AcctounFlowStyle.inputCheck}>
                  <input
                    type="checkbox"
                    id="show-password"
                    onChange={togglePassword}
                  />
                  <label htmlFor="show-password">Mostrar Senha</label>
                </div>

                <button
                  onClick={forgotPasswordClick}
                  className={AcctounFlowStyle.btnForgotPass}
                >
                  Esqueceu a senha?
                </button>
              </div>
              <br />
              <br />
              <Button onClick={autenticateClient} className="w-100">Continuar</Button>
            </div>
            :


            stage == "editarDados" && passOk ?
              <div className={styles.step2}>
                <h3 className={styles.modalTitle}>Alterar seus dados</h3>

                <InputText
                  defaultValue={nameUser}
                  onchange={handleName}
                  className="w-100"
                  label="Nome Completo"
                  id="user"
                  focar={false}
                  name="user"
                  type="text"
                />
                <br />
                <br />



                {mailOK == true ?
                  <InputText
                    defaultValue={mailUser}
                    onchange={handleMail}
                    className="w-100"
                    label="E-mail"
                    id="user"
                    focar={false}
                    name="user"
                    type="text"
                  /> :
                  <div>
                    <InputText
                      defaultValue={mailUser}
                      onchange={handleMail}
                      className="w-100"
                      color={'red'}
                      label="E-mail"
                      focar={false}
                      id="user"
                      name="user"
                      type="text"
                    />
                    <br />
                    <br />
                    <br />
                    <p className="colorRed">Informe um e-mail válido!</p>
                  </div>
                }
                <br />
                <br />
                <InputText
                  defaultValue={telUser}
                  onchange={handleTelefone}
                  className="w-100"
                  label="Telefone"
                  id="user"
                  focar={false}
                  name="user"
                  type="text"
                  inputMode={"numeric"}
                />
                <br />
                <br />
                {cpfOK ? <InputText
                  defaultValue={cpfUser}
                  onchange={handleCPF}
                  className="w-100"
                  label="CPF/CNPJ"
                  onKeyUp={cpfMask2}
                  id="user"
                  focar={false}
                  inputMode={"numeric"}
                  name="user"
                  type="text"
                />
                  :
                  <InputText
                    defaultValue={cpfUser}
                    onchange={handleCPF}
                    className="w-100"
                    label="CPF/CNPJ"
                    onKeyUp={cpfMask2}
                    id="user"
                    color={'red'}
                    focar={false}
                    inputMode={"numeric"}
                    name="user"
                    type="text"
                  />

                }

                <br />
                <br />
                <br />
                <Button disabled={!(mailOK && cpfOK)} onClick={atualizandoDados} className="w-100">Alterar</Button>
              </div>
              :

              stage == "editarEndereco" && passOk ?

                <div className={styles.step2}>
                  <h3 className={styles.modalTitle}>Adicionar endereço</h3>

                  <InputText
                    onchange={handleCep}
                    label="Cep"
                    className="w-100"
                    onKeyUp={cepMask}
                    focar={false}
                    id="CEP"
                    defaultValue={currentCEP}
                    inputMode={"numeric"}

                  />
                  <br />
                  <br />

                  {!isMyAreaOK ?
                    <p className="colorRed">Não entregamos neste cep!</p>
                    :
                    <div className="oculta"></div>
                  }

                  <InputText
                    onchange={handleCidade}
                    label="Cidade"
                    className="w-100"
                    id="cidade"
                    focar={false}
                    defaultValue={currentCIDADE}
                    inputMode={"text"}

                  />
                  <br />
                  <br />

                  <InputText
                    onchange={handleBairro}
                    label="Bairro"
                    className="w-100"
                    id="bairro"
                    defaultValue={currentBAIRRO}
                    focar={false}
                    inputMode={"text"}

                  />
                  <br />
                  <br />

                  <InputText
                    onchange={handleNumero}
                    label="Número"
                    className="w-100"
                    id="numero"
                    focar={false}
                    defaultValue={currentNUMERO}
                    inputMode={"numeric"}

                  />
                  <br />
                  <br />

                  <InputText
                    onchange={handleComplemento}
                    label="Complemento"
                    className="w-100"
                    id="complemento"
                    focar={false}
                    defaultValue={currentCOMPLEMENTO}
                    inputMode={"text"}

                  />
                  <br />
                  <br />
                  <br />

                  <Button disabled={!isMyAreaOK} onClick={insertAddress} className="w-100">Adicionar Endereço</Button>
                </div>
                :
                <div className={styles.step2}>
                  <h3 className={styles.modalTitle}> {!passOk ? 'Crie' : 'Digite'} a nova senha</h3>

                  <InputText
                    defaultValue={newPass}
                    onchange={handleNewPasswordChange}
                    className="w-100"
                    label="Digite sua nova senha"
                    id="user"
                    focar={false}
                    onBlur={verificaSenhasIguais}
                    name="user"
                    type="password"
                  />
                  <br />
                  <br />
                  <InputText
                    defaultValue={confirmNewPass}
                    onchange={handleConfirmNewPasswordChange}
                    className="w-100"
                    label="Redigite sua nova senha"
                    onBlur={verificaSenhasIguais}
                    id="user"
                    name="user"
                    focar={false}
                    type="password"
                  />
                  <br />
                  <br />
                  {
                    !senhasIguais ?
                      <p className="colorRed">As senhas não conferem</p>
                      :
                      <div className="oculta"></div>
                  }
                  <br />

                  <Button disabled={!senhasIguais} onClick={atualizandoCredenciais} className="w-100">Alterar senha</Button>
                </div>

        }
      </ModalPassword>
    </div>
  );
}
