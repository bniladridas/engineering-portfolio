import React from 'react'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://palmshed.dev'

const logo = React.createElement(
  'div',
  { style: { display: 'flex', alignItems: 'center', gap: 16 } },
  React.createElement(
    'svg',
    {
      width: 44,
      height: 44,
      viewBox: '0 0 48 48',
      fill: 'none',
      stroke: '#1f883d',
      strokeWidth: 5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('path', { d: 'M14 32v-8' }),
    React.createElement('path', { d: 'M14 32h20' }),
    React.createElement('path', { d: 'M14 24h20' }),
    React.createElement('path', { d: 'M21 24c0-6 8-10 13-14' }),
  ),
  React.createElement(
    'span',
    { style: { fontSize: 40, fontWeight: 600, color: '#0d0d0d' } },
    'Palmshed',
  ),
)

const title = React.createElement(
  'div',
  { style: { display: 'flex', flexDirection: 'column' } },
  React.createElement(
    'div',
    {
      style: {
        fontSize: 24,
        color: '#1f883d',
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 16,
      },
    },
    'Software Engineer · Open Source · Developer Tools',
  ),
  React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 72,
        fontWeight: 600,
        color: '#0d0d0d',
        lineHeight: 1.05,
      },
    },
    React.createElement('span', null, 'Software that outlasts'),
    React.createElement('span', null, 'its authors.'),
  ),
)

const footer = React.createElement(
  'div',
  { style: { display: 'flex', justifyContent: 'space-between', color: '#4b4b4b', fontSize: 24 } },
  React.createElement('span', null, siteUrl.replace('https://', '')),
  React.createElement('span', null, 'Maintainable systems · developer tools · open source'),
)

const element = React.createElement(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 64,
      background: '#ffffff',
    },
  },
  logo,
  title,
  footer,
)

const image = await new ImageResponse(element, { width: 1200, height: 630 })
const buffer = Buffer.from(await image.arrayBuffer())
const dest = join(process.cwd(), 'public', 'og.png')
writeFileSync(dest, buffer)
console.log(`generated ${dest} (${buffer.length} bytes)`)
