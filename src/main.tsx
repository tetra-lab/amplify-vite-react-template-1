import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// --- ★★★ ここからが重要な追加部分です ★★★ ---
import { Amplify } from 'aws-amplify'
import amplifyconfig from './amplifyconfiguration.json'
Amplify.configure(amplifyconfig)
// --- ★★★ ここまで追加 ★★★ ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
