import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../slices/productsApiSlice'

const ProductScreen = () => {
  const {id:productId} = useParams()
  const { data: product, isLoading, isError } = useGetProductQuery(productId)
  return (
    isLoading ? 
      <p>Loading</p> :
      <div>
        <h2>{product.name}</h2>
        <img src={product.image} alt="" />
      </div>
  )
}

export default ProductScreen