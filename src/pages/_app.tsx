import { globalStyles } from "@/styles/global"
import { AppProps } from "next/app"

import logoImg from '../assets/logo.svg'
import { Container, Header, Content, Title, CloseButtom, BgImage, ProductItem, ProductItemInfo, ItemsCart, TotalInfoCart, InfoCart } from "@/styles/pages/app"

import Image from 'next/image'
import { Handbag, X } from "phosphor-react"

import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from "next/link"

import { createContext, useState } from "react"
import axios from "axios"

interface CartContextType {
  cart: CartProps[]
  AddShirtToCart: ({ }: CartProps) => void
}

interface CartProps {
  name: string
  imageUrl: string
  price: number
  priceId: string
}

interface ProductsId {
  price: string
  quantity: number
}

export const CartContext = createContext({} as CartContextType)

globalStyles()

function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<CartProps[]>([])

  const [productsId, setProductsId] = useState<ProductsId[]>([])

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  function AddShirtToCart(shirt: CartProps) {
    setCart((prevCart) => [...prevCart, {
      name: shirt.name,
      imageUrl: shirt.imageUrl,
      price: shirt.price,
      priceId: shirt.priceId
    }])

    setProductsId((prev) => [...prev, {
      price: shirt.priceId,
      quantity: 1
    }])
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: productsId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl

    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('falha ao redirecionar o checkout!')
    }
  }

  return (
    <CartContext.Provider value={{ cart, AddShirtToCart }}>
      <Container>
        <Header>
          <Link href={'/'}>
            <Image src={logoImg} alt="" />
          </Link>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button><Handbag weight="bold" size={24} /></button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay />
              <Content>
                <Title>Sacola de compras</Title>

                <ScrollArea.Root>
                  <ItemsCart>
                    {cart ? cart.map((item) => {
                      return <ProductItem key={item.priceId}>
                        <BgImage>
                          <Image src={item.imageUrl} alt="" width={94} height={94} />
                        </BgImage>


                        <ProductItemInfo>
                          <p>{item.name}</p>
                          <strong>{item.price}</strong>

                          <button>Remover</button>
                        </ProductItemInfo>
                      </ProductItem>
                    }) : <h1>nada</h1>}
                  </ItemsCart>

                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner />
                </ScrollArea.Root>



                <TotalInfoCart>
                  <InfoCart>
                    <div>
                      <p>Quantidade</p>
                      <p>3 itens</p>
                    </div>

                    <div>
                      <strong>Valor total</strong>
                      <strong>R$ 270,00</strong>
                    </div>
                  </InfoCart>

                  <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Finalizar Compra</button>
                </TotalInfoCart>

                <CloseButtom><X size={24} /></CloseButtom>
              </Content>
            </Dialog.Portal>

          </Dialog.Root>


        </Header>

        <Component {...pageProps} />
      </Container>
    </CartContext.Provider>

  )
}

export default App