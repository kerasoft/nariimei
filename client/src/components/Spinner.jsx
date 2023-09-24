import React from 'react'

const Spinner = ({bg='bg-orange-700'}) => {
  return (
    <div className='inline-flex items-center self-center justify-center w-5 h-5 rounded-full animate-spin bg-gradient-to-r from-red-400 to-yellow-400'>
        <div className={`w-4 h-4 rounded-full ${bg}`}></div>
    </div>
  )
}

export default Spinner