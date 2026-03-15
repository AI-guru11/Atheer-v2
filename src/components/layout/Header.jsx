import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import Container from "./Container"

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/builder", label: "بناء الهدية" },
  { to: "/corporate", label: "الشركات" },
  { to: "/gift", label: "تجربة الكشف" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#040711]/80 text-white backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-3 py-3">
        <Link to="/" className="shrink-0 text-2xl font-semibold tracking-wide text-white">
          <span className="glow-text">Atheer</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive ? "text-cyan-300" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/builder"
            className="hidden items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c5cff_0%,#22d3ee_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(34,211,238,0.2)] transition hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] sm:inline-flex"
          >
            ابدأ الآن
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white backdrop-blur-sm lg:hidden"
            aria-label="Open navigation menu"
          >
            <span className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="border-t border-white/[0.06] bg-[#050a14]/97 backdrop-blur-xl lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-white/[0.08] text-cyan-300"
                        : "text-slate-200 hover:bg-white/[0.04] hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/builder"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c5cff_0%,#22d3ee_100%)] px-5 py-3 text-sm font-semibold text-white"
            >
              ابدأ الآن
            </Link>
          </Container>
        </div>
      )}
    </header>
  )
}
