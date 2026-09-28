import { Link } from 'react-router-dom'

export function About() {
  return (
    <section id="center" className="simple-page">
      <h1>About</h1>
      <p>このページはReact Routerの /about ルートで表示されています。</p>
      <Link to="/">ホームへ戻る</Link>
    </section>
  )
}