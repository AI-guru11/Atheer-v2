/** @type {import('tailwindcss').Config} */
export default {
  // ميزة JIT مفعلة تلقائياً في الإصدار الثالث.
  // مصفوفة content هي المسؤولة عن عملية الـ Purge لتقليل حجم ملف الـ CSS النهائي.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/gift/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
    "./src/utils/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      maxWidth: {
        container: "1240px",
      },
      // هنا يمكن إضافة الألوان الخاصة بـ "Premium Dark Experience" مستقبلاً
    },
  },
  plugins: [],
  // تحسينات مستقبلية لتقليل حجم الكود وتحسين تجربة الجوال
  future: {
    hoverOnlyWhenSupported: true,
  },
}
