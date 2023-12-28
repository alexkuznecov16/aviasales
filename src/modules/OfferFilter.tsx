import React from 'react'

interface OfferFilterProps {
  handleSortChange: (sortType: string) => void;
}

const OfferFilter: React.FC<OfferFilterProps> = ({handleSortChange}) => {
  return (
    <div className='offer-filter'>
                            <span onClick={() => handleSortChange('cheapest')}>The cheapest</span>
                            <span onClick={() => handleSortChange('fastest')}>The fastest</span>
                            <span onClick={() => handleSortChange('optimal')}>The most optimal</span>
                        </div>
  )
}

export default OfferFilter