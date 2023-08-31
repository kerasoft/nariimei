import React from 'react'

const Spinner = () => {
  return (
    <div className='self-center animate-spin w-5 h-5 rounded-full inline-flex justify-center items-center bg-gradient-to-r from-red-400 to-yellow-400'>
        <div className='w-4 h-4 rounded-full bg-orange-700'></div>
    </div>
  )
}

export default Spinner