import React from 'react';
import './Header.css';
import airplane_icon from '../../assets/airplane.png';

const Header: React.FC = () => {
    return (
        <div className='container'>
            <div className='block'>
                <img src={airplane_icon} alt='aviasales' />
                <h1 className='block-title'>Aviasales</h1>
            </div>
        </div>
    );
};

export default Header;
