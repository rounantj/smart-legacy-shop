import Image from "next/image";


import styles from "@styles/components/Loja.module.css"
import SmartImage from "./SmartImage";

interface staticProps {
	image: string;
	title: string;
	endereco: string;
	telefone: string;
	atendimento: string;
	link: string;
}

export default function Loja ( props: staticProps ) {
	return (
    <div className={styles.loja}>
      <div className={styles.imageBox}>
        {/* <Image src={props.image} layout="fill" objectFit="contain" /> */}
        <SmartImage src={props.image} layout="fill" objectFit="contain" />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{props.title}</h3>

				<p className={styles.endereco}>{props.endereco}</p>

        <p className={styles.telefone}>{props.telefone}</p>

				<div dangerouslySetInnerHTML={{ __html: props.atendimento }}></div>

				<a href="#" className={styles.botao}>Ver no Mapa</a>
      </div>
    </div>
  );
}