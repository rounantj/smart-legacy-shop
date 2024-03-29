import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import loginStyle from "../styles/pages/Login.module.css";

import LoginBox from "../components/LoginBox";

export default function Login() {
  return (
    <div className={loginStyle.login}>
      <main className={loginStyle.main}>
        <div className={loginStyle.container}>
          <div className={loginStyle.header}>
            <h2 className={`text-center ${loginStyle.title}`}>Boas Vindas!</h2>
            <p>Primeiro vamos registrar o usuário master</p>
          </div>

          <LoginBox />

          <div className={loginStyle.footer}>
            <p>
              Encontrou alguma dificuldade?{" "}
              <strong>
                {" "}
                <Link href="/" passHref>
                  Fale Conosco
                </Link>
              </strong>
            </p>
          </div>
        </div>
      </main>

      <div className={loginStyle.colImg}></div>
    </div>
  );
}
