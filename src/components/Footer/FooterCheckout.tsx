import footerStyle from "@styles/components/Footer.module.css";

function FooterCheckout() {
  return (
    <footer className={footerStyle.footer}>

      <section className={footerStyle.comunicado}>
        <div className="container">
          <p>
            Proibida a venda de bebidas alcoólicas para menores de idade,
            conforme Lei n.° 8069/90, art. 81, inciso II (Estatuto da Criança e
            do Adolescente).
          </p>
          <p>
            {" "}
            Preços, ofertas e condições exclusivas para internet e válidos
            durante o dia de hoje, podendo sofrer alterações sem prévia
            notificação. No caso de faltar algum produto, este não será entregue
            e o valor correspondente não será cobrado
          </p>
          <h3>smartcomerci comunica:</h3>
          <p>
            O valor mínimo para pedido no Mambo Delivery é de R$ 70,00. O valor
            total de sua compra poderá ser alterado, para mais ou para menos,
            por conta dos produtos de peso variável. Para melhor atender nossos
            clientes, não vendemos por atacado e reservamo-nos o direito de
            limitar a 12 unidades a quantidade de produtos por cliente. Preços,
            ofertas e condições exclusivos para internet e válidos durante o dia
            de hoje, podendo sofrer alterações sem prévia notificação. Venda
            sujeita à disponibilidade de estoque no dia da entrega. No caso de
            faltar algum produto, este não será entregue e o valor
            correspondente não será cobrado. O cartão de crédito só será
            processado de fato no dia da entrega e não quando o número do cartão
            é digitado no site.
          </p>
        </div>
      </section>
    </footer>
  );
}

FooterCheckout.defaultProps = {};

export default FooterCheckout;
