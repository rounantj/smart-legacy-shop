import Link from "next/link";

import styles from "@styles/components/CategoryButton.module.css";
import SmartImage from "./SmartImage";
import { urlImageDecide } from "src/helpers/helpers";

interface StaticPropsResult {
  name: string;
  image: string;
  link: string;
  count: Number;
  active?: Boolean;
}

export default function CategoryButton(props: StaticPropsResult) {
  return (
    <Link href={props.link} passHref={false}>
      <button
        className={`${props.active ? styles.active : ""} ${styles.categoryCard
          }`}
      >
        <div className={styles.name}>{props.name}</div>

        <div className={styles.imgBox}>
          <SmartImage src={urlImageDecide(props.image)} layout="fill" objectFit="cover" />
          <span className={styles.counter}>{props.count}</span>
        </div>
      </button>
    </Link>
  );
}
