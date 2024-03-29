export interface Cliente {
	auth:boolean, 
	id:number, 
	token_me:string, 
	token:string, 
	users_client_affiliate_id:number, 
	users_client_name:string,
	users_client_mail:string,
	users_client_telefone:string,         
	users_client_cpf:string,
	users_client_endereco:string,
	users_client_cep:string,
	users_client_bairro:string,
	users_client_cidade:string,
	users_client_estado:string,
	users_client_listas_compras:string,
	users_client_complemento:string,
	users_client_numero:string,
}

export interface REVENUE{
	title?:string,
	banner_topo?: string,
	id?: number,
	status?: number,
	tempo_minutos?: number,
	porcoes?: number,
	ingredientes?: string,
}

export interface REVENUE_CATEGORIE{
	name?:string,
	image?: string,
	id?: number,
	status?: number, 
}
 
 



