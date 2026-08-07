import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

const sections = [
  { dir: 'docs/articles', min: 10, required: ['title', 'slug', 'intro'], markers: ['# ', '## Takeaway'] },
  { dir: 'docs/linkedin', min: 20, required: ['title', 'slug', 'hook'] },
  { dir: 'docs/featured', min: 10, required: ['title', 'subtitle', 'link', 'tag'] },
]

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return {}
  const out = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2]
  }
  return out
}

let errors = 0

for (const { dir, min, required, markers = [] } of sections) {
  const files = readdirSync(join(root, dir)).filter((f) => f.endsWith('.md'))
  if (files.length < min) {
    errors++
    console.error(`FAIL  ${dir}: expected ${min}+ files, found ${files.length}`)
  } else {
    console.log(`OK    ${dir}: ${files.length} files`)
  }
  for (const file of files) {
    const text = readFileSync(join(root, dir, file), 'utf8')
    const fm = frontMatter(text)
    for (const field of required) {
      if (!fm[field]) {
        errors++
        console.error(`FAIL  ${dir}/${file}: missing front matter field "${field}"`)
      }
    }
    for (const marker of markers) {
      if (!text.includes(marker)) {
        errors++
        console.error(`FAIL  ${dir}/${file}: missing section "${marker}"`)
      }
    }
  }
}

for (const dir of ['assets/cards', 'assets/icons', 'assets/logos', 'assets/diagrams']) {
  const files = readdirSync(join(root, dir)).filter((f) => f.endsWith('.svg'))
  console.log(`OK    ${dir}: ${files.length} svg files`)
}

if (errors > 0) {
  console.error(`\n${errors} problem(s) found`)
  process.exit(1)
}
console.log('\nAll checks passed')
