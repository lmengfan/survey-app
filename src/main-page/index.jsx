import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './main-page.css';

function App() {
  return (
    <BrowserRouter basename = {process.env.PUBLIC_URL}>
       <Link to="/survey-app">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    </Link>
    </BrowserRouter>
  );
}

export default App;
