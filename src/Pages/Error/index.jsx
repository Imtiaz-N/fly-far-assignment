import React from 'react'
import { BiError } from 'react-icons/bi'
import { FaArrowLeft, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4'>
      <div className='max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='bg-red-50 p-6 sm:p-10'>
          <div className='flex justify-center'>
            <BiError className='text-red-500 text-9xl' />
          </div>
          <h1 className='mt-4 text-center text-3xl sm:text-4xl font-bold text-gray-800'>
            Oops! Page Not Found
          </h1>
          <p className='mt-4 text-center text-gray-600'>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>
        <div className='p-6 sm:p-8 bg-white'>
          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <Link
              to='/'
              className='w-full py-3 px-6 bg-[#2cd59d] hover:bg-[#20c08a] text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md'
            >
              <FaHome className='text-lg' />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className='w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors'
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </button>
          </div>
          <div className='mt-6 text-center text-sm text-gray-500'>
            If you believe this is an error, please contact support at{' '}
            <a
              href='mailto:support@flyfarint.com'
              className='text-[#2cd59d] hover:underline'
            >
              support@flyfarint.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
