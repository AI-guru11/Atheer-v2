import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AuroraBackground from "../components/effects/AuroraBackground"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

export default function App() {
  const location = useLocation();

  // 1. التمرير للأعلى عند تغيير الصفحة
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 2. نظام الظهور المتطور (Smart Reveal System)
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // دالة لتشغيل المراقب على العناصر الموجودة حالياً
    const observeElements = () => {
      const revealElements = document.querySelectorAll(".reveal-block:not(.is-visible)");
      
      if (revealElements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      revealElements.forEach((el) => {
        // إذا كان العنصر ظاهراً بالفعل في الشاشة (مثل البطاقة الجديدة في البيلدر)
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    // تشغيل المراقبة فوراً عند تحميل الصفحة
    observeElements();

    // السحر هنا: مراقبة أي تغيير في الـ DOM (ظهور خطوات جديدة في البيلدر)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <div dir="rtl" className="site-shell min-h-screen text-white bg-[#0d0d12]">
      <AuroraBackground />
      <div className="site-content relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow relative z-[1]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
