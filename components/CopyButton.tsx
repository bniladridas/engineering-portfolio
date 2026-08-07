'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
}

export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`copy-control${copied ? ' copy-control--copied' : ''}`}
      aria-live="polite"
    >
      {copied ? '✓ Copied' : `📋 Copy${label ? ` ${label}` : ''}`}
    </button>
  )
}
