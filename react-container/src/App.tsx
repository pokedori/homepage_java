import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header.tsx'
import { About } from './pages/About.tsx'
import { Home } from './pages/Home.tsx'

export function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <Header />
        <main className="route-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <section id="center">
                  <h1>404</h1>
                  <p>ページが見つかりません。</p>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}