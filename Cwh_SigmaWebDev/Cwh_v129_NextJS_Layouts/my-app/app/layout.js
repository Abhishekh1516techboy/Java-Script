import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Facebook - Connect with friends and the world around you",
  description:
    "Facebook is a social utility that connects people with friends and others who work study and live around them. People use Facebook to keep up with friends upload an unlimited number of photos, post links and videos, and learn more about the people they meet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="h-screen"> 
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
