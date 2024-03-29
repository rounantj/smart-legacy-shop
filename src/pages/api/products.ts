// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../domain/models/Product'

type Data = Array<Product>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 
  res.status(200).json(
		[
			{
				id: 1,
				name: 'Abacate lorem ipsum sit amen dolor consec',
				img: 'produto_teste.png',
				production_type: 'Produção própria',
				units: 1,
				rating: 5,
				price: 3.5,
				promotional_price: 2.5,
				category: 'Vegano'
			},
			{
				id: 2,
				name: 'Abacate lorem ipsum sit amen dolor consec',
				img: 'produto_teste.png',
				production_type: 'Produção própria',
				units: 1,
				rating: 5,
				price: 3.5,
				promotional_price: 2.5,
				category: 'Vegano'
			},
			{
				id: 3,
				name: 'Abacate lorem ipsum sit amen dolor consec',
				img: 'produto_teste.png',
				production_type: 'Produção própria',
				units: 1,
				rating: 5,
				price: 3.5,
				promotional_price: 2.5,
				category: 'Vegano'
			},
			{
				id: 4,
				name: 'Abacate lorem ipsum sit amen dolor consec',
				img: 'produto_teste.png',
				production_type: 'Produção própria',
				units: 1,
				rating: 5,
				price: 3.5,
				promotional_price: 2.5,
				category: 'Vegano'
			},
			{
				id: 5,
				name: 'Abacate lorem ipsum sit amen dolor consec',
				img: 'produto_teste.png',
				production_type: 'Produção própria',
				units: 1,
				rating: 5,
				price: 3.5,
				promotional_price: 2.5,
				category: 'Vegano'
			}
		]
	)

}
