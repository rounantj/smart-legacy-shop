import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import LayoutDefault from "@components/Layouts/LayoutDefault";
import Loja from "@components/Loja";

import Link from "next/link";

import { Api } from "@components/providers";
import { ProductOrder } from "@models/ProductOrder";
import { Cart } from "@models/Cart";
import { Product2 } from "@models/Product2";

import styles from "@styles/pages/institucional/institucional.module.css";
import MobileModalCloseButton from "@assets/icons/MobileModalCloseButtonLeft";
import { AppContext } from "../_app";

export default function NossasLojas() {
  const {
    carts,
    decrease,
    increase,
    remove,
    update,
    updateDetail,
    noCarrinho,
  } = useContext(AppContext);

  return (
    <LayoutDefault
      noCarrinho={noCarrinho}
      detail={updateDetail}
      update={update}
      cart={carts}
      increase={increase}
      decrease={decrease}
      remove={remove}
    >
      <div className={styles.breadcrumbs}>
        <Link href="/" passHref>
          <span>Home</span>
        </Link>
        <div className={styles.separator}></div>
        <Link href="#" passHref>
          <span>Institucional</span>
        </Link>
        <div className={styles.separator}></div>
        Políticas de Privacidade
      </div>

      <div className={`d-lg-none ${styles.container}`}>
        <button className={styles.pageTitle}>
          <i className="d-lg-none">
            <MobileModalCloseButton />
          </i>
          Institucional
        </button>
      </div>

      <div className="model-page-interna">

        <div className="content">
          <div className={styles.containerInner}>

            <h1 className={styles.title}>
              <strong> POLÍTICA DE PRIVACIDADE</strong>
            </h1>

            <p>
              A LOJA O MUNDO DAS EMBALAGENS (SANTOS & VENEZIAN COMÉRCIO DE EMBALAGENS LTDA) se compromete com a sua privacidade. A proteção à privacidade e aos dados dos seus potenciais clientes refletem os valores do O MUNDO DAS EMBALAGENS e reafirmam o seu compromisso com a melhoria contínua da proteção de dados. Assim, O MUNDO DAS EMBALAGENS apresenta a presente política de privacidade (“Política de Privacidade”), cujo objetivo é informar, de maneira simples e transparente, a forma de tratamento dos dados pessoais dos potenciais clientes do O MUNDO DAS EMBALAGENS (“Potencial Cliente” ou “você”) que efetuam contato e compras em nossa empresa consecutivamente, desde a sua coleta até o seu descarte.
            </p>
            <p>
              A Política de Privacidade dos Websites, disponíveis nos endereços citados acima, se aplicará conjuntamente com a presente Política de Privacidade. Para informações sobre como seus dados de Navegação e Utilização de Websites serão tratados, assim como sobre Cookies, acesse tais documentos abaixo.
            </p>

            <p>
              É importante que você leia e compreenda essas regras, que devem ser interpretadas em conjunto com outras disposições aplicáveis, especialmente aquelas provenientes da legislação em vigor.
            </p>
            <p>
              Caso você não concorde com quaisquer das disposições desta política de privacidade, por favor não efetue seu cadastro ou qualquer compra em nosso site.
            </p>
            <br />

            <h3 className={styles.title}>
              <strong>QUAIS DADOS PESSOAIS SÃO COLETADOS?</strong>
            </h3>
            <p>
              O MUNDO DAS EMBALAGENS trata seus dados pessoais que são coletados e/ou processados pelos Websites, conforme indicado abaixo.
            </p>
            <ul>
              <li>
                Informações Cadastrais: Ao efetuar uma compra, você nos fornecerá: (I) nome completo, (II) número do CPF, (III) telefone de contato; e (V) endereço de e-mail.
              </li>
              <li>
                Informações de Navegação e Utilização do Websites: Além disso, O MUNDO DAS EMBALAGENS poderá coletar outras informações quando você navega nos Websites, tais como funcionalidades acessadas e tempo de permanência.
              </li>
              <li>
                Registros de Acesso e demais Informações Automatizadas: O MUNDO DAS EMBALAGENS também armazena algumas informações que recebe automaticamente toda vez que você interage com a Plataforma de compra VTEX e Aplicativos. Internet Protocol (IP), tipo de navegador, bem como datas e horas das interações são alguns exemplos desta coleta. Identificadores únicos do telefone celular (IMEI) e localização geográfica são exemplos de dados potencialmente coletados pelo Aplicativo.
              </li>

            </ul>
            <br />
            <h3 className={styles.title}>
              <strong>COOKIES</strong>
            </h3>
            <p>
              No âmbito dos Websites, O MUNDO DAS EMBALAGENS poderá utilizar instruções eletrônicas, conhecidas como cookies ({'"'}cookies{'"'}), que serão enviadas ao browser e armazenadas no disco do seu computador.
            </p>
            <p>
              Alguns cookies são necessários para o funcionamento dos Website. Esses cookies geralmente, são definidos em resposta a ações feitas pelos usuários, tais como definir preferências de privacidade, fazer login ou preencher formulários.
            </p>
            <p>
              Outra finalidade dos cookies é verificar quem são os Potenciais Clientes dos Websites, coletar informações sobre como você usa sites. Os cookies de performance nos ajudam, por exemplo, a identificar áreas especialmente populares do nosso site. Dessa forma, podemos adaptar o conteúdo de nossos sites mais especificamente às suas necessidades e, assim, melhorar a experiência do cliente e eventualmente, facilitar sua navegação com as características, preferências e qualidade das informações veiculadas à sua navegação. Esses cookies são usados para enviar informações publicitárias e promocionais relevantes para você, por exemplo com base nas páginas da web que você visitou, nos limites autorizados pela legislação.
            </p>
            <p>
              Informamos que O MUNDO DAS EMBALAGENS atualmente não utiliza uma solução técnica que nos permita responder plenamente aos sinais de “não rastrear” de seu navegador. Ainda assim, você pode gerenciar as configurações de cookies nas configurações de seu navegador a qualquer hora. Ao desabilitar todos os cookies nas configurações de seu navegador, é possível que certas seções ou recursos dos Websites não funcionem ou ocasionem demasiada demora para carregar os conteúdos, pois seu navegador pode nos impedir de definir cookies necessários.
            </p>
            <br />
            <h3 className={styles.title}>
              <strong>PARA QUAIS FINALIDADES COLETAMOS SEUS DADOS?</strong>
            </h3>
            <p>
              Os dados pessoais coletados são armazenados e tratados pela O MUNDO DAS EMBALAGENS para as seguintes finalidades:
            </p>

            <ul>
              <li>
                Examinar sua solicitação e enviar a compra solicitada;
              </li>
              <li>
                Verificar sua identidade;
              </li>
              <li>
                Responder a eventuais pedidos de informações adicionais; Enviar comunicações de marketing relacionadas aos produtos e serviços do O MUNDO DAS EMBALAGENS. As comunicações de marketing poderão ser enviadas tanto pelo O MUNDO DAS EMBALAGENS, quanto pela concessionária de seu interesse, selecionada no momento da solicitação da proposta comercial. Realizar análises de crédito para fins de compras online;
              </li>
              <li>
                Cumprimento de obrigações contratuais, legais ou regulatórias em relação a entidades terceiras públicas ou privadas.
              </li>

            </ul>
            <br />
            <h3 className={styles.title}>
              <strong>COM QUEM AS INFORMAÇÕES SÃO COMPARTILHADAS?</strong>
            </h3>


            <p>
              O MUNDO DAS EMBALAGENS poderá compartilhar seus dados pessoais com terceiros ou parceiros de negócios, que sejam relevantes para fins de viabilizar o relacionamento com você e o envio da proposta comercial solicitada. Referido compartilhamento ocorre com base nos seguintes critérios e para as finalidades descritas abaixo
            </p>
            <ul>
              <li>
                Prestadores de serviços. Essas empresas trabalham com O MUNDO DAS EMBALAGENS para viabilizar ou aprimorar o cumprimento das finalidades listadas no capítulo anterior (“Para quais finalidades coletamos seus dados?”). São exemplos os serviços de (i) desenvolvimento ou melhorias nos Websites, e (ii) criação/gestão de ações de marketing para a LOJA O MUNDO DAS EMBALAGENS relacionadas direta ou indiretamente aos Websites, produtos e serviços da LOJA O MUNDO DAS EMBALAGENS. Esses fornecedores recebem suas informações com a finalidade específica de prestar serviços ao O MUNDO DAS EMBALAGENS e não possuem quaisquer direitos de uso de suas informações fora dessa hipótese.
              </li>
              <li>
                Instituições Financeiras. O MUNDO DAS EMBALAGENS compartilhará seus dados pessoais com as instituições financeiras parceiras (CIELO e outras) para fins de análise de crédito.
              </li>
              <li>
                Requisição Judicial: O MUNDO DAS EMBALAGENS pode compartilhar dados pessoais em caso de requisição judicial ou mediante determinação de autoridade competente, nos termos da lei.
              </li>
              <li>
                Empresas do grupo econômico. O MUNDO DAS EMBALAGENS conta com a estrutura organizacional de seu grupo econômico para o monitoramento das transações para fins de combate às fraudes transacionais e prevenção à lavagem de dinheiro.
              </li>
            </ul>
            <br />
            <h3 className={styles.title}>
              <strong>
                POR QUANTO TEMPO ARMAZENAMOS SEUS DADOS PESSOAIS?</strong>
            </h3>
            <p>
              Armazenamos e mantemos suas informações, nos termos da política interna de retenção da LOJA O MUNDO DAS EMBALAGENS, da seguinte forma: (I) pelo tempo exigido por lei; (II) até o término do tratamento de dados pessoais, conforme mencionado abaixo; ou (III) pelo tempo necessário a preservar o legítimo interesse da LOJA O MUNDO DAS EMBALAGENS (como, por exemplo, durante prazos razoáveis para enviarmos comunicações de marketing a você e durante prazos prescricionais aplicáveis).
            </p>
            <p>
              Conforme item (II) acima, o término do tratamento de dados pessoais ocorrerá quando for verificado:
            </p>
            <ul>
              <li>
                Que a finalidade pela qual os dados foram coletados foi alcançada ou que os dados pessoais coletados deixaram de ser necessários ou pertinentes ao alcance da finalidade específica almejada;
              </li>
              <li>
                Uma manifestação do Potencial Cliente nesse sentido, para hipóteses em que O MUNDO DAS EMBALAGENS recebeu consentimento específico para determinado tratamento de dados pessoais no âmbito dessa Política; ou
              </li>
              <li>
                Determinação legal.
              </li>
            </ul>
            <p>
              Nesses casos de término de tratamento de dados pessoais, ressalvadas as hipóteses estabelecidas pela legislação aplicável ou pela presente Política de Privacidade, os dados pessoais serão eliminados.
            </p>
            <br />
            <h3 className={styles.title}>
              <strong>
                SEUS DIREITOS</strong>
            </h3>
            <p>
              Você possui direitos no que se refere aos seus dados pessoais, dentre eles:
            </p>
            <ul>
              <li>
                Acesso aos dados pessoais. Você pode requisitar acesso aos seus dados pessoais coletados e que estejam armazenados pelo O MUNDO DAS EMBALAGENS por meio de envio de e-mail ao endereço marketing@omundodasembalagens.com.br;
              </li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados. O Potencial Cliente poderá, a qualquer momento, alterar e editar os seus dados pessoais, fazendo o login da sua conta ou por meio de envio de e-mail ao endereço marketing@omundodasembalagens.com.br;
              </li>
              <li>
                Informações sobre uso compartilhado de dados. As informações sobre o compartilhamento de dados pessoais encontram-se nesta Política de Privacidade. A LOJA O MUNDO DAS EMBALAGENS coloca-se à sua disposição para a hipótese de esclarecimentos complementares;
              </li>
              <li>
                Revogação do consentimento e opt-out. Você poderá revogar o consentimento que tenha dado à LOJA O MUNDO DAS EMBALAGENS para tratamento dos seus dados pessoais para certas finalidades, a qualquer momento, mediante manifestação gratuita e facilitada, por meio de envio ao e-mail marketing@omundodasembalagens.com.br. Para os casos de utilização de dados pessoais para fins de marketing, você também poderá manifestar que não está mais interessado em receber comunicações da LOJA O MUNDO DAS EMBALAGENS por meio do mecanismo de opt-out que será disponibilizado quando do envio de comunicações desta natureza pela LOJA O MUNDO DAS EMBALAGENS. Importante informar que os tratamentos realizados anteriormente à revogação do consentimento são ratificados e que o pedido de revogação não implicará a eliminação dos dados pessoais anteriormente tratados e que sejam mantidos pela LOJA O MUNDO DAS EMBALAGENS com base em outros fundamentos legais.
              </li>
            </ul>
            <br />
            <h3 className={styles.title}>
              <strong>

                COMO PROTEGEMOS SEUS DADOS PESSOAIS?</strong>
            </h3>
            <p>
              Nós levamos a sério nosso dever de proteger os dados que você confia à LOJA O MUNDO DAS EMBALAGENS contra alteração, perda, uso indevido, divulgação ou acesso acidental ou não autorizado. A LOJA O MUNDO DAS EMBALAGENS usa diversas tecnologias de segurança e medidas técnicas e organizacionais para ajudar a proteger seus dados pessoais contra eventuais incidentes.

            </p>
            <br />
            <h3 className={styles.title}>
              <strong>

                ALTERAÇÕES NESTA POLÍTICA DE PRIVACIDADE</strong>
            </h3>
            <p>
              Informamos que para sua segurança a LOJA O MUNDO DAS EMBALAGENS se reserva o direito de modificar parcial ou totalmente a presente Política de Privacidade, atualizando-a e adaptando-a. A última data de alteração da Política de Privacidade estará sempre indicada no cabeçalho deste documento. A LOJA O MUNDO DAS EMBALAGENS publicará quaisquer atualizações nos Websites, motivo pelo qual é recomendado seu acesso periódico, conforme aplicável. A LOJA O MUNDO DAS EMBALAGENS comunicará a você sobre qualquer alteração substancial da Política.
            </p>
            <br />
            <h3 className={styles.title}>
              <strong>
                IDENTIFICAÇÃO DO CONTROLADOR E DO ENCARREGADO</strong>
            </h3>
            <p>

              A SANTOS & VENEZIAN COMÉRCIO DE EMBALAGENS LTDA CNPJ: 05.050.084/0001-91 com sede à ESTRADA DOS ROMEIROS - 2051 - CRUZ PRETA - BARUERI - SP - CEP: 06417-000 - BRASIL (LOJA O MUNDO DAS EMBALAGENS) é o controlador dos dados pessoais dos Potenciais Clientes tratados no âmbito desta Política de Privacidade. O Encarregado pelo tratamento de dados pessoais da LOJA O MUNDO DAS EMBALAGENS é o Sr. Fernando Martins (“Encarregado”). Em caso de dúvidas, entre em contato com o Encarregado por meio do e-mail marketing@omundodasembalagens.com.br.

            </p>
            <p>

              A LOJA O MUNDO DAS EMBALAGENS compartilha seus dados pessoais com terceiros para atingir determinadas finalidades, conforme estabelecido na Seção “COM QUEM AS INFORMAÇÕES SÃO COMPARTILHADAS?” desta Política. Caso esses terceiros utilizem os seus dados pessoais para outras finalidades além das finalidades definidas na referida Seção e acordadas com a LOJA O MUNDO DAS EMBALAGENS, eles se tornarão controladores independentes em relação aos tratamentos dos dados pessoais para as finalidades alheias à Política e serão exclusivamente responsáveis por tais tratamentos.

            </p>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
