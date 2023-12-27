import React from 'react';

interface FilterBlockProps {
    filterStops: number[];
    filterCompanies: string[];
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterBlock: React.FC<FilterBlockProps> = ({ handleFilterChange }) => {
    return (
        <div className='filter-block'>
            <div className='filter-block__item'>
                <h3>Transfers count</h3>
                <div className='filter-settings'>
                    <div className='input-item'>
                        <input id='without' type='checkbox' name='stops' value={0} onChange={handleFilterChange} />
                        <label htmlFor='without'>0 transfers</label>
                    </div>
                    <div className='input-item'>
                        <input id='transfer1' type='checkbox' name='stops' value={1} onChange={handleFilterChange} />
                        <label htmlFor='transfer1'>1 transfer</label>
                    </div>
                    <div className='input-item'>
                        <input id='transfer2' type='checkbox' name='stops' value={2} onChange={handleFilterChange} />
                        <label htmlFor='transfer2'>2 transfers</label>
                    </div>
                    <div className='input-item'>
                        <input id='transfer3' type='checkbox' name='stops' value={3} onChange={handleFilterChange} />
                        <label htmlFor='transfer3'>3 transfers</label>
                    </div>
                </div>
            </div>
            <div className='filter-block__item'>
                <h3>Companies</h3>
                <div className='filter-settings'>
                    <div className='input-item'>
                        <input id='airBaltic' type='checkbox' name='companies' value='AirBaltic' onChange={handleFilterChange} />
                        <label htmlFor='airBaltic'>Air Baltic</label>
                    </div>
                    <div className='input-item'>
                        <input id='ryanair' type='checkbox' name='companies' value='Ryanair' onChange={handleFilterChange} />
                        <label htmlFor='ryanair'>Ryanair</label>
                    </div>
                    <div className='input-item'>
                        <input id='ernestAirlines' type='checkbox' name='companies' value='Ernest airlines' onChange={handleFilterChange} />
                        <label htmlFor='ernestAirlines'>Ernest Airlines</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBlock;
