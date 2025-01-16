import BackToTop from "./backToTop";
//import HomePage from "./01-main-demo/page";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "E-Mugallym",  
  description: "E-Mugallym",
};

export default function Home() {
  return (
    <main>
      <LanguageProvider>
        {/* <HomePage /> */}
        <BackToTop />
      </LanguageProvider>
    </main>
  );
}

