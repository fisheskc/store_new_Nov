
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

// const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// if (!publishableKey) {
//   throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
// }


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
 }> ) {
  
return (
  // <ClerkProvider dynamic>
  <html lang='en' suppressHydrationWarning>
    <body className={inter.className}>
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
         <Providers>
             <Navbar />
               <Container className="py-20">
                  {children}
               </Container>
          </Providers>
      </ClerkProvider>
    </body>
    </html>
  );
}