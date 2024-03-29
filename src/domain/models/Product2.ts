

export interface Product2 {
  id: number;
  product_affiliate_id: number;
  product_code: number;
  product_ean: string;
  uploadImages: string;
  product_descricao: string;
  product_valor: number;
  product_categoria: string;
  product_fabricacao: string;
  product_status: string;
  product_estoque: string;
  product_medida: string;
  product_etiquetas: string;
  product_thumbnail: string;
  product_site_tags: string;
  product_site_name: string;
  product_site_description: string;
  product_site_categories: string;
  product_site_variations: string;
  product_site_info: string;
  product_site_nutrition: string;
  product_site_value: number;
  product_site_discount_value: string;
  product_site_discount_type: string;
  product_sell_by_weight: string;
  product_average_weight_value: string;
  product_average_weight_type: string;
  product_site_related_title: string;
  product_site_related_type: string;
  product_site_related_code: string;
  product_valor_atacado?: number;
  product_quantidade_atacado?: number;
}

export interface VENDA {
  valor_bruto: number,
  preco_venda: number
  existe_desconto: boolean,
  valor_com_desconto: number,
  origem_desconto: string,
  venda_por_peso: boolean,
  percentual_valor_descontado: number | string,
  tipo_desconto: number | string,
  peso_por_unidade: number,
  medida_da_unidade: string,
  minimo_para_desconto: number
}

export interface PRODUTO_FINAL {
  produto: Product2;
  venda: VENDA

}


export interface LISTA_COMPRA {
  id?: number,
  lista_affiliate_id: number,
  lista_client_id: number,
  lista_name: string,
  lista_conteudo: string,
  updatedAt?: string,
  createdAt?: string
}
export interface BUYER {
  cpf_cnpj: string,
  email: string,
  name: string,
  phone: string,
}

export interface shipayItems {
  ean: string,
  item_title: string,
  quantity: number,
  unit_price: number
}
export interface ShipayPaymentCreate {
  buyer: BUYER,
  callback_url: string,
  items: shipayItems[],
  order_ref: string,
  pix_dict_key: string,
  total: number,
  wallet: string

}

