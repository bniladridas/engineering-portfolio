import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const src = join(process.cwd(), 'assets', 'diagrams')
const dest = join(process.cwd(), 'public', 'diagrams')

mkdirSync(dest, { recursive: true })

for (const file of readdirSync(src)) {
  if (!file.endsWith('.svg')) continue
  copyFileSync(join(src, file), join(dest, file))
  console.log(`copied ${file}`)
}

if (!existsSync(join(process.cwd(), 'public', 'favicon.svg'))) {
  copyFileSync(join(process.cwd(), 'assets', 'logos', 'palmshed-mark.svg'), join(process.cwd(), 'public', 'favicon.svg'))
  console.log('copied favicon.svg')
}
