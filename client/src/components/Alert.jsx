import React from 'react'

const Alert = ({message}) => {
  return (
    <div className='z-[999] top-14 right-4 fixed text-center px-8 py-3 rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 opacity-90 text-white font-semibold animate-pulse animate-ease-linear'>
        <span>{message}</span>
    </div>
  )
}

export default Alert