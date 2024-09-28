import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pagesize = 15;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <div>
            <LoadingBar color='#f11946' progress={progress} height={3} />
          </div>
          <Routes>
            <Route
              path="/"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="general" country="us" category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="business" country="us" category="business" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="sports" country="us" category="sports" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="technology" country="us" category="technology" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="entertainment" country="us" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="health" country="us" category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} key="science" country="us" category="science" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
