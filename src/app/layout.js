import { Poppins, Mulish } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mulish',
});

export const metadata = {
  title: "Eraslan Software - Yazılım Çözümleri",
  description: "Profesyonel yazılım çözümleri, web geliştirme ve teknoloji danışmanlığı hizmetleri",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${mulish.variable}`}>
      <body className="font-mulish">
        <Navbar />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
