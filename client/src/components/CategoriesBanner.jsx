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
    <div className='mx-auto max-w-[1200px] flex pb-1 mt-5 overflow-x-scroll gap-x-4 scrollbar'>
        {productCategories.map((category, i)=>{
            return <div key={i} className='flex-none px-8 py-4 font-bold text-gray-300 rounded-md cursor-pointer bg-gradient-to-b from-gray-900 to-gray-700 w-fit'>{category}</div>
        })}

    </div>
  )
}

export default CategoriesBanner