import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen text-white" style={{ background: 'var(--bg)' }}>
      <div className="page-ambient-system" aria-hidden="true">
        <div className="ambient-body ambient-body--one">
          <span className="ambient-body__core" />
          <span className="ambient-body__mesh" />
        </div>
        <div className="ambient-body ambient-body--two">
          <span className="ambient-body__core" />
          <span className="ambient-body__mesh" />
        </div>
      </div>

      <Header />
      <main className="relative z-[1]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
