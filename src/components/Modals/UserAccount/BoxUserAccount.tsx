import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import StartSection from "@components/Modals/UserAccount/StartSection";
import Register from "@components/Modals/UserAccount/Register";
import Login from "@components/Modals/UserAccount/Login";

import Logo from "@assets/images/Logo";

import AccountFlowStyle from "@styles/components/modals/AccountFlow.module.css";
import LogoBranco from "@components/Logos/LogoBranco";
import LogoBranco2 from "@components/Logos/LogoBranco2";
import SmartImage from "@components/SmartImage";
interface Open {
  oncloseClick: any
  start?: string
}
export default function BoxUserAccount(props: Open) {
  const [modalContent, setModalContent] = useState(props.start ? props.start : "start");

  function handleClickCadastro() {
    setModalContent("register");
  }

  function handleClickEntrar() {
    setModalContent("start");
  }

  function handleClickLogin() {
    setModalContent("login");
  }

  const [imagenBanerLado, setLado] = useState<string>(``)
  React.useEffect(() => {

    var AFFILIATE_ID = process.env.AFFILIATE_ID
    var MASTER_ID = process.env.MASTER_ID

    let txt = process.env.MASTER_ID
    let isFirst = localStorage.getItem("cart_without_account")
    if (isFirst == "1") {
      setModalContent("login");
    }



    if (txt == null) { txt = "2" }
    setLado(`${process.env.SMART_API}/pictures_ean/${txt}.png`)
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className={AccountFlowStyle.carroCarregado}>
            <SmartImage
              src={imagenBanerLado}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className={AccountFlowStyle.containerInner}>
            <div className={AccountFlowStyle.boxLogo}>
              {/* <Image
              src=process.env.SMART_API+"/images/1/log04.png"
              width={150}
              height={54}
            /> */}
              <LogoBranco2 />
            </div>

            <div className={AccountFlowStyle.contentBox}>
              {modalContent == "register" ? (
                <Register
                  onClickEntrar={handleClickEntrar}
                  onClickLogin={handleClickLogin}
                />
              ) : modalContent == "login" ? (
                <Login naoCadastrado={handleClickEntrar} onClickVoltar={handleClickEntrar} />
              ) : (
                <StartSection
                  modalContent={modalContent}
                  onCloseClick={props.oncloseClick}
                  onClickCadastro={handleClickCadastro}
                  onClickLogin={handleClickLogin}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
