import React from 'react';
import Content from './components/content/Content';
import './app.css';
import Header from './components/header/Header';

const App: React.FC = () => {
    return (
        <div className='AppBlock'>
            <Header />
            <Content />
        </div>
    );
};

export default App;
