import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Storefront',
  description: 'A nifty store built with Next.js',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
 }> ) {
  console.log("CLERK KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
return (
  // <ClerkProvider dynamic>
    <ClerkProvider publishableKey={publishableKey}>
    <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
              <Navbar />
              <Container className="py-20">
                {children}
              </Container>
          </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}