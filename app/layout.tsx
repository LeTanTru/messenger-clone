import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToasterContext from '@/app/context/toaster-context';
import AuthContext from '@/app/context/auth-context';
import ActiveStatus from '@/app/components/active-status';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'A simple messenger clone built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${inter.className} h-full antialiased`}
    >
      <body className='h-full flex flex-col'>
        <AuthContext>
          {children}
          <ActiveStatus />
          <ToasterContext />
        </AuthContext>
      </body>
    </html>
  );
}
