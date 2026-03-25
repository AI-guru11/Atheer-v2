import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function App() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (mediaQuery.matches) {
      return undefined
    }

    const turbulence = document.getElementById("auroraTurbulence")

    if (!turbulence) {
      return undefined
    }

    let animationFrameId = 0
    const startedAt = performance.now()

    const animate = (now) => {
      if (document.hidden) {
        animationFrameId = window.requestAnimationFrame(animate)
        return
      }

      const elapsed = (now - startedAt) * 0.000045
      const frequencyX = 0.0072 + Math.sin(elapsed * 1.15) * 0.0011
      const frequencyY = 0.0126 + Math.cos(elapsed * 0.92) * 0.0016

      turbulence.setAttribute(
        "baseFrequency",
        `${frequencyX.toFixed(4)} ${frequencyY.toFixed(4)}`,
      )

      animationFrameId = window.requestAnimationFrame(animate)
    }

    animationFrameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div dir="rtl" className="min-h-screen text-white" style={{ background: "var(--bg)" }}>
      <div className="page-ambient-system" aria-hidden="true">
        <svg className="aurora-defs" width="0" height="0" focusable="false">
          <filter id="aurora-edge-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              id="auroraTurbulence"
              type="fractalNoise"
              baseFrequency="0.0072 0.0126"
              numOctaves="2"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <div className="liquid-aurora liquid-aurora--northwest">
          <span className="liquid-aurora__halo" />
          <span className="liquid-aurora__core" />
          <span className="liquid-aurora__sheen" />
          <span className="liquid-aurora__rim" />
          <span className="liquid-aurora__trace liquid-aurora__trace--northwest" />
        </div>

        <div className="liquid-aurora liquid-aurora--southeast">
          <span className="liquid-aurora__halo" />
          <span className="liquid-aurora__core" />
          <span className="liquid-aurora__sheen" />
          <span className="liquid-aurora__rim" />
          <span className="liquid-aurora__trace liquid-aurora__trace--southeast" />
        </div>

        <span className="aurora-noise" />
        <span className="aurora-vignette" />
      </div>

      <Header />
      <main className="relative z-[1]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
