import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const fetchProducts = async()=>{
      let { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
    }, [])
  return (
    <div className='grid md:grid-cols-5 gap-2'>
        {products.map((product)=>{
            return <ProductCard key={product._id} product={product} />
        })}
    </div>
  )
}

export default HomeScreen