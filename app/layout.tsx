import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site, absUrl, withBase } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex',
})

const ogImage = { url: withBase('/og.png'), width: 1200, height: 630 }

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: absUrl('/') },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: absUrl('/'),
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: withBase('/favicon.svg'),
  },
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: absUrl('/'),
  description: site.description,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.author.name,
  jobTitle: site.author.jobTitle,
  url: absUrl('/'),
  sameAs: [site.author.github],
  knowsAbout: ['maintainable systems', 'developer tools', 'open source', 'authentication', 'Flutter'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plex.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{function e(){return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:e();document.documentElement.dataset.theme=t}catch(E){}})()`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
