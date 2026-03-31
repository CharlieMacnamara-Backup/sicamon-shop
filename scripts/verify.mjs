import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Skillio Site Production Audit [Next.js 16 LTS Native]
 * This script uses a declarative rule registry to audit the codebase for 
 * production readiness, accessibility, and architectural compliance.
 */

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

console.log(`${BOLD}${YELLOW}🚀 Skillio 10x Declarative Audit${NC}\n`);

const srcDir = path.join(process.cwd(), 'src');
const rootDir = process.cwd();

/** 
 * Rule Registry: Declarative definitions of production best practices
 */
const rules = [
  {
    id: 'LTS_PROXY',
    name: 'Edge Architecture (Proxy)',
    check: () => fs.existsSync(path.join(rootDir, 'src/proxy.ts')) && !fs.existsSync(path.join(rootDir, 'src/middleware.ts')),
    tip: 'Next.js 16 favors proxy.ts for edge logic. Remove legacy middleware.ts.'
  },
  {
    id: 'LTS_METADATA',
    name: 'SEO: metadataBase',
    check: () => {
      const layout = fs.readFileSync(path.join(srcDir, 'app/layout.tsx'), 'utf8');
      return layout.includes('metadataBase: new URL');
    },
    tip: 'metadataBase is required for resolving relative OG image and canonical URLs.'
  },
  {
     id: 'A11y_ALT',
     name: 'Accessibility: Alt Text',
     checkFile: (path, content) => {
        if (content.includes('<Image') && (!content.includes('alt=') || content.includes('alt=""'))) {
           return false;
        }
        return true;
     },
     tip: 'Every <Image> must have descriptive alt text for neurodivergent accessibility.'
  },
  {
     id: 'LTS_IMAGE_OPT',
     name: 'Performance: next/image',
     checkFile: (path, content) => !content.includes('<img'),
     tip: 'Direct <img> tags bypass optimization. Always use the next/image component.'
  },
  {
     id: 'LTS_LOADING',
     name: 'Declarative State: loading.tsx',
     checkFile: (filePath) => {
        if (filePath.endsWith('page.tsx')) {
           return fs.existsSync(path.join(path.dirname(filePath), 'loading.tsx'));
        }
        return true;
     },
     tip: 'Every page.tsx must have a sibling loading.tsx for immediate user feedback.'
  },
  {
     id: 'PUBLIC_SAFETY',
     name: 'Public Repo: No Local Secrets',
     check: () => !fs.existsSync(path.join(rootDir, '.env.local')) || fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8').includes('.env'),
     tip: 'Ensure all secret files are explicitly ignored in .gitignore.'
  }
];

const results = { passed: [], failed: [] };

function audit() {
  const allFiles = [];
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      fs.statSync(p).isDirectory() ? walk(p) : allFiles.push(p);
    });
  };
  walk(srcDir);

  rules.forEach(rule => {
    let ok = true;
    if (rule.check) {
       ok = rule.check();
    } else if (rule.checkFile) {
       for (const f of allFiles) {
          const content = fs.readFileSync(f, 'utf8');
          if (!rule.checkFile(f, content)) {
             ok = false;
             results.failed.push({ rule, file: path.relative(rootDir, f) });
          }
       }
    }
    
    if (ok && !results.failed.some(f => f.rule.id === rule.id)) {
       results.passed.push(rule);
    }
  });
}

// 1. Run Standard Tools
const runStep = (name, cmd) => {
  try {
    console.log(`${BOLD}[STEP] ${name}...${NC}`);
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
};

const lintOk = runStep('Linting', 'npm run lint -- --fix');
const typeOk = runStep('Type Safety', 'npx tsc --noEmit');

// 2. Run Declarative Audit
console.log(`${BOLD}[STEP] Declarative Best Practices...${NC}`);
audit();

rules.forEach(rule => {
  const failures = results.failed.filter(f => f.rule.id === rule.id);
  if (failures.length > 0) {
    console.log(`${RED}✗ ${rule.name}${NC}`);
    failures.forEach(f => console.log(`  - ${f.file}`));
    console.log(`  ${YELLOW}💡 Tip: ${rule.tip}${NC}\n`);
  } else if (results.passed.includes(rule)) {
    console.log(`${GREEN}✓ ${rule.name}${NC}`);
  }
});

// 3. Verdict
if (lintOk && typeOk && results.failed.length === 0) {
  console.log(`\n${GREEN}${BOLD}✅ 10x AUDIT PASSED. Site is hardened for public production.${NC}`);
  process.exit(0);
} else {
  console.log(`\n${RED}${BOLD}❌ AUDIT FAILED. Resolve the declarative issues above.${NC}`);
  process.exit(1);
}
