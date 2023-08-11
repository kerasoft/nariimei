import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductScreen = () => {
  const {id:productId} = useParams()
  const [product, setProduct] = useState({})
  useEffect(()=>{
      async function fetchProduct(){
        let { data } = await axios.get(`/api/products/${productId}`)
        setProduct(data)
      }
      fetchProduct()
    }, [productId])
  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt="" />
    </div>
  )
}

export default ProductScreen