export interface Order {
	id: number,
	order_affiliate_id: number,
	order_client_id: number,
	order_status: string,
	order_data_entrega: Date,
	order_metodo_entrega: string,
	order_metodo_pagamento: string,
	order_local_pagamento: string,
	order_cpf_nf: string,
	order_tamanho_cesta: string,
	order_general_comment: string,
	order_conteudo: string,
	order_valor_total: number,
	order_valor_entrega: number,
	order_payment_data?: string
	updatedAt: Date,
	createdAt: Date,
}




