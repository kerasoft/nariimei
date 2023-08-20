import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../slices/productsApiSlice'
import Alert from '../components/Alert'
import Loader from '../components/Loader'

const ProductScreen = () => {
  const {id:productId} = useParams()
  const { data: product, isLoading, error } = useGetProductQuery(productId)
  return (
    isLoading ? 
      <Loader /> :
      error ? 
        <Alert message={error?.data?.message || error.error} /> :
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} alt="" />
        </div>
  )
}

export default ProductScreen