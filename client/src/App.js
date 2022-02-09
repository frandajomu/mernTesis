import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
