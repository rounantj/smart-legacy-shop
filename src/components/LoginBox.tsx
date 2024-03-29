import { useState } from "react";

import Button from "@components/Buttons/Button";
import InputText from "@components/Inputs/InputText";

import loginBoxStyle from "@styles/components/LoginBox.module.css";
import { validarEmail } from "@models/masks";

export default function LoginBox() {
  const [isValid, setIsValid] = useState(false);
  const [thisMail, setThisMail] = useState<string>("")

  function handleIsValid(value: any, isValidValue: boolean) {
    setThisMail(value)
    if (validarEmail(value)) {
     // console.log("validando email",value)
      setIsValid(true);
    }else{
       setIsValid(false);
    //  console.log("email invalido",value)
    }

  }

  return (
    <div className={loginBoxStyle.loginBox}>
      <h3 className={loginBoxStyle.title}>
        Informe o e-mail previamente <br /> combinado para continuar
      </h3>



      {isValid ?
      <div>
        <InputText
       
          defaultValue={thisMail}
          value={thisMail}
          onchange={handleIsValid}
          label="Email"
          id="email"
          name="email"
          type="text"
          focar={false}
          inputMode={"text"}

        />
        <Button >Continuar</Button>
        </div>

        :
        <div>
          <InputText
           focar={false}
            defaultValue=''
            color={'red'}
            onchange={handleIsValid}
            label="Email"
            id="email"
            name="email"
            type="text"
            inputMode={"text"}

          />
          <p className="colorRed">Informe um e-mail válido!</p>
          <Button disabled={isValid}>Continuar</Button>
        </div>
      }
     
      

     

    </div>
  );
}
