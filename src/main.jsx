// main.jsx or index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import DetailView from './routes/DetailView.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="coinDetails/:symbol" element={<DetailView />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '2rem', color: 'white' }}>
                <h2>404 - Page Not Found</h2>
                <p>There's nothing here!</p>
                <Link style={{ color: 'white', textDecoration: 'underline' }} to="/">
                  Back to Home
                </Link>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
