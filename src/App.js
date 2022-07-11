import './App.css';

import {
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  const basePath = "/audio-vision/";
  return (
    <div className="App">
      <header>
        <h1>Audio Vision</h1>
      </header>
      <div className='Content'>
      <Routes>
          <Route exact path={basePath} element={<HomePage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
