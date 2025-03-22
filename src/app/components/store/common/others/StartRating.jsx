import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating=({ rating  })=> {
  const stars = [];
  // Fill stars array with solid stars based on rating
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon className='text-xs mx-[1px]' icon={faStar} key={i} color={i < rating ? 'gold' : 'gray'} />
    );
  }

  return (
    <div className='me-1'>
      {stars}
    </div>
  );
}

export default StarRating;