import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Button from "@components/Buttons/Button";
import InputText from "@components/Inputs/InputText";
import AccountFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import AcctounFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import { Cliente } from "@models/Cliente";
import { useLocalStorage } from "src/providers/useLocalStorage";
import { Api } from "src/providers";
import { ajustStrigfy, validarEmailString } from "@models/masks";
import { AppContext } from "src/pages/_app";
import { Cart } from "@models/Cart";
import LoadingSpinner from "@components/Spinner";

interface LoginProps {
  onClickVoltar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  naoCadastrado: any


}

export default function Login(props: LoginProps) {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);


  const [codes, setCodes] = useState(Array(5).fill(''));
  const [currentCode, setCurrentCode] = useState(0);
  const [step, setStep] = useState(1);
  const [clearDigits, setClearDigits] = useState<boolean>(false)
  const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
  const [qtdSteps, setQtdSteps] = useState(2);
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const [thisCart, setThisCart] = useState<Cart | null>(null)

  const [inputPasswordType, setInputPasswordType] = useState("password");
  const [token, setToken] = useLocalStorage<string | null>("token")
  const [codeVerify, setCodeVerify] = useLocalStorage<string>("")

  const [formIsValid, setFormIsValid] = useState(false);
  const [userIsValid, setUserIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [mailOk, setMailOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePasswordChange(value: any, isValidValue: boolean) {
    setPass(value);
    setPasswordIsValid(isValidValue);
    if (mailOk) {
      setFormIsValid(value && mailOk && isValidValue);


    }


  }

  async function handleUserChange(value: any, isValidValue: boolean) {
    setUserName(value);
  }

  async function handleUserBlur(value: any, isValidValue: boolean) {
    // 
    setUserName(value);
    if (validarEmailString(value)) {
      localStorage.setItem("MAIL_TO_USER_SMART", value)
      setMailOk(true)
    } else {
      setMailOk(false)
    }
  }

  const verifyEnter = (e: any) => {

    if (e.key === "Enter") {

      handleUserBlur(e.target.value, false)
    }

  }

  const verifyEnterPass = (e: any) => {

    if (e.key === "Enter") {
      nextStep()
    }

  }




  function forgotPasswordClick() {
    Api.post('/startup', { mail: localStorage.getItem("MAIL_TO_USER_SMART") }).then(response => {
      //
    }).catch(erro => {
      //
    })
    setForgotPasswordStep(true);
  }

  function prevStep() {
    if (step > 1) {
      let prevStep = step - 1;
      setStep(prevStep);
      setInputPasswordType("password");
    }
  }

  function loginCode() {

    //

    Api.post('/loginCodeClient', { "mail": localStorage.getItem("MAIL_TO_USER_SMART"), "code": Number(codeVerify) }).then(response => {
      //
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("token_me", response.data.token_me)
      localStorage.setItem("USER", JSON.stringify(response.data.data))

      var localCart = localStorage.getItem("MY_CART")
      if (localCart == null) {
        localCart = '[]'
      }
      let historicoCart = JSON.parse(ajustStrigfy(localCart))

      try {
        let conteudo = JSON.parse(ajustStrigfy(historicoCart.cart_conteudo))
        if (thisCart) {
          if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
            location.replace("/checkout")
          } else {
            location.reload()
          }
        }


      } catch (e) {
        location.reload()
      }



    }).catch(err => {
      //
    })

  }

  async function nextStep() {
    await setIsLoading(true)
    if (mailOk) {
      if (forgotPasswordStep) {
        loginCode()
      } else if (step < qtdSteps) {
        if (step === 1 && userName) {
          await Api.post(
            "/consultaCadastroCliente",
            {
              mail: userName
            }
          )
            .then((response) => {

              if (response?.data?.length > 0) {
                localStorage.setItem("MAIL_TO_USER_SMART", userName)
                let nextStep = step + 1;
                setStep(nextStep);
                setFormIsValid(false);
              } else {

                if (thisCart) {

                  if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
                    location.replace("/checkout")
                  } else {
                    alert("Usuário não cadastrado!")
                    props.naoCadastrado()
                  }
                } else {
                  alert("Usuário não cadastrado!")
                  props.naoCadastrado()
                }
              }
              setIsLoading(false)
            })
            .catch((error) => {
              // console.log(error)
              setIsLoading(false)
              location.reload()
              //alert("Erro interno!")
            });

        }



      } else if (step === qtdSteps) {
        loginSubmit();
      }
    } else {
      setLoginError(true)
      setIsLoading(false)
    }



  }


  function togglePassword() {
    if (inputPasswordType === "password") {
      setInputPasswordType("text");
    } else {
      setInputPasswordType("password");
    }
  }

  function loginSubmit() {


    var email = "rounantj@hotmail.com";


    axios
      .post("https://loja.api-smartcomerci.com.br/clientAuth", {
        mail: userName,
        password: pass

      })
      .then((response) => {



        let token = "";
        if (response.data.token) {
          token = response.data.token;

          localStorage.setItem('token', token);
          localStorage.setItem('MY_ID', response.data.id);
          localStorage.setItem('MY_AFFILIATE_ID', response.data.users_client_affiliate_id);

          var USER: Cliente = response.data

          localStorage.setItem("USER", JSON.stringify(response.data));
          localStorage.setItem("token_me", response.data.token_me)
          var localCart = localStorage.getItem("MY_CART")
          if (localCart == null) {
            localCart = '[]'
          }
          let historicoCart = JSON.parse(ajustStrigfy(localCart))
          if (historicoCart.length == 0) {
            location.reload()
          } else {
            if (historicoCart.cart_conteudo != undefined) {
              if (thisCart) {
                if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
                  location.replace("/checkout")
                } else {
                  location.reload()
                }
              }
            }
          }

        }

      })
      .catch((error) => {
        setLoginError(true)
        setIsLoading(false)
      });
  }
  const pegaPass = (e: any) => {

    setPass(e)
  }

  const handleFocusAuthCode = (index: any) => setCurrentCode(index);

  const handleBackspaceAuthCode = (val: string) => {

    let myCodes: string[] = []
    codes.forEach(c => {
      myCodes.push(c)
    })
    myCodes.push(val)
    setCodes(myCodes);
    setFormIsValid(myCodes.length === 5);
  }

  const handleChangeAuthCode = (val: any) => {
    const newIndex = currentCode + 1;
    setCodes(val);
    setCurrentCode(newIndex <= 4 ? newIndex : 4);

    const token = val.join('');
    setFormIsValid(token.length === 5);
  }

  const handlePasteAuthCode = (val: any) => {
    setCodes(val)
    setCurrentCode(4);

    const token = val.join('');
    setFormIsValid(token.length === 5);
  }
  const [isValid, setIsValid] = useState(false);
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState<string>('');
  const [pictureUser, setPictureUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [googleId, setGoogleId] = useState<string>('');

  const [dg1, setDg1] = useState<any>("")
  const [dg2, setDg2] = useState<any>("")
  const [dg3, setDg3] = useState<any>("")
  const [dg4, setDg4] = useState<any>("")
  const [dg5, setDg5] = useState<any>("")

  interface INPTS {
    name: string
    id: number
  }


  const setDG = (index: number) => async (e: any) => {

    //
    let myCode = codeVerify
    if (myCode == null) { myCode = "" }
    if (e.key === 'Backspace') {
      myCode = myCode.slice(0, myCode.length - 1)
      //
    } else {
      if (myCode.length > 5) {
        myCode = myCode.slice(0, 5)
      }
      myCode += e.key
      //
    }

    setTimeout(() => {
      setCurrentCode(Number(myCode?.length))
    }, 100);
    await setCodeVerify(myCode)
    //
  }




  const retornoGoogle = (response: any) => {

    setName(response.profileObj.name)
    setPictureUser(response.profileObj.imageUrl)
    setEmail(response.profileObj.email)
    setGoogleId(response.profileObj.googleId)
    var mail: string = response.profileObj.email
    var pass: string = response.profileObj.googleId


    axios
      .post("https://loja.api-smartcomerci.com.br/clientAuth", {
        mail: response.profileObj.email,
        password: response.profileObj.googleId
      })
      .then((response) => {

        let token = "";
        if (response.data.token) {
          token = response.data.token;

          localStorage.setItem('token', token);
          localStorage.setItem('MY_ID', response.data.id);
          localStorage.setItem('MY_AFFILIATE_ID', response.data.users_client_affiliate_id);

          var USER: Cliente = response.data

          localStorage.setItem("USER", JSON.stringify(response.data));
          localStorage.setItem("token_me", response.data.token_me)
          setIsLogged(true)

          var localCart = localStorage.getItem("MY_CART")
          if (localCart == null) {
            localCart = '[]'
          }
          let historicoCart = JSON.parse(ajustStrigfy(localCart))
          if (historicoCart.length == 0) {
            location.reload()
          } else {
            if (historicoCart.cart_conteudo != undefined) {
              if (thisCart) {
                if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
                  location.replace("/checkout")
                } else {
                  location.reload()
                }
              }
            }
          }
        }
      })
      .catch((erro) => {
        var AFFILIATE_ID: number | 0 = Number(process.env.AFFILIATE_ID)
        Api.post(
          "/newClientLoginInsert",
          {

            table: 'users_clients',
            mail: response.profileObj.email,
            prefix: 'users_client',
            fields: [
              { "fieldName": "users_client_affiliate_id", "value": 1 },
              { "fieldName": "users_client_name", "value": response.profileObj.name },
              { "fieldName": "users_client_mail", "value": response.profileObj.email },
              { "fieldName": "users_client_telefone", "value": '' },
              { "fieldName": "users_client_token", "value": response.googleId },
              { "fieldName": "users_client_cpf", "value": '' },
              { "fieldName": "users_client_endereco", "value": '' },
              { "fieldName": "users_client_cep", "value": '' },
              { "fieldName": "users_client_bairro", "value": '' },
              { "fieldName": "users_client_todos_enderecos", "value": '' },
              { "fieldName": "users_client_cidade", "value": '' },
              { "fieldName": "users_client_listas_compras", "value": '' }

            ]
          },

        )
          .then((response2) => {

            setIsLogged(true)

            setTimeout(() => {
              axios
                .post("https://loja.api-smartcomerci.com.br/clientAuth", {
                  mail: mail,
                  password: pass
                })
                .then((response) => {

                  let token = "";
                  if (response.data.token) {
                    token = response.data.token;

                    localStorage.setItem('token', token);
                    localStorage.setItem('MY_ID', response.data.id);
                    localStorage.setItem('MY_AFFILIATE_ID', response.data.users_client_affiliate_id);

                    var USER: Cliente = response.data

                    localStorage.setItem("USER", JSON.stringify(response.data));
                    localStorage.setItem("token_me", response.data.token_me)
                    setIsLogged(true)

                    var localCart = localStorage.getItem("MY_CART")
                    if (localCart == null) {
                      localCart = '[]'
                    }
                    let historicoCart = JSON.parse(ajustStrigfy(localCart))
                    if (historicoCart.length == 0) {
                      location.reload()
                    } else {
                      if (historicoCart.cart_conteudo != undefined) {
                        if (thisCart) {
                          if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
                            location.replace("/checkout")
                          } else {
                            location.reload()
                          }
                        }
                      }
                    }
                  }
                })
                .catch((erro) => {

                });

            }, 500)



          })
          .catch((error) => {

            setTimeout(() => {
              axios
                .post("https://loja.api-smartcomerci.com.br/clientAuth", {
                  mail: mail,
                  password: pass
                })
                .then((response) => {

                  let token = "";
                  if (response.data.token) {
                    token = response.data.token;

                    localStorage.setItem('token', token);
                    localStorage.setItem('MY_ID', response.data.id);
                    localStorage.setItem('MY_AFFILIATE_ID', response.data.users_client_affiliate_id);

                    var USER: Cliente = response.data

                    localStorage.setItem("USER", JSON.stringify(response.data));
                    localStorage.setItem("token_me", response.data.token_me)
                    setIsLogged(true)

                    var localCart = localStorage.getItem("MY_CART")
                    if (localCart == null) {
                      localCart = '[]'
                    }
                    let historicoCart = JSON.parse(ajustStrigfy(localCart))
                    if (historicoCart.length == 0) {
                      location.reload()
                    } else {
                      if (historicoCart.cart_conteudo != undefined) {
                        if (thisCart) {
                          if (JSON.parse(ajustStrigfy(thisCart.cart_conteudo)).length > 0) {
                            location.replace("/checkout")
                          } else {
                            location.reload()
                          }
                        }
                      }
                    }
                  }
                })
                .catch((erro) => {

                });

            }, 500)





          });



      });

  }

  function clickaVolta() {
    setForgotPasswordStep(false)
    setStep(1)
    props.onClickVoltar
  }

  useEffect(() => {
    let mc = localStorage.getItem("MY_CART")
    if (mc) {
      let MY_CART = JSON.parse(ajustStrigfy(mc))
      if (MY_CART) {


        setThisCart(MY_CART)
      }
    }


    if (!clearDigits) {
      localStorage.setItem("DIGITOS", "")
      setClearDigits(true)
    }
  }, [])

  useEffect(() => {

  }, [thisCart])

  //  useEffect(() =>{
  //  //
  //  },[codeVerify])

  //  useEffect(() =>{
  //   //
  //   },[dg1,dg2,dg3,dg4,dg5])

  function countChars(texto: string) {
    if (texto.length > 28) {
      return texto.substring(0, 27) + "..."
    } else {
      return texto
    }
  }


  return (
    <div className={AcctounFlowStyle.login}>
      {forgotPasswordStep ? (
        <div className={AcctounFlowStyle.step}>
          <button
            className={AcctounFlowStyle.btnVoltar}
            onClick={clickaVolta}
          >
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
          </button>

          <h2 className={AcctounFlowStyle.titleLogin}>
            Digite o código de 5 dígitos que enviamos para <span className={AcctounFlowStyle.userEmail}>{countChars(userName)}</span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <input

              maxLength={1}
              onKeyDown={setDG(1)}
              type='text'
              style={{ flex: '1', maxWidth: '50px', padding: '10px 16px' }}
              ref={input => { input && input.focus() }}
              inputMode={"numeric"}

            />
            <input
              ref={input => { currentCode == 1 ? input && input.focus() : input }}
              onKeyDown={setDG(2)}
              type='text'
              maxLength={1}
              style={{ flex: '1', maxWidth: '50px', padding: '10px 16px' }}
              inputMode={"numeric"}

            />
            <input
              ref={input => { currentCode == 2 ? input && input.focus() : input }}
              onKeyDown={setDG(3)}
              type='text'
              maxLength={1}
              style={{ flex: '1', maxWidth: '50px', padding: '10px 16px' }}
              inputMode={"numeric"}

            />
            <input
              ref={input => { currentCode == 3 ? input && input.focus() : input }}
              onKeyDown={setDG(4)}
              type='text'
              maxLength={1}
              style={{ flex: '1', maxWidth: '50px', padding: '10px 16px' }}
              inputMode={"numeric"}

            />
            <input
              ref={input => { currentCode >= 4 ? input && input.focus() : input }}
              onKeyDown={setDG(4)}
              type='text'
              maxLength={1}
              style={{ flex: '1', maxWidth: '50px', padding: '10px 16px' }}
              inputMode={"numeric"}

            />


          </div>
        </div>
      ) : step === 1 ? (
        <div className={AcctounFlowStyle.step}>
          <button
            className={AcctounFlowStyle.btnVoltar}
            onClick={props.onClickVoltar}
          >
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
          </button>

          <h2 className={AcctounFlowStyle.titleLogin}>
            Informe o seu e-mail para continuar
          </h2>

          <br />
          {!mailOk == true ? <div>
            <InputText
              defaultValue={userName}
              onchange={handleUserChange}
              onBlur={handleUserBlur}
              onKeyUp={verifyEnter}
              className={`${"w-100 "}`}
              label="E-mail"
              id="user"
              focar={false}
              color={"red"}
              name="user"
              type="text"
            />
            <p className="colorRed">Informe um e-mail válido!</p>
          </div> :
            <InputText
              defaultValue={userName}
              onBlur={handleUserBlur}
              onchange={handleUserChange}
              onKeyUp={verifyEnter}
              className={`${"w-100 "}`}
              label="E-mail"
              focar={false}
              id="user"
              name="user"
              type="text"
            />

          }

        </div>
      ) : (
        <div className={AcctounFlowStyle.step}>
          <button className={AcctounFlowStyle.btnVoltar} onClick={prevStep}>
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
            <span className={AcctounFlowStyle.btnVoltarLine}></span>
          </button>

          <h2 className={AcctounFlowStyle.titleLogin}>Informe sua senha</h2>

          <InputText
            defaultValue={pass}
            onchange={handlePasswordChange}
            onKeyUp={verifyEnterPass}
            className='w-100'
            label="Digite sua senha"
            id="password"
            name="password"
            focar={false}
            type={inputPasswordType}
            inputError={loginError}
          />

          {
            loginError && (
              // eslint-disable-next-line react/jsx-no-comment-textnodes
              <p style={{ color: 'var(--red)', textAlign: 'left' }}>

                Senha incorreta. Verifique ou clique em {'"'}Esqueceu a senha?{'"'} Para recupera-la.
              </p>
            )
          }

          <div className={AcctounFlowStyle.passwordOptions}>
            <div className={AcctounFlowStyle.inputCheck}>
              <input
                ref={input => { input && input.focus() }}
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
        </div>
      )}

      <div className={AcctounFlowStyle.separator}></div>

      <Button onClick={nextStep} className="w-100" disabled={!mailOk}>
        {isLoading ? <LoadingSpinner /> : <div className="oculta"></div>}
        Continuar
      </Button>
      <br />
      <br />
      <button className={`${AccountFlowStyle.loginBoxItem} ${AccountFlowStyle.google} `} id={AccountFlowStyle.google}>
        {/* <GoogleLogin
          clientId="72123974216-pilbtr9a13esqn5s353a2uee1ncd1f49.apps.googleusercontent.com"
          buttonText="Continuar com Google"
          onSuccess={retornoGoogle}
          onFailure={retornoGoogle}

        /> */}
      </button>
    </div>
  );
}
