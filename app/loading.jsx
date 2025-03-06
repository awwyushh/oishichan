import { LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-amber-50'>
        <h1 className='text-gray-900 text-4xl mb-8'>Hungry? Wait for eat.</h1>
        <img
            src="/loading.gif"
            alt="Loading..."
            className="mb-8"
            style={{ width: '200px' }}
        />
        <LoaderCircle size={100} className='text-gray-900 animate-spin' />
    </div>
  )
}

export default loading