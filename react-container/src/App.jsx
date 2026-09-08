export default function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">react-container</p>
        <h1>React development container is ready.</h1>
        <p className="body">
          Run <code>docker compose exec react-dev npm run dev</code> to start the
          Vite development server inside the container.
        </p>
      </section>
    </main>
  );
}
