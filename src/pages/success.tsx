import { SuccesContainer, ImageContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success() {
  return (
    <SuccesContainer>
      <h1>Compra Efetuada!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
        Uhuul <strong>Vini Oshima</strong>, sua <strong>Camiseta Beyond the limits</strong> já está a caminho de sua casa.
      </p>

      <Link href='/'>
        Voltar ao catálogo</Link>
    </SuccesContainer>
  )
}