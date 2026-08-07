import CopyButton from './CopyButton'

interface CopyableBlockProps {
  title: string
  content: string
  label?: string
  children: React.ReactNode
}

export default function CopyableBlock({ title, content, label, children }: CopyableBlockProps) {
  return (
    <div className="copyable-block">
      <div className="copyable-block__header">
        <span className="eyebrow">{title}</span>
        <CopyButton text={content} label={label ?? title.toLowerCase()} />
      </div>
      {children}
    </div>
  )
}
