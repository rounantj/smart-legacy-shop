import Product from "@components/Modals/AssinaturaContent/Product";
import { text } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "src/pages/_app";
import { Api } from "@components/providers";
import { Product2, PRODUTO_FINAL, VENDA } from "./Product2";

export function mphone(e: React.FormEvent<HTMLInputElement>) {
    var v = e.currentTarget.value
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "(0XX$1) $2-$3");
    }
    else if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "(0XX$1) $2-$3");
    }
    else if (r.length > 2) {
        // 3..5 digits. Add (0XX..)
        r = r.replace(/^(\d\d)(\d{0,5})/, "(0XX$1) $2");
    }
    else {
        // 0..2 digits. Just add (0XX
        r = r.replace(/^(\d*)/, "(0XX$1");
    }
    e.currentTarget.value = r
    return e;
}

export function cepMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{5})(\d)/g, "$1-$2")
    e.currentTarget.value = value
    return e;
}
function checkObject(obj: any) {
    return typeof obj === 'object' && obj !== null;
}
export function ajustStrigfy(texto: string): string {
    //console.log("TENTANOD ESSE", texto)
    if (checkObject(texto)) {
        return JSON.stringify(texto)
    }
    try {
        const test = JSON.parse(texto)
        return JSON.stringify(test)
    } catch (parseError) {
        //console.log("Não parsou", texto)
        //console.log(parseError)
    }



    try {
        texto = texto.replace(/\"\[/gm, "[").replace(/\]\"/gm, "]").replace(/\\n\\r/gm, '').replace(/(\r\n|\n|\r)/gm, "")
        texto = texto.replace(/\n\r/g, '')
        texto = texto.replace(/"{/g, '{').replace(/}"/g, '}')
        texto = texto.replace('"[', '[').replace(']"', ']');
        texto = texto.replace(/\"\[/g, '[').replace(/\]"/g, ']');
        texto = texto.replace(/\\"/g, '"').replace(/\/"/g, '"');
        return JSON.stringify(JSON.parse(texto))
    } catch (parseError) {
        //console.log("ESSE NAO FOI", texto)
        //console.log(parseError)
    }





    if (texto != '' && texto.indexOf('[object Obj') <= 0) {
        try {
            for (let a = 0; a < 2; a++) {
                texto = texto.replace(/"{/g, '{').replace(/}"/g, '}')
                texto = texto.replace('"[', '[').replace(']"', ']');
                texto = texto.replace(/\\"/g, '"').replace(/\/"/g, '"');
            }
            try {
                //console.log(JSON.parse(texto))
                return JSON.stringify(JSON.parse(texto))
            } catch (parseError) {
                //console.log("ESSE NAO FOI DENOVO", texto)
                //console.log(parseError)
                return texto
            }


        } catch (erro) {
            //console.log('parei aqui', erro)
            //console.log('parei aqui ->', texto)
            return texto
        }
        return texto
    } else {
        //console.log('ruim ->', texto)
        return '[]'
    }


}


export function cpfMask(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")

    e.currentTarget.value = value
    return e;
}
export function cpfMask2(e: React.FormEvent<HTMLInputElement>, callback: any) {
    let maxLength = 14;
    let value = e.currentTarget.value;

    value = value.replace(/\D/g, "");

    if (value.length > 11) {
        maxLength = 18;
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    e.currentTarget.maxLength = maxLength;
    e.currentTarget.value = value;
    if (callback) {
        callback(value)
    }
    return e;
}


export function cpfMaskValue(cpf: string) {

    let value = cpf;
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")

    return value;
}

export function cpfMaskString(value: string) {

    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")

    return value;
}

export function validarEmail(e: React.FormEvent<HTMLInputElement>) {
    let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.currentTarget.value.trim().match(validarRegExNoEmail)) {
        return true;
    } else {
        return false;
    }
}

export function validarEmailText(value: string) {
    let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(validarRegExNoEmail)) {
        return true;
    } else {
        return false;
    }
}
export function validarEmailString(value: string) {
    value = value.replace('.tech', '.com')
    let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(validarRegExNoEmail)) {
        return true;
    } else {
        return false;
    }
}

export function isMyArea(cep: string) {
    let ceps = localStorage.getItem("MY_DELIVERY_AREA")
    let myCEP: number = Number(cep.replace(/-/g, ''))
    if (ceps == null) {
        ceps = '[]'
    }
    let cepsJSON = JSON.parse(ajustStrigfy(ceps))

    let imIn: boolean = false
    for (const k in cepsJSON) {

        if (myCEP >= Number(cepsJSON[k].valor1.replace(/-/g, "")) && myCEP <= Number(cepsJSON[k].valor2.replace(/-/g, ""))) {
            imIn = true
        }
    }
    ////  ////console.log('is my area',cep,imIn)

    return imIn
}

export function isCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0)))
        return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(1)))
        return false;
    return true;
}


export function isCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}


export function isEmail(search: string): boolean {
    var serchfind: boolean;

    var regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');

    serchfind = regexp.test(search);


    return serchfind
}

export async function setProductToList(produto: Product2) {

    localStorage.setItem('PRODUCT_TO_LIST', JSON.stringify(produto))

}


export function FULL_PRICES(produto: Product2) {
    try {
        //console.log("PREPRANDO O PRODUTO ", produto)
        let PRODUDO_FINAL: PRODUTO_FINAL
        let COMPRA_PESO = {}, COMPRA_POR_PESO = false

        try {
            COMPRA_POR_PESO = JSON.parse(ajustStrigfy(produto['product_sell_by_weight']))['compraPorPeso']
        } catch (e) { }

        let DESCONTOS: any = {}
        try {
            DESCONTOS = JSON.parse(ajustStrigfy(produto['product_site_discount_value']))
        } catch (err) {

        }
        let VENDA: VENDA;
        let MINIMO_PARA_DESCONTO = 0
        let VALOR_DESCONTO: number = 0, descontoExiste: boolean = false, valorDescontado: number | string = 0, tipoDesconto = 'nenhum'

        //////console.log('o desconto',produto['product_site_discount_type'].indexOf('preço total'))
        //console.log('DESCONTOS', DESCONTOS)
        if (produto['product_site_discount_type'].indexOf('compre X pague Y') > -1) {

            let PERCENTUAL_DESCONTADO = (100 - (DESCONTOS['levePague'].precoFinal * 100 / DESCONTOS['levePague'].precoProduto)) / 100
            if (PERCENTUAL_DESCONTADO < 0) {
                //console.log("arrumando", PERCENTUAL_DESCONTADO, (-1))
                PERCENTUAL_DESCONTADO = PERCENTUAL_DESCONTADO * (-1)
            }
            //console.log('PERCENTUAL_DESCONTADO 1', PERCENTUAL_DESCONTADO)
            if (DESCONTOS['levePague'].precoProduto > produto['product_site_value']) {
                VALOR_DESCONTO = produto['product_site_value'] * PERCENTUAL_DESCONTADO
                //console.log('PERCENTUAL_DESCONTADO EM UNIDADE', VALOR_DESCONTO)
            } else {
                VALOR_DESCONTO = DESCONTOS['levePague'].precoFinal
            }


            tipoDesconto = "levePague"
            valorDescontado = DESCONTOS['levePague'].valorDescontado
            MINIMO_PARA_DESCONTO = Number(DESCONTOS['levePague'].valorDescontado?.split(" ")[1])
            descontoExiste = true
        } else if (produto['product_site_discount_type'].indexOf('no carrinho') > -1) {
            if (DESCONTOS['porcentagemProduto'].active) {
                //////console.log(DESCONTOS)

                let PERCENTUAL_DESCONTADO = (100 - (DESCONTOS['porcentagemProduto'].precoFinal * 100 / DESCONTOS['porcentagemProduto'].precoProduto)) / 100
                if (PERCENTUAL_DESCONTADO < 0) {
                    //console.log("arrumando", PERCENTUAL_DESCONTADO, (-1))
                    PERCENTUAL_DESCONTADO = PERCENTUAL_DESCONTADO * (-1)
                }

                //console.log('PERCENTUAL_DESCONTADO 2', PERCENTUAL_DESCONTADO)
                if (DESCONTOS['porcentagemProduto'].precoProduto > produto['product_site_value']) {
                    VALOR_DESCONTO = produto['product_site_value'] * PERCENTUAL_DESCONTADO
                    //console.log('PERCENTUAL_DESCONTADO EM UNIDADE', VALOR_DESCONTO)
                } else {
                    VALOR_DESCONTO = DESCONTOS['porcentagemProduto'].precoFinal
                }


                descontoExiste = true
                valorDescontado = Number(DESCONTOS['porcentagemProduto'].percentualDescontado)
                tipoDesconto = "percentual"
            }

            if (DESCONTOS['subtracaoProduto'].active) {

                let PERCENTUAL_DESCONTADO = (100 - (DESCONTOS['subtracaoProduto'].precoFinal * 100 / DESCONTOS['subtracaoProduto'].precoProduto)) / 100

                if (PERCENTUAL_DESCONTADO < 0) {
                    //console.log("arrumando", PERCENTUAL_DESCONTADO, (-1))
                    PERCENTUAL_DESCONTADO = PERCENTUAL_DESCONTADO * (-1)
                }
                //console.log('PERCENTUAL_DESCONTADO 3', PERCENTUAL_DESCONTADO)
                if (DESCONTOS['subtracaoProduto'].precoProduto > produto['product_site_value']) {
                    VALOR_DESCONTO = produto['product_site_value'] * PERCENTUAL_DESCONTADO
                    //console.log('PERCENTUAL_DESCONTADO EM UNIDADE', VALOR_DESCONTO)
                } else {
                    VALOR_DESCONTO = DESCONTOS['subtracaoProduto'].precoFinal
                }


                descontoExiste = true
                valorDescontado = Number(DESCONTOS['subtracaoProduto'].valorDescontado)
                tipoDesconto = "subtracao"
            }


        } else if (produto['product_site_discount_type'].indexOf('preço total') > -1) {
            //////console.log('tebgo descobto')
            if (DESCONTOS['porcentagem'].active) {
                //////console.log(DESCONTOS)

                let PERCENTUAL_DESCONTADO = (100 - (DESCONTOS['porcentagem'].precoFinal * 100 / DESCONTOS['porcentagem'].precoProduto)) / 100

                if (PERCENTUAL_DESCONTADO < 0) {
                    //console.log("arrumando", PERCENTUAL_DESCONTADO, (-1))
                    PERCENTUAL_DESCONTADO = PERCENTUAL_DESCONTADO * (-1)
                }
                //console.log('PERCENTUAL_DESCONTADO 4', PERCENTUAL_DESCONTADO)
                if (DESCONTOS['porcentagem'].precoProduto > produto['product_site_value']) {
                    VALOR_DESCONTO = produto['product_site_value'] * PERCENTUAL_DESCONTADO
                    //console.log('PERCENTUAL_DESCONTADO EM UNIDADE', VALOR_DESCONTO)
                } else {
                    VALOR_DESCONTO = DESCONTOS['porcentagem'].precoFinal
                }

                descontoExiste = true
                valorDescontado = Number(DESCONTOS['porcentagem'].percentualDescontado)
                tipoDesconto = "porcentagem"
            }

            if (DESCONTOS['subtracao'].active) {
                //////console.log(DESCONTOS)

                let PERCENTUAL_DESCONTADO = (100 - (DESCONTOS['subtracao'].precoFinal * 100 / DESCONTOS['subtracao'].precoProduto)) / 100

                if (PERCENTUAL_DESCONTADO < 0) {
                    //console.log("arrumando", PERCENTUAL_DESCONTADO, (-1))
                    PERCENTUAL_DESCONTADO = PERCENTUAL_DESCONTADO * (-1)
                }
                //console.log('PERCENTUAL_DESCONTADO 5', PERCENTUAL_DESCONTADO)
                if (DESCONTOS['subtracao'].precoProduto > produto['product_site_value']) {
                    VALOR_DESCONTO = produto['product_site_value'] * PERCENTUAL_DESCONTADO
                    //console.log('PERCENTUAL_DESCONTADO EM UNIDADE', VALOR_DESCONTO)
                } else {
                    VALOR_DESCONTO = DESCONTOS['subtracao'].precoFinal
                }

                descontoExiste = true
                valorDescontado = Number(DESCONTOS['subtracao'].valorDescontado)
                tipoDesconto = "subtracao"
            }
        } else {
            //////console.log('desconto inexistente!', descontoExiste)
        }
        //validacao atacado
        if (produto.product_valor_atacado && produto.product_quantidade_atacado) {
            VALOR_DESCONTO = produto.product_valor_atacado
            tipoDesconto = "atacado"
            valorDescontado = produto.product_valor - produto.product_valor_atacado
            MINIMO_PARA_DESCONTO = produto.product_quantidade_atacado
            descontoExiste = true
        }











        let PRECO_VENDA = produto['product_valor']

        if (COMPRA_PESO === true) {
            PRECO_VENDA = produto['product_site_value']
        }

        if (descontoExiste) {
            //////console.log(" O DESCONTO ",VALOR_DESCONTO)
            PRECO_VENDA = VALOR_DESCONTO
        }

        if (COMPRA_PESO === true) {
            let percentual = produto['product_site_value'] * 100 / produto['product_valor']
            let AJUSTAR = 100 - percentual

            //////console.log("ajustando",percentual,AJUSTAR, PRECO_VENDA)

            PRECO_VENDA = PRECO_VENDA * (AJUSTAR / 100)
            VALOR_DESCONTO = VALOR_DESCONTO * (AJUSTAR / 100)

            if (produto['product_average_weight_type'] == 'gramas') {
                VALOR_DESCONTO = VALOR_DESCONTO * Number(produto['product_average_weight_value']) / 1000
                PRECO_VENDA = PRECO_VENDA * Number(produto['product_average_weight_value']) / 1000
            }
            if (produto['product_average_weight_type'] == 'centimetros') {
                VALOR_DESCONTO = VALOR_DESCONTO * Number(produto['product_average_weight_value']) / 100
                PRECO_VENDA = PRECO_VENDA * Number(produto['product_average_weight_value']) / 100
            }


            VENDA = {
                valor_bruto: produto['product_site_value'],
                preco_venda: Number(PRECO_VENDA.toFixed(2)),
                existe_desconto: descontoExiste,
                valor_com_desconto: VALOR_DESCONTO,
                origem_desconto: produto['product_site_discount_type'],
                venda_por_peso: COMPRA_POR_PESO,
                tipo_desconto: tipoDesconto,
                percentual_valor_descontado: valorDescontado,
                peso_por_unidade: Number(produto['product_average_weight_value']),
                medida_da_unidade: produto['product_average_weight_type'],
                minimo_para_desconto: MINIMO_PARA_DESCONTO
            }



        } else {
            VENDA = {
                valor_bruto: produto['product_valor'],
                preco_venda: Number(PRECO_VENDA.toFixed(2)),
                existe_desconto: descontoExiste,
                valor_com_desconto: VALOR_DESCONTO,
                origem_desconto: produto['product_site_discount_type'],
                venda_por_peso: COMPRA_POR_PESO,
                tipo_desconto: tipoDesconto,
                percentual_valor_descontado: valorDescontado,
                peso_por_unidade: Number(produto['product_average_weight_value']),
                medida_da_unidade: produto['product_average_weight_type'],
                minimo_para_desconto: MINIMO_PARA_DESCONTO
            }
        }



        PRODUDO_FINAL = {
            produto: produto,
            venda: VENDA
        }



        return PRODUDO_FINAL

    } catch (err) {
        let VALOR_DESCONTO = produto['product_valor'], MINIMO_PARA_DESCONTO = 0, tipoDesconto = 'nenhum', valorDescontado = 0, descontoExiste = false
        if (produto.product_valor_atacado && produto.product_quantidade_atacado) {
            VALOR_DESCONTO = produto.product_valor_atacado
            tipoDesconto = "atacado"
            valorDescontado = produto.product_valor - produto.product_valor_atacado
            MINIMO_PARA_DESCONTO = produto.product_quantidade_atacado
            descontoExiste = true
        }

        let VENDA: VENDA = {
            valor_bruto: produto['product_valor'],
            preco_venda: VALOR_DESCONTO,
            existe_desconto: descontoExiste,
            valor_com_desconto: VALOR_DESCONTO,
            origem_desconto: produto['product_site_discount_type'],
            venda_por_peso: false,
            tipo_desconto: tipoDesconto,
            percentual_valor_descontado: valorDescontado,
            peso_por_unidade: Number(produto['product_average_weight_value']),
            medida_da_unidade: produto['product_average_weight_type'],
            minimo_para_desconto: MINIMO_PARA_DESCONTO
        }



        let PRODUDO_FINAL = {
            produto: produto,
            venda: VENDA
        }

        return PRODUDO_FINAL

    }

}


export async function MY_RELATEDS_DEFAULT(product_code: number, category: string) {
    ////console.log(product_code, category)
    let myRelateds: number[] = []
    await Api.post('/getRealatedsDefault', { affiliate_id: process.env.AFFILIATE_ID, category: category, product_code: product_code }).then(response => {

        ////console.log(response.data)
        for (const k in response.data) {
            myRelateds.push(response.data[k].product_code)
        }
        ////console.log('myRelateds', myRelateds)


    }).catch(err => {
        ////console.log('caiu no erro', err)

    })
    return myRelateds
}

export function saveMarketingMail(mail: string) {

    Api.post(
        "/salvaEmailPublicidade",
        {
            mail: mail,
            affiliate_id: process.env.AFFILIATE_ID
        }
    )
        .then((response) => {
            ////console.log(response)
            ////console.log("salvo com sucesso!")

        })
        .catch(async (error) => {

            ////console.log(error)
        });
}



function OrdenaJson(lista: any, chave: string, ordem: string) {
    return lista.sort(function (a: any, b: any) {
        var x = a[chave];
        var y = b[chave];
        if (ordem === 'ASC') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (ordem === 'DESC') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

export async function getMunicipios(UF: string, setFunction: any) {
    await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/distritos`).then(response => {
        ////// console.log(response)
        let info = []
        for (const k in response.data) {
            const { nome } = response.data[k]
            const state = response.data[k].municipio.microrregiao.mesorregiao.UF.nome
            info.push({ city: nome, state: state })
        }
        setFunction(info)

    }).catch(error => {
        return ['null']
        ////// console.log(error) 
    })

}



