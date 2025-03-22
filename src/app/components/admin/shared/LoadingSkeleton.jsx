"use client"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton count={5} /> 
      <p>loading....................</p>
    </div>
  )
};

export default LoadingSkeleton
