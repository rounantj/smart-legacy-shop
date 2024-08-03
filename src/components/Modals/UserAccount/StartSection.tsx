import { useState } from "react";
import AccountFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import { Cliente } from "@models/Cliente";
import axios from "axios";
import { Api } from "@components/providers";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButton";
import { ajustStrigfy } from "@models/masks";

interface StartSectionProps {
  onClickCadastro: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCloseClick: any
  modalContent?: any
}

export default function StartSection(props: StartSectionProps) {
  const [isValid, setIsValid] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState<string>('');
  const [pictureUser, setPictureUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [googleId, setGoogleId] = useState<string>('');




  function handleIsValid(isValidValue: boolean) {
    setIsValid(isValidValue);
  }
  const retornoGoogle = (response: any) => {

    setName(response.profileObj.name)
    setPictureUser(response.profileObj.imageUrl)
    setEmail(response.profileObj.email)
    setGoogleId(response.profileObj.googleId)
    var mail: string = response.profileObj.email
    var pass: string = response.profileObj.googleId


    axios
      .post(process.env.SMART_API + "/clientAuth", {
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
              if (JSON.parse(ajustStrigfy(historicoCart.cart_conteudo)).length > 0) {
                location.replace("/checkout")
              } else {
                location.reload()
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
                .post(process.env.SMART_API + "/clientAuth", {
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
                        if (JSON.parse(ajustStrigfy(historicoCart.cart_conteudo)).length > 0) {
                          location.replace("/checkout")
                        } else {
                          location.reload()
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
                .post(process.env.SMART_API + "/clientAuth", {
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
                        if (JSON.parse(ajustStrigfy(historicoCart.cart_conteudo)).length > 0) {
                          location.replace("/checkout")
                        } else {
                          location.reload()
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
  const retornoFacebook = (response: any) => {

  }


  return (
    <div className={AccountFlowStyle.login}>
      <h1 className={AccountFlowStyle.title}>
        <span onClick={props.onCloseClick} className="d-lg-none">
          <MobileModalCloseButton />
        </span>
        Iniciar sessão
      </h1>

      <div className={AccountFlowStyle.loginMain}>
        <div className={AccountFlowStyle.registerMessage}>Você ainda não se cadastrou? <button onClick={props.onClickCadastro}>Cadastre-se aqui</button></div>

        <div className={AccountFlowStyle.loginBox}>

          <button onClick={props.onClickLogin} className={`${AccountFlowStyle.loginBoxItem} ${AccountFlowStyle.emailOuCelular}`}  >E-mail ou Celular</button>

          <button className={`${AccountFlowStyle.loginBoxItem} ${AccountFlowStyle.google} `} id={AccountFlowStyle.google}>
            {/* <GoogleLogin
              clientId="72123974216-pilbtr9a13esqn5s353a2uee1ncd1f49.apps.googleusercontent.com"
              buttonText="Continuar com Google"
              onSuccess={retornoGoogle}
              onFailure={retornoGoogle}

            /> */}
          </button>

        </div>
      </div>
    </div>
  );
}
