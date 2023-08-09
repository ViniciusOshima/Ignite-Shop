import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/products"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus a voluptatibus neque quas veritatis nulla! Rerum aperiam, placeat natus, nisi dolor reiciendis facere enim, eum cupiditate eius voluptatibus sunt tempora!</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}