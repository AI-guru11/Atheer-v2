import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import AuroraBackground from "../components/effects/AuroraBackground"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function App() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const revealElements = Array.from(document.querySelectorAll(".reveal-block"))

    if (revealElements.length === 0) {
      return undefined
    }

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    revealElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight - 60) {
        element.classList.add("is-visible")
        return
      }

      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div dir="rtl" className="site-shell min-h-screen text-white">
      <AuroraBackground />

      <div className="site-content relative z-10 min-h-screen">
        <Header />
        <main className="relative z-[1]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}