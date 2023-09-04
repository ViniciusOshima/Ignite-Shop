import { stripe } from "@/lib/stripe";
import { SuccesContainer, ImageContainer, ImagesContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Stripe from "stripe";

interface ProductProps {
  length: ReactNode;
  map(arg0: (product: ProductProps) => import("react").JSX.Element): import("react").ReactNode;
  name: string;
  imageUrl: string;
  id: string
}

interface SuccessProps {
  customerName: string;
  products: ProductProps
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name='robots' content='noindex' />
      </Head>

      <SuccesContainer>
        <ImagesContainer>
          {products.map((product: ProductProps) => {
            return <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          })}
        </ImagesContainer>

        <h1>Compra Efetuada!</h1>


        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length === 1 ? <strong>{products[0].name}</strong> : <strong> {products.length} camisetas</strong>}  já esta a caminho de sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo</Link>
      </SuccesContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details ? session.customer_details.name : ''

  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      name: item.description,
      imageUrl: product.images[0],
      id: item.id
    }
  })


  return {
    props: {
      customerName,
      products
    }
  }
}