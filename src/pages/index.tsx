import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, Product } from '@/styles/pages/home'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Handbag } from 'phosphor-react'
import { v4 } from 'uuid'

import { CartContext, CartProps } from './_app'
import { useContext } from 'react'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceWithoutFormat: number
    defaultPriceId: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { AddShirtToCart } = useContext(CartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  function handleAddShirtToCart({ name, imageUrl, price, priceWithoutFormat, priceId, id }: CartProps) {
    AddShirtToCart(
      {
        name,
        imageUrl,
        price,
        priceWithoutFormat,
        priceId,
        id
      }
    )
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => {
          return (

            <Product className='keen-slider__slide' key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt='' />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button onClick={() => {
                  const shirt = {
                    name: product.name,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    priceWithoutFormat: product.priceWithoutFormat,
                    priceId: product.defaultPriceId,
                    id: v4()
                  }

                  handleAddShirtToCart(shirt)
                }}><Handbag weight="bold" size={24} /></button>
              </footer>
            </Product>

          )
        })}
      </HomeContainer >
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100) : 0,
      priceWithoutFormat: price.unit_amount,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2
  }
}