import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#040711] text-white">
      <Header />
      <main className="text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}