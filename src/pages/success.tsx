import { stripe } from "@/lib/stripe";
import { SuccesContainer, ImageContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ customerName, products }: SuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name='robots' content='noindex' />
      </Head>

      <SuccesContainer>
        <h1>Compra Efetuada!</h1>

        <ImageContainer>
          <Image src={products.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{products.name}</strong> já está a caminho de sua casa.
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
  const product = session.line_items?.data[0].price?.product as Stripe.Product


  return {
    props: {
      customerName,
      products: {
        name: product.name,
        imageUrl: product.images[0],
      }

    }
  }
}