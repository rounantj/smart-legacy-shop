import Link from "next/link";

import LogoBranco from "@components/Logos/LogoBranco";

import headerStyle from "@styles/components/HeaderCheckout.module.css";
import CompraSeguraIcon from "@assets/icons/CompraSegura";

function HeaderCheckout() {
  return (
    <header className={headerStyle.header}>
      <div className="container-fluid">
        <div className={headerStyle.headerContent}>
          <Link href="/" passHref>
            <span className={headerStyle.logo}>
              <LogoBranco />
            </span>
          </Link>

          <div className={headerStyle.boxNumeroPedido}>
            <CompraSeguraIcon /> - Site Seguro!
          </div>
        </div>
      </div>
    </header>
  );
}

HeaderCheckout.defaultProps = {};

export default HeaderCheckout;
