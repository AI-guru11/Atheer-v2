import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AuroraBackground from "../components/effects/AuroraBackground"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function App() {
  const location = useLocation();

  // 1. Scroll to top on route change (Essential for Premium Feel)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 2. Optimized Reveal Animation Logic
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // فحص العناصر الموجودة حالياً في الـ DOM بعد تغيير الصفحة
    const refreshRevealObserver = () => {
      const revealElements = Array.from(document.querySelectorAll(".reveal-block"));

      if (revealElements.length === 0) return;

      if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      revealElements.forEach((element) => {
        // إذا كان العنصر أصلاً في مجال الرؤية، أظهره فوراً
        if (element.getBoundingClientRect().top < window.innerHeight - 60) {
          element.classList.add("is-visible");
        } else {
          observer.observe(element);
        }
      });

      return observer;
    };

    const observerInstance = refreshRevealObserver();

    return () => {
      if (observerInstance) observerInstance.disconnect();
    };
  }, [location.pathname]); // إعادة التشغيل عند تغيير المسار لحل مشكلة الصفحة الفارغة

  return (
    <div dir="rtl" className="site-shell min-h-screen text-white bg-[#0d0d12]">
      {/* الخلفية السحرية - معزولة برمجياً */}
      <AuroraBackground />

      {/* المحتوى الرئيسي - معزول بسياق تكديس مستقل لضمان عدم الاختفاء */}
      <div className="site-content relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow relative z-[1]">
          {/* الـ Outlet هو المكان الذي تظهر فيه الصفحات */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
