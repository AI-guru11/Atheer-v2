import { useEffect, useRef } from "react"

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext("2d")
    if (!context) return undefined

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

    let width = 0
    let height = 0
    let particles = []
    let animationFrameId = 0

    const buildParticleCount = () => {
      const area = window.innerWidth * window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1
      const isLowEnd = isMobile && (pixelRatio > 2 || window.innerWidth <= 768)

      if (reducedMotionQuery.matches) return 0
      if (isLowEnd) return Math.max(56, Math.min(160, Math.floor(area / 24000)))
      if (isMobile) return Math.max(72, Math.min(240, Math.floor(area / 17000)))

      return Math.max(96, Math.min(360, Math.floor(area / 13000)))
    }

    class LightParticle {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.x = Math.random() * width
        this.y = initial ? Math.random() * height : height + Math.random() * 24
        this.size = Math.random() * 1.4 + 0.35
        this.speedY = Math.random() * -0.3 - 0.06
        this.opacity = Math.random() * 0.35 + 0.08
        this.color =
          Math.random() > 0.52
            ? `rgba(0, 255, 135, ${this.opacity})`
            : `rgba(96, 239, 255, ${this.opacity})`
      }

      update() {
        this.y += this.speedY
        if (this.y < -10) {
          this.reset(false)
        }
      }

      draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
      }
    }

    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const seedParticles = () => {
      const count = buildParticleCount()
      particles = Array.from({ length: count }, () => new LightParticle())
    }

    const render = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    const restart = () => {
      window.cancelAnimationFrame(animationFrameId)
      setCanvasSize()
      seedParticles()

      if (!reducedMotionQuery.matches) {
        render()
      } else {
        context.clearRect(0, 0, width, height)
      }
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(restart, 140)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameId)
        return
      }

      if (!reducedMotionQuery.matches) {
        render()
      }
    }

    restart()

    window.addEventListener("resize", onResize, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)
    reducedMotionQuery.addEventListener?.("change", restart)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      reducedMotionQuery.removeEventListener?.("change", restart)
    }
  }, [])

  return (
    <>
      <div className="aurora-simple-bg" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} className="stardust-canvas" aria-hidden="true" />
    </>
  )
}