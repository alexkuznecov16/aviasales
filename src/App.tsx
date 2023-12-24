import React from 'react';
import Content from './components/content/Content';
import './app.css';
import Header from './components/header/Header';

// // Store
// interface CounterState {
//     value: number;
// }

// interface UserState {
//     isSignedIn: boolean;
// }

// // Actions - это объект, который описывает изменение в вашем приложении. Это обычный JavaScript-объект, который содержит свойство type (тип) и, по желанию, другие данные, необходимые для обновления состояния.
// const increment = { type: 'increment' };
// const decrement = { type: 'decrement' };

// // Reducers - Редюсер (reducer) — это чистая функция, которая принимает предыдущее состояние и действие (state и action) и возвращает следующее состояние (новую версию предыдущего). Важно: Редюсер должен возвращать совершенно новый объект дерева состояний, которым заменяется предыдущий.

const App: React.FC = () => {
    return (
        <div className='AppBlock'>
            <Header />
            <Content />
        </div>
    );
};

export default App;
