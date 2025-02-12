import React from 'react'

const MainLayout = ({children}) => {

    return (
        <div className='container mx-auto mt-32 mb-20'>
            {children}
        </div>
    )
}

export default MainLayout
