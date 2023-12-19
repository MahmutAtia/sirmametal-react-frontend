import { Avatar } from '@mui/material'
import React from 'react'


export default function CompanyAvatar({alt,src,handleClick}) {
  return (
    <div className='flex flex-col items-center justify-start'>
    <Avatar
    alt={alt}
    src={src}
    sx={{ width: 220, height: 220 }}
    className=" cursor-pointer hover:shadow-lg hover:shadow-gray-500 hover:w-52 hover:h-52"
    onClick={handleClick}
  />
  <h1 className="mt-4  text-center text-2xl text-gray-600">{alt}</h1>
  </div>
  )
}
