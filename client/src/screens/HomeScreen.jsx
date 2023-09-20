import CategoriesBanner from '../components/CategoriesBanner'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { toast } from 'react-toastify'
import { useGetAllProductsQuery } from '../slices/productsApiSlice'
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery()
  return (
    isLoading ? 
      <Loader /> :
      error ? 
        toast(error?.data?.message || error.error) :
        <div>
          <CategoriesBanner />
          <div className='grid grid-cols-2 py-5 pb-5 gap-y-3 md:gap-y-8 gap-x-2 md:gap-0 place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cold-5 max-w-[1200px] mx-auto'>
              {products.map((product)=>{
                  return <ProductCard key={product._id} product={product} />
              })}
          </div>
      </div>
  )
}

export default HomeScreen