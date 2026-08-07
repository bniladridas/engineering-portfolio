'use client'

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

export function prefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function storedTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  const raw = window.localStorage.getItem(STORAGE_KEY)
  return raw === 'light' || raw === 'dark' ? (raw as 'light' | 'dark') : 'system'
}

export function effectiveTheme(): 'light' | 'dark' {
  const stored = storedTheme()
  if (stored === 'system') return prefersDark() ? 'dark' : 'light'
  return stored
}

function SystemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function DarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

const ORDER: Theme[] = ['system', 'light', 'dark']

export function applyTheme() {
  if (typeof window === 'undefined') return
  const theme = effectiveTheme()
  document.documentElement.dataset.theme = theme
}

export default function ThemeToggle() {
  const [stored, setStored] = useState<Theme>('system')

  useEffect(() => {
    setStored(storedTheme())
  }, [])

  function toggle() {
    const next = ORDER[(ORDER.indexOf(stored) + 1) % ORDER.length]
    setStored(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    applyTheme()
  }

  const label = {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
  }[stored]
  const icon = { system: <SystemIcon />, light: <LightIcon />, dark: <DarkIcon /> }[stored]

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Color theme: ${label}. Click to cycle.`}
      title={`Color theme: ${label}. Click to cycle.`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        padding: 0,
        border: '1px solid var(--line)',
        borderRadius: 8,
        background: 'var(--white)',
        color: 'var(--black)',
        cursor: 'pointer',
        transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
      }}
    >
      {icon}
    </button>
  )
}
