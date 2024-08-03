import { Api } from "@components/providers";


export async function verifyAccoutability(products: any, valorTotal: number, cpfClient: string) {
    // console.log('calculando', valorTotal, cpfClient)
    const myOffers = await Api.post(process.env.SMART_API + '/getById_public', {
        "table": "promocoes_cupons",
        "id_name": "affiliate_id",
        "id_value": Number(process.env.AFFILIATE_ID),
    })

    cpfClient = cpfClient.replace('.', '').replace('.', '').replace('-', '')
    let promocoes = []
    for (const k in myOffers.data) {
        promocoes.push(JSON.parse(myOffers.data[k].content))
    }
    let discountList = []


    for (const k in promocoes) {
        let discountValue = 0, isGranted = false, isValid = false
        if (!promocoes[k].accumulation
            .denyAccumulation && promocoes[k].accumulation
                .grantAccumulation) {
            // pode acumular

            if (
                promocoes[k].applicability.allProducts ||
                verifyCat(products, promocoes[k].applicability.especificCategoriesValue
                ) && promocoes[k].applicability.especificCategories ||
                verifyTag(products, promocoes[k].applicability.especificTagsValue
                ) && promocoes[k].applicability.especificTags || promocoes[k].cupom.fromCPF && promocoes[k].cupom.toCPF === cpfClient) {
                if (promocoes[k].type.percentActive) {
                    //   console.log("ESTOU NESTA SITUAÇÃO", promocoes[k], valorTotal)
                    discountValue = (valorTotal * (Number(promocoes[k].type.percent) / 100))
                    //    console.log("O CDE", discountValue)
                } else if (promocoes[k].type.valueActive) {
                    discountValue = valorTotal - (valorTotal - Number(promocoes[k].type.value))
                }

                let clientLimitation = false
                if (promocoes[k].clientLimits.withoutLimits) {
                    clientLimitation = true
                } else {
                    if (promocoes[k].clientLimits.byTotalActive) {
                        // limita o uso por cliente

                    } else if (promocoes[k].clientLimits.onFirstPurchase) {
                        // limita a primeira compra
                    }
                }

                let marketLimitation = false
                if (promocoes[k].marketLimits.withoutLimits) {
                    marketLimitation = true
                } else {
                    if (promocoes[k].marketLimits.byTotalActive) {
                        // limita o uso por cliente

                    } else if (promocoes[k].marketLimits.onFirstPurchase) {
                        // limita a primeira compra
                    }
                }

                let required = false

                if (promocoes[k].requires.totalFromCartActive) {
                    if (Number(promocoes[k].requires.totalFromCart) <= valorTotal) {
                        required = true
                    }
                }
                if (promocoes[k].requires.totalInCartActive) {
                    if (promocoes[k].requires.totalInCart <= products.length) {
                        required = true
                    }
                }
                if (promocoes[k].requires.withoutRequires) {
                    required = true
                }

                let validate = false
                if (promocoes[k].validate.especificDate) {
                    if (new Date() <= promocoes[k].validate.dateEnd
                        && new Date() >= promocoes[k].validate.dateStart) {
                        validate = true
                    }
                }
                if (promocoes[k].validate.withoutTimeLimits) {
                    validate = true
                }

                if (clientLimitation && marketLimitation && required && validate) {
                    let valor = 0
                    if (discountValue <= valorTotal && discountValue > 0) {
                        valor = discountValue
                    } else {
                        if (discountValue > 0) {
                            valor = valorTotal
                        }
                    }
                    discountList.push({
                        valorTotal, desconto: valor, cupom: promocoes[k]?.cupom ?? false, type: promocoes[k].main.type
                    })
                }










            } else {
                //   console.log("Não se aplica a esta promoção " + promocoes[k].main.name)
            }

        } else {
            // não pode acumular
            if (
                promocoes[k].applicability.allProducts && discountList.length === 0 ||
                verifyCat(products, promocoes[k].applicability.especificCategoriesValue && discountList.length === 0
                ) && promocoes[k].applicability.especificCategories && discountList.length === 0 ||
                verifyTag(products, promocoes[k].applicability.especificTagsValue && discountList.length === 0
                ) && promocoes[k].applicability.especificTags && discountList.length === 0 || promocoes[k].cupom.fromCPF && promocoes[k].cupom.toCPF === cpfClient) {
                if (promocoes[k].type.percentActive) {
                    discountValue = valorTotal - (valorTotal * (promocoes[k].type.percent / 100))
                } else if (promocoes[k].type.valueActive) {
                    discountValue = valorTotal - (valorTotal - Number(promocoes[k].type.value))
                }


                let clientLimitation = false
                if (promocoes[k].clientLimits.withoutLimits) {
                    clientLimitation = true
                } else {
                    if (promocoes[k].clientLimits.byTotalActive) {
                        // limita o uso por cliente

                    } else if (promocoes[k].clientLimits.onFirstPurchase) {
                        // limita a primeira compra
                    }
                }

                let marketLimitation = false
                if (promocoes[k].marketLimits.withoutLimits) {
                    marketLimitation = true
                } else {
                    if (promocoes[k].marketLimits.byTotalActive) {
                        // limita o uso por cliente

                    } else if (promocoes[k].marketLimits.onFirstPurchase) {
                        // limita a primeira compra
                    }
                }

                let required = false

                if (promocoes[k].requires.totalFromCartActive) {
                    if (Number(promocoes[k].requires.totalFromCart) <= valorTotal) {
                        required = true
                    }
                }
                if (promocoes[k].requires.totalInCartActive) {
                    if (promocoes[k].requires.totalInCart <= products.length) {
                        required = true
                    }
                }
                if (promocoes[k].requires.withoutRequires) {
                    required = true
                }

                let validate = false
                if (promocoes[k].validate.especificDate) {
                    if (new Date() <= promocoes[k].validate.dateEnd
                        && new Date() >= promocoes[k].validate.dateStart) {
                        validate = true
                    }
                }
                if (promocoes[k].validate.withoutTimeLimits) {
                    validate = true
                }

                if (clientLimitation && marketLimitation && required && validate) {
                    let valor = 0
                    if (discountValue <= valorTotal && discountValue > 0) {
                        valor = discountValue
                    } else {
                        if (discountValue > 0) {
                            valor = valorTotal
                        }
                    }
                    discountList.push({
                        valorTotal, desconto: valor, cupom: promocoes[k]?.cupom ?? false, type: promocoes[k].main.type
                    })
                }



            } else {
                //   console.log("Não se aplica a esta promoção " + promocoes[k].main.name)
            }

        }


    }

    //console.log('myOffers', 'myCPF ' + cpfClient, products, promocoes)
    return discountList

}

function verifyCat(products: any, list: []) {
    let isValid = false

    for (const k in products) {
        let name = products[k]?.product_categoria.split(",")
        let name2 = products[k]?.product_site_categories.split(",")
        try {
            name.map((N: string) => {
                if (list.find((f) => f === N)) {
                    isValid = true
                }
            })

        } catch (err) {

        }

        try {
            name2.map((N: string) => {
                if (list.find((f) => f === N)) {
                    isValid = true
                }
            })

        } catch (err) {

        }


    }

    return isValid
}
function verifyTag(products: any, list: []) {
    let isValid = false

    for (const k in products) {
        let name = products[k]?.product_etiquetas.split(",")
        let name2 = products[k]?.product_site_tags.split(",")
        try {
            name.map((N: string) => {
                if (list.find((f) => f === N)) {
                    isValid = true
                }
            })

        } catch (err) {

        }

        try {
            name2.map((N: string) => {
                if (list.find((f) => f === N)) {
                    isValid = true
                }
            })

        } catch (err) {

        }
    }

    return isValid
}