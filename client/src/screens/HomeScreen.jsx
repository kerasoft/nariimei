import CategoriesBanner from '../components/CategoriesBanner'
import ProductCard from '../components/ProductCard'
import { useGetAllProductsQuery } from '../slices/productsApiSlice'
const HomeScreen = () => {
  const { data: products, isLoading} = useGetAllProductsQuery()
  return (
    isLoading ? 
      <p>Loading..</p> :
        <div>
          <CategoriesBanner />
          <div className='grid grid-cols-2 py-8 pb-5 gap-y-3 md:gap-y-8 gap-x-2 place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cold-5 max-w-[1200px] mx-auto'>
              {products.map((product)=>{
                  return <ProductCard key={product._id} product={product} />
              })}
          </div>
      </div>
  )
}

export default HomeScreen