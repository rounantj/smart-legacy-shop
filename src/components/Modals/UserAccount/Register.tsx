import { useState, useEffect } from "react";
import Link from "next/link";

import Button from "@components/Buttons/Button";
import InputText from "@components/Inputs/InputText";

import AcctounFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import axios from "axios";
import { Cliente } from "@models/Cliente";
import { isEmail, validarEmailString } from "@models/masks";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Api } from "src/providers";

interface StartSectionProps {
  onClickEntrar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClickLogin: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function Register(props: StartSectionProps) {
  const [nomeIsValid, setNomeIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [telefoneIsValid, setTelefoneIsValid] = useState(false);
  const [senhaIsValid, setSenhaIsValid] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [mailOk, setMailOk] = useState(false);
  const formIsValid = nomeIsValid && telefoneIsValid && senhaIsValid && mailOk;



  function handleNome(value: any, isValidValue: boolean) {
    setNome(value);

    if (value.length > 0) {
      setNomeIsValid(true);
    } else {
      setNomeIsValid(false);
    }
  }

  function handleEmail(value: any, isValidValue: boolean) {
    setEmail(value);
    if (value.length > 0) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }

  }

  function handleTelefone(value: any, isValidValue: boolean) {
    setTelefone(value);

    if (value.length > 0) {
      setTelefoneIsValid(true);
    } else {
      setTelefoneIsValid(false);
    }
  }

  function handleSenha(value: any, isValidValue: boolean) {
    setSenha(value);

    if (value.length > 0) {
      setSenhaIsValid(true);
    } else {
      setSenhaIsValid(false);
    }
  }

  function criaUser() {

    var userIfo = [
      { 'fieldName': 'users_client_affiliate_id', "value": process.env.AFFILIATE_ID },
      { 'fieldName': 'users_client_name', "value": nome },
      { 'fieldName': 'users_client_mail', "value": email },
      { 'fieldName': 'users_client_telefone', "value": telefone },
      { 'fieldName': 'users_client_token', "value": senha },
      { 'fieldName': 'users_client_cpf', "value": "" },
      { 'fieldName': 'users_client_endereco', "value": "" },
      { 'fieldName': 'users_client_numero', "value": "" },
      { 'fieldName': 'users_client_complemento', "value": "" },
      { 'fieldName': 'users_client_todos_enderecos', "value": "" },
      { 'fieldName': 'users_client_cep', "value": "" },
      { 'fieldName': 'users_client_bairro', "value": "" },
      { 'fieldName': 'users_client_cidade', "value": "" },
      { 'fieldName': 'users_client_estado', "value": "" },
      { 'fieldName': 'users_client_listas_compras', "value": "" },


    ]
    Api
      .post("/newLoginInsert", {
        mail: emailIsValid,
        table: "users_clients",
        prefix: "users_client",
        fields: userIfo
      })
      .then((response) => {
        // console.log('/newLoginInsert',response)



        Api
          .post("/clientAuth", {
            mail: email,
            password: senha

          })
          .then((response) => {
            // console.log("/clientAuth", response)


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
              let historicoCart = JSON.parse(localCart)
              if (historicoCart.length == 0) {
                location.reload()
              } else {
                if (historicoCart.cart_conteudo != undefined) {
                  if (JSON.parse(historicoCart.cart_conteudo).length > 0) {
                    location.replace("/checkout")
                  } else {
                    location.reload()
                  }
                }
              }


            }

          })
          .catch((error) => {

          });


      })
      .catch((error) => {

      });

  }

  async function handleUserBlur(value: any, isValidValue: boolean) {
    // console.log('entrei no blur')
    setEmail(value);
    if (validarEmailString(value)) {
      localStorage.setItem("MAIL_TO_USER_SMART", value)
      setMailOk(true)
    } else {
      setMailOk(false)
    }
  }


  return (
    <div className={AcctounFlowStyle.registerForm}>
      <h1 className={AcctounFlowStyle.title}>Crie sua conta</h1>

      <div className={AcctounFlowStyle.registerMessage}>
        Já é cadastrado?{" "}
        <button onClick={props.onClickEntrar}>Entre aqui</button>
      </div>

      <div className={AcctounFlowStyle.form}>
        <InputText
          defaultValue={nome}
          onchange={handleNome}
          className="w-100 inputNew"
          label="Nome Completo"
          id="nome"
          name="nome"
          type="text"
          focar={false}
        />

        <InputText
          defaultValue={telefone}
          onchange={handleTelefone}
          className="w-100 inputNew"
          label="Telefone"
          id="telefone"
          focar={false}
          name="telefone"
          type="text"
          inputMode={"numeric"}
        />
        {
          !mailOk == true ?
            <div>
              <InputText
                defaultValue={email}
                onchange={handleEmail}
                onBlur={handleUserBlur}
                className={`${"w-100 "}`}
                label="E-mail"
                id="user"
                focar={false}
                color={"red"}
                name="user"
                type="text"
              />
              <p className="colorRed">Informe um e-mail válido!</p>
            </div>
            :

            <InputText
              defaultValue={email}
              onBlur={handleUserBlur}
              onchange={handleEmail}
              className={`${"w-100 "}`}
              label="E-mail"
              focar={false}
              id="user"
              name="user"
              type="text"
            />

        }

        <InputText
          defaultValue={senha}
          onchange={handleSenha}
          className="w-100 inputNew"
          label="Senha"
          id="pass"
          focar={false}
          name="pass"
          type="password"
        />

        <Button onClick={criaUser} disabled={!formIsValid}>Continuar</Button>
      </div>
    </div>
  );
}
