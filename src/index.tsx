import { FC } from 'react';
import ReactDOM from 'react-dom';

const App: FC = () => {
    return <div>Hello World!</div>;
};

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
