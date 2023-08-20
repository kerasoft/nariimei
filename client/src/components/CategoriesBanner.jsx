import React from 'react'

const CategoriesBanner = () => {
    const productCategories = [
        'Spices',
        'SeaFood',
        'Dry-Veggies',
        'Fermented',
        'Dry-Meat',
        'Dry-Fish',
        'Smoked-Meat'
    ]
  return (
    <div className='overflow-x-scroll mt-5 gap-x-4 no-scrollbar flex'>
        {productCategories.map((category, i)=>{
            return <div key={i} className='bg-gradient-to-b from-gray-900 to-gray-600 px-8 py-4 text-gray-300 font-bold rounded-md w-fit flex-none cursor-pointer'>{category}</div>
        })}

    </div>
  )
}

export default CategoriesBanner