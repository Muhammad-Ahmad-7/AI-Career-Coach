import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex items-center pb-40 pt-40 justify-center'>
      {children}
    </div>
  )
}

export default AuthLayout
