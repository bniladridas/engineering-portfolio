import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const alt = site.description
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#ffffff',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#1f883d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 32v-8" />
            <path d="M14 32h20" />
            <path d="M14 24h20" />
            <path d="M21 24c0-6 8-10 13-14" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 600, color: '#0d0d0d' }}>Palmshed</span>
        </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, color: '#1f883d', fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
              Software Engineer · Open Source · Developer Tools
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, fontWeight: 600, color: '#0d0d0d', lineHeight: 1.05 }}>
              <span>Software that outlasts</span>
              <span>its authors.</span>
            </div>
          </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b4b4b', fontSize: 24 }}>
          <span>{site.url.replace('https://', '')}</span>
          <span>Maintainable systems · developer tools · open source</span>
        </div>
      </div>
    ),
    size,
  )
}
