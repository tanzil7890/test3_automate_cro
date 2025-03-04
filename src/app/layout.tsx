import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";


const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
       
        <link rel="canonical" href="https://outhad.com" />
        <meta name="theme-color" content="#6d28d9" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/outhad-logo.png" />
        <link rel="apple-touch-icon" href="/outhad-logo.png" />
      </head>
      <body className={`${spaceGrotesk.className} gradient-bg text-white min-h-screen antialiased`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
