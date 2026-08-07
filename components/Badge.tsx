export default function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'green'
}) {
  return <span className={tone === 'green' ? 'badge badge--green' : 'badge'}>{children}</span>
}
