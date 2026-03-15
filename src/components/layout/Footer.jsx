import { Link } from "react-router-dom"
import { siteContent } from "../../data/siteContent"

export default function Footer() {
  const { brand, footer } = siteContent
  const productLinks = footer.links.product.items

  return (
    <footer className="border-t border-white/5 py-10 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white">{brand.name}</h3>
            <p className="max-w-sm text-base leading-relaxed text-slate-400">
              {footer.tagline}
            </p>
          </div>

          <div className="space-y-4 lg:justify-self-end">
            <h4 className="text-lg font-semibold text-white">
              {footer.links.product.title}
            </h4>

            <ul className="space-y-3 text-slate-400">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-5 text-sm text-slate-500">
          © {brand.name} 2026 • جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}