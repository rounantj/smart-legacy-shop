export interface ProductOrder {
  id: number;
  product_affiliate_id: number;
  product_code: number;
  product_ean: string;
  product_descricao: string;
  product_valor: number;
  product_site_value?: number;
  product_site_discount_value?: string;
  product_site_discount_type?: string;
  product_sell_by_weight?: string;
  product_site_name?: string;
  product_categoria: string;
  product_fabricacao: string;
  product_estoque: string;
  product_medida: string;
  product_etiquetas: string;
  product_thumbnail: string;
  comentario: string;
  caracteristica: string;
  quantidade: number;
  valor: number;
  desconto: number;
  minimo_para_desconto?: number
}
