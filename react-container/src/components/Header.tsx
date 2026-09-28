import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <NavLink className="site-brand" to="/" end>
        Homepage
      </NavLink>
      <nav className="site-nav" aria-label="メインナビゲーション">
        <NavLink to="/" end>
          ホーム
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
      </nav>
    </header>
  )
}