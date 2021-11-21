import React from 'react';
import { ToastContainer } from 'react-toastify';
import JobDashboard from './components/JobDashboard';
import 'react-toastify/dist/ReactToastify.css';

const App = function App() {
  return (
    <div className="container">
      <JobDashboard />
      <ToastContainer />
    </div>
  );
};

export default App;
