import { globalStyles } from "@/styles/global"
import { AppProps } from "next/app"

import logoImg from '../assets/logo.svg'
import { Container, Header, Content, Title, CloseButtom, BgImage, ProductItem, ProductItemInfo, ItemsCart, TotalInfoCart, InfoCart, DialogRoot, CartCount, ButtonCartContainer } from "@/styles/pages/app"

import Image from 'next/image'
import { Handbag, X } from "phosphor-react"

import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from "next/link"

import { createContext, useEffect, useState } from "react"
import axios from "axios"

interface CartContextType {
  cart: CartProps[]
  AddShirtToCart: ({ }: CartProps) => void
}

export interface CartProps {
  name: string
  imageUrl: string
  price: number
  priceId: string
  priceWithoutFormat: number
  id: string
}

interface ProductsId {
  price: string
  quantity: number
  id: string
}

export const CartContext = createContext({} as CartContextType)

globalStyles()

function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<CartProps[]>([])

  const [productsId, setProductsId] = useState<ProductsId[]>([])

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const infoCart = cart.reduce(
    (acc, item) => {
      acc.totalPrice += item.priceWithoutFormat
      acc.quantity = cart.length

      return acc
    }, {
    quantity: 0,
    totalPrice: 0
  })

  function AddShirtToCart(shirt: CartProps) {
    setCart((prevCart) => [...prevCart, {
      name: shirt.name,
      imageUrl: shirt.imageUrl,
      price: shirt.price,
      priceId: shirt.priceId,
      priceWithoutFormat: shirt.priceWithoutFormat,
      id: shirt.id
    }])

    setProductsId((prev) => [...prev, {
      price: shirt.priceId,
      quantity: 1,
      id: shirt.id
    }])
  }

  function handleRemoveItem(Id: string) {
    const newCart = cart.filter((itemCart) => itemCart.id !== Id)
    const newProductsId = productsId.filter((itemCart) => itemCart.id !== Id)

    setCart(newCart)
    setProductsId(newProductsId)
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: productsId.map((product) => {
          return {
            price: product.price,
            quantity: product.quantity
          }
        }),
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

          <DialogRoot>
            <Dialog.Trigger asChild>
              <ButtonCartContainer>
                <button><Handbag weight="bold" size={24} />
                </button>
                {cart.length > 0 ? <CartCount>{cart.length}</CartCount> : ''}
              </ButtonCartContainer>


            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay />
              <Content>
                <Title>Sacola de compras</Title>

                <ScrollArea.Root>
                  <ItemsCart>
                    {cart.length > 0 ? cart.map((item) => {
                      return <ProductItem key={item.id}>
                        <BgImage>
                          <Image src={item.imageUrl} alt="" width={94} height={94} />
                        </BgImage>


                        <ProductItemInfo>
                          <p>{item.name}</p>
                          <strong>{item.price}</strong>

                          <button onClick={() => { handleRemoveItem(item.id) }}>Remover</button>
                        </ProductItemInfo>
                      </ProductItem>
                    }) : <p>nenhum item no carrinho</p>}
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
                      <p>{infoCart.quantity == 1 ? infoCart.quantity + ' item' : infoCart.quantity + ' itens'}</p>
                    </div>

                    <div>
                      <strong>Valor total</strong>
                      <strong>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(infoCart.totalPrice / 100)
                      }</strong>
                    </div>
                  </InfoCart>

                  <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Finalizar Compra</button>
                </TotalInfoCart>

                <CloseButtom><X size={24} /></CloseButtom>
              </Content>
            </Dialog.Portal>

          </DialogRoot>


        </Header>

        <Component {...pageProps} />
      </Container>
    </CartContext.Provider>

  )
}

export default App