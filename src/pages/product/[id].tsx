import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/products"

import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"

import Stripe from "stripe"
import { stripe } from "@/lib/stripe"

import { useRouter } from "next/router"

import Head from "next/head"

import { useContext } from "react"
import { CartContext } from "../_app"

import { v4 } from 'uuid'


interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
    priceWithoutFormat: number
  }
}

export default function Product({ product }: ProductProps) {
  const { AddShirtToCart } = useContext(CartContext)

  function handleAddShirtToCart() {
    AddShirtToCart({
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      priceWithoutFormat: product.priceWithoutFormat,
      priceId: product.defaultPriceId,
      id: v4()
    })
  }

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleAddShirtToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>


  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params ? params.id : '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100) : 0,
        description: product.description,
        defaultPriceId: price.id,
        priceWithoutFormat: price.unit_amount
      }
    },
    revalidate: 60 * 60 * 1
  }
}