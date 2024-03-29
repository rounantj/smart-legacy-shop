import Link from "next/link";
import styles from "@styles/components/asideBar/boxSubcategoryLink.module.css";
import SmartImage from "@components/SmartImage";

interface staticPropsResult {
  href: string;
  image: string;
  title: string;
}

export default function BoxSubcategoryLink(props: staticPropsResult) {
  return (
    <Link passHref href={props.href}>
      <span className={styles.subcategory}>
        <div className={styles.boxImg}>
          <SmartImage src={props.image} layout="fill" objectFit="contain" />
        </div>

        <h3 className={styles.title}>{props.title}</h3>
      </span>
    </Link>
  );
}
