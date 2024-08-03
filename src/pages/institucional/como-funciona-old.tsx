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
      detail={update}
      update={updateDetail}
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
        Como funciona a entrega?
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
              <strong>POLÍTICAS DE ENTREGA</strong>
            </h1>

            <p>
              As entregas realizadas pelo O Mundo das Embalagens são feitas através de nossa frota própria, atendendo as regiões mais próximas de nossas lojas.

            </p>

            <p>
              Não cobramos frete para a entrega dos produtos, por isso, para cada região há um valor mínimo de compra.

            </p>
            <p>
              Confira algumas das regiões que atendemos:
            </p>
            <p>LOCAIS</p>
            <ul>
              <li>ITAPEVI</li>
              <li>PIRAPORA</li>
              <li>STN DE PARNAÍBA</li>
              <li>ALPHAVILLE</li>
              <li>OSASCO</li>
              <li>CARAPICUIBA</li>
              <li>COTIA</li>
              <li>JANDIRA</li>
              <li>BARUERI</li>
            </ul>

            <p>

              Se sua região não está disponível na tabela, fale com nosso SAC (Setor de Atendimento ao Cliente), pelo Telefone: 11 4168 1725 ou Whatsapp: 11 4161 8448.

            </p>

            <p>

              O prazo de entrega é contado a partir da confirmação do pedido, após o processo de separação. São considerados apenas os dias úteis (não incluindo sábados, domingos e feriados), e  levam em consideração o estoque, o processo de emissão da nota fiscal e o tempo de entrega.

            </p>

            <p>
              Por isso é muito importante manter os seus dados cadastrais atualizados com nosso SAC (Setor de Atendimento ao Cliente). Tais como: Endereço, Telefones, E-mail, etc.

            </p>

            <p>

              O Mundo das Embalagens não se responsabiliza por atrasos decorridos de greves ou paralizações.

            </p>

            <p>

              OBS: após finalizar o pedido não é possível alterar o endereço de entrega.

            </p>

            <p>

              Caso tenha fornecido o endereço incompleto, entre em contato com nosso SAC (Setor de Atendimento ao Cliente), e verifique o status do seu pedido, para avaliarmos a melhor solução.

            </p>

            <p>

              Nossos produtos são enviados aos clientes exatamente como nos foram entregues pelo fabricante.

            </p>
            <p>
              OBS: Não aceitamos devoluções de produtos nas condições abaixo:

            </p>

            <ul>

              <li>



                – Com embalagem violada;
              </li>

              <li>

                – Produtos alimentícios
              </li>

              <li>

                – Personalizados de qualquer forma.

              </li>


            </ul>
            <p>

              As entregas podem ser recusadas quando ocorrer uma das hipóteses abaixo, sempre descrevendo no verso do pedido o motivo da recusa:

            </p>
            <ul>
              <li>
                – Embalagem aberta ou avariada

              </li>
              <li>


                – Produto avariado

              </li>
              <li>

                – Produto em desacordo com o pedido
              </li>
            </ul>

            <p>
              No caso de recusa no recebimento da entrega, o pedido deve voltar integralmente, não sendo possível escolher quais produtos devem ficar.

            </p>
            <p>

              Caso tenha identificado uma destas hipóteses e mesmo assim queira aceitar a entrega, primeiramente entre em contato com nosso SAC (Setor de Atendimento ao Cliente).

            </p>
            <p>
              Entrega Expressa: Pedidos aprovados das 08h às 12h podem ser entregues no período da tarde* ou em até 24 horas.

            </p>
            <p>

              Pedidos aprovados a partir das 12h podem ser entregues no dia seguinte * pela manhã ou em até 24 horas

            </p>
            <ul>
              <li>

                – Dependendo das rotas disponíveis
              </li>
            </ul>
            <p>

              Retirada: Após o nosso SAC (Setor de Atendimento ao Cliente) confirmar o seu pedido na loja escolhida para retirada, dirija-se ao endereço informado.

            </p>
            <p>
              Se a retirada for realizada pelo titular da compra, é necessário apresentar o documento de identificação com foto e o número do pedido (DAV), caso seja um terceiro é necessário apresentar o número do Pedido (DAV) e o documento de identificação da pessoa que irá retirar.

            </p>
            <p>

              Condições para pedidos aprovados:
            </p>
            <ul>
              <li>

                – Confirmação de Transferência Bancária (DOC, TED ou PIX) em até 24h (Confirmação apenas em dias úteis).

              </li>
              <li>

                – Confirmação do Pedido pelo cliente mediante aos produtos disponíveis.

              </li>
            </ul>


          </div>

          <br />

          <h3 className={styles.title}>
            <strong>POLÍTICAS DE TROCA</strong>
          </h3>
          <p>

            Troca de Mercadorias:
          </p>
          <p>

            A troca de produtos é obrigatória apenas em caso de defeitos.

          </p>

          <p>

            Nos casos de arrependimento de compra não há obrigação de troca, portanto, este estabelecimento o faz como cortesia<br /> aos seus clientes, exceto para produtos alimentícios, personalizados em geral, cortados por metro.

          </p>

          <p>

            A troca de produtos é feita apenas em loja, não trocamos produtos em domicílio.

          </p>

          <p>


            Condições para Troca:

          </p>
          <ul>
            <li>

              – Deve ser apresentado o cupom fiscal;
            </li>

            <li>

              – Prazo máximo de 30 dias corridos a partir da data de compra;

            </li>

            <li>

              – O comprovante deve ter sido emitido na mesma loja em que o produto foi adquirido;

            </li>

            <li>

              – O produto ou sua embalagem não podem ter sinais de uso, apresentando perfeitas condições;

            </li>


          </ul>
          <p>
            Artigo 49 e § único do Código de Defesa do Consumidor (CDC)

          </p>
          <br />


          <h3 className={styles.title}>
            <strong>FORMAS DE PAGAMENTO</strong>
          </h3>

          <ul>
            <li>
              – Crédito
            </li>

            <li>
              – Débito
            </li>

            <li>

              – Depósito Bancário (TED, DOC ou PIX)

            </li>
          </ul>
          <p>
            Bandeiras de Cartões que aceitamos:
          </p>
          <ul>
            <li>
              – Mastercard;
            </li>
            <li>
              – Visa;
            </li>
            <li>

              – Elo;
            </li>
            <li>

              – Hiper;
            </li>
            <li>

              – Amex;
            </li>
            <li>
              – Dinners;
            </li>
            <li>
              – Sorocred;
            </li>
          </ul>

          <p>

            Não aceitamos VA e VR.
          </p>

          <p>

            Outras bandeiras sob consulta.
          </p>

          <p>
            Parcelamento:
          </p>

          <p>
            Parcelamos em 2x acima de R$ 200,00
          </p>

          <p>
            Parcelamos em 3x acima de R$ 300,00
          </p>
          <p>
            Atenção: Pagamentos por depósito bancário podem levar até 24 horas para serem aprovados (Condição disponível somente em dias úteis).

          </p>
          <p>
            Para Empresas com mais de 02 anos de CNPJ ativo, analisamos a possibilidade de Faturamento mediante a um cadastro.

          </p>






          <p>
            Para mais informações fale com nosso SAC através do telefone 11 4168 1725 ou whatsapp 11 4161 8448.

          </p>



        </div>
      </div>
    </LayoutDefault>
  );
}
