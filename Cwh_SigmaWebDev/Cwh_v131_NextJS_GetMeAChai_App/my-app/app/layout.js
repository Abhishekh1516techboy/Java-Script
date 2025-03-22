import Navbar from "@/components/Navbar";
import "./globals.css";
import WhatsappChaitBox from "@/components/WhatsappChaitBox";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "GetMeAChai - Crowdfunding for Chai Lovers",
  description: "This web app is a crowdfunding platform for developers.",
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className="relative">
        <SessionWrapper>
          {/* navBar component */}
          <Navbar />
          <div className="min-h-[94vh] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] ">
            {children}
          </div>
          {/* WhatsApp Chat Box Component */}
          <WhatsappChaitBox />
          {/* Footer component */}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
