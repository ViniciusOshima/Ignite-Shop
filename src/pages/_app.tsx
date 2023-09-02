import { globalStyles } from "@/styles/global"
import { AppProps } from "next/app"

import camisaTeste from '../assets/camisetas/1.png'
import logoImg from '../assets/logo.svg'
import { Container, Header, Content, Title, CloseButtom, BgImage, ProductItem, ProductItemInfo, ItemsCart, TotalInfoCart, InfoCart } from "@/styles/pages/app"

import Image from 'next/image'
import { Handbag, X } from "phosphor-react"

import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from "next/link"


globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
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
                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>

                  <ProductItem>
                    <BgImage>
                      <Image src={camisaTeste} alt="" width={94} />
                    </BgImage>


                    <ProductItemInfo>
                      <p>Camiseta Beond the limits</p>
                      <strong>R$79,90</strong>

                      <button>Remover</button>
                    </ProductItemInfo>
                  </ProductItem>
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

                <button>Finalizar Compra</button>
              </TotalInfoCart>

              <CloseButtom><X size={24} /></CloseButtom>
            </Content>
          </Dialog.Portal>

        </Dialog.Root>


      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

export default App