import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'My Blog',
    template: '%s | My Blog',
  },
  description: '개발, 기술, 일상에 대한 이야기를 담은 블로그입니다.',
  keywords: ['블로그', '개발', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Blog Author' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'My Blog',
    title: 'My Blog',
    description: '개발, 기술, 일상에 대한 이야기를 담은 블로그입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog',
    description: '개발, 기술, 일상에 대한 이야기를 담은 블로그입니다.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
