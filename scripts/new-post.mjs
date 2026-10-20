// 새 글 뼈대 만들기:  npm run new -- "글 제목" [side|project|note]
import fs from 'node:fs';
import path from 'node:path';

const [title, kind = 'project'] = process.argv.slice(2);
if (!title) { console.error('사용법: npm run new -- "글 제목" [side|project|note]'); process.exit(1); }

const slug = title.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || `post-${Date.now()}`;
const today = new Date().toISOString().slice(0, 10);
const isNote = kind === 'note';
const dir = path.join('src/content', isNote ? 'notes' : 'posts');
const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) { console.error(`이미 있어요: ${file}`); process.exit(1); }

const front = isNote
  ? `---\ntitle: ${title}\ndate: ${today}\ndraft: true\n---\n\n`
  : `---\ntitle: ${title}\ndate: ${today}\norder: 0\nsection: ${kind}\ntag: New\nsummary: \ndraft: true\n---\n\n`;
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, front + '여기에 본문을 쓰세요.\n');
console.log(`만들었어요 → ${file}  (공개하려면 draft: true 를 지우세요)`);
