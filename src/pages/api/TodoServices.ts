import { Categorie } from "@models/Categorie"
import { Order } from "@models/Order"
import { Product } from "@models/Product"
import { Product2 } from "@models/Product2"

import { Api } from "@components/providers"
import { useState } from "react";
import { OrderSent } from "@models/OrderSent"
import { ProductOrder } from "@models/ProductOrder"



let affID = Number(process.env.AFFILIATE_ID)

const getAll = (AFFILIATE_ID: number, MASTER_ID: number) => Api.post<Categorie[]>('/getCatList', { affiliate_id: AFFILIATE_ID, master_id: MASTER_ID, limit: 50 })
const getMyOrders = (AFFILIATE_ID: number, clientId: number, myToken: string) => Api.post<Order[]>('/getMyOrders', { affiliate_id: AFFILIATE_ID, client_id: clientId }, { headers: { 'x-access-token': myToken } })
const getMyCart = (AFFILIATE_ID: number, clientId: number, myToken: string) => Api.post<Order[]>('/getMyCart', { affiliate_id: AFFILIATE_ID, client_id: clientId }, { headers: { 'x-access-token': myToken } })



const getAllProducts = (AFFILIATE_ID: number, lastID: number) => Api.post<Product2[]>('/showProducts', { affiliate_id: AFFILIATE_ID, lastID: lastID, totalItems: 6 })
const getProductsSearchCat = (AFFILIATE_ID: number, lastID: number, limit: number, text: string) => Api.post<Product2[]>('/productSearchCat', { product_affiliate_id: AFFILIATE_ID, product_site_name: text, product_code: text, lastID: lastID, totalItems: limit })
const getProductsSearchCat2 = (AFFILIATE_ID: number, lastID: number, limit: number, text: string) => Api.post<Product2[]>('/productSearchCat2', { product_affiliate_id: AFFILIATE_ID, product_site_name: text, product_code: text, lastID: lastID, totalItems: limit })
const getProductsSearch = (AFFILIATE_ID: number, lastID: number, limit: number, text: string) => Api.post<Product2[]>('/productSearchSite', { product_affiliate_id: AFFILIATE_ID, product_site_name: text, product_code: text, lastID: lastID, totalItems: limit }, { headers: { "Content-Type": "application/json" } })

const getAllRelatedProducts = (AFFILIATE_ID: number, number: number[]) => Api.post<Product2[]>('/listaIds', { product_list_ids: number, affiliate_id: affID })
const getAllOrderItems = (AFFILIATE_ID: number, items: OrderSent[]) => Api.post<ProductOrder[]>('/getAllOrderItems', { product_list_ids: items, affiliate_id: AFFILIATE_ID })

const getProductformation = (AFFILIATE_ID: number, number: number) => Api.post<Product2[]>('/getProductInformation', { affiliate_id: AFFILIATE_ID, product_code: number })


export const TodoService = {
	getAll, getAllRelatedProducts, getProductformation, getAllProducts, getMyOrders, getAllOrderItems, getMyCart, getProductsSearch, getProductsSearchCat, getProductsSearchCat2
}