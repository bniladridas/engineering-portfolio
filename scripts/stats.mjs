import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

function words(text) {
  return text.split(/\s+/).filter(Boolean).length
}

function report(dir) {
  const files = readdirSync(join(root, dir)).filter((f) => f.endsWith('.md'))
  let total = 0
  console.log(`\n${dir} (${files.length} files)`)
  for (const file of files.sort()) {
    const n = words(readFileSync(join(root, dir, file), 'utf8'))
    total += n
    console.log(`  ${file.padEnd(50)} ${n} words`)
  }
  console.log(`  ${'TOTAL'.padEnd(50)} ${total} words`)
  return total
}

let grand = 0
for (const dir of ['docs/articles', 'docs/linkedin', 'docs/featured', 'docs/profile']) {
  grand += report(dir)
}
console.log(`\nGrand total: ${grand} words`)
