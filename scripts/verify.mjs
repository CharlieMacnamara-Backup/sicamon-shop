import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Sicamon Site Production Audit [10X HARDENED]
 * Updated for Atelier Linguistic Standards and Localization Integrity.
 */

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

console.log(`${BOLD}${YELLOW}🚀 Sicamon 10x Project-Wide Audit${NC}\n`);

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

// Load en.json for Localization Integrity check
const enJsonPath = path.join(rootDir, 'messages', 'en.json');
const enJson = fs.existsSync(enJsonPath) ? JSON.parse(fs.readFileSync(enJsonPath, 'utf8')) : {};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const rules = [
  {
    id: 'VERSION_LOCK',
    name: 'Production: Exact Dependency Pins',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const targets = ['next', 'react', 'stripe', 'tailwindcss'];
      for (const t of targets) if (deps[t] && (deps[t].startsWith('^') || deps[t].startsWith('~'))) return false;
      return true;
    },
    tip: 'Pin dependencies in package.json.'
  },
  {
    id: 'ATELIER_PROTOCOL',
    name: 'Stripe Atelier (2026-03-25)',
    check: () => {
      const stripeLib = path.join(srcDir, 'lib/stripe.ts');
      if (!fs.existsSync(stripeLib)) return false;
      const content = fs.readFileSync(stripeLib, 'utf8');
      return content.includes('2026-03-25.dahlia') && content.includes('appInfo') && content.includes('sicamon-shop');
    },
    tip: 'Pin Stripe API level and include appInfo (sicamon-shop) in lib/stripe.ts.'
  },
  {
    id: 'DAHLIA_UI_MODE',
    name: 'Stripe: Embedded Page Protocol',
    checkFile: (path, content) => {
      if (content.includes('checkout.sessions.create') && !content.includes("ui_mode: 'embedded_page'")) return false;
      return true;
    },
    tip: 'Use ui_mode: "embedded_page" for all Dahlia checkout sessions.'
  },
  {
    id: 'WEBHOOK_ASYNC',
    name: 'Stripe: Async Webhook Standard',
    checkFile: (path, content) => {
      if (path.includes('api/webhook') && content.includes('stripe.webhooks') && !content.includes('constructEventAsync')) return false;
      return true;
    },
    tip: 'Use constructEventAsync for Cloudflare-compliant webhook verification.'
  },
  {
    id: 'SERVER_ACTION_ZOD',
    name: 'Security: Zod/Protocol Validation',
    checkFile: (path, content) => {
      if (path.includes('actions') && (content.includes('export async function') || content.includes('const'))) {
        if (content.includes('checkout') && !content.includes('.parse') && !content.includes('.safeParse') && !content.includes('validateAtelierInput')) return false;
      }
      return true;
    },
    tip: 'Validate all server action inputs.'
  },
  {
    id: 'DAHLIA_ZOD_ISSUES',
    name: 'Dahlia: Professional Zod Issues',
    checkFile: (path, content) => {
      // Enforce .issues over legacy .errors for ZodError handling
      return !(content.includes('.error.errors') || content.includes('.errors.map'));
    },
    tip: 'Use result.error.issues instead of legacy .errors for Zod reporting.'
  },
  {
    id: 'LOCALISATION_INTEGRITY',
    name: 'Logic: Localization Integrity',
    checkFile: (filePath, content) => {
      if (!filePath.endsWith('.tsx')) return true;
      
      // Find useTranslations namespace
      const namespaceMatch = content.match(/useTranslations\((["'])([^"']+)\1\)/);
      const namespace = namespaceMatch ? namespaceMatch[2] : null;
      
      // Find all t("key") calls with word boundaries to avoid false positives
      const tCalls = content.match(/\bt\((["'])([^"']+)\1\)/g) || [];
      
      for (const call of tCalls) {
        const keyMatch = call.match(/\bt\((["'])([^"']+)\1\)/);
        if (!keyMatch) continue;
        const key = keyMatch[2];
        
        // Full key construction
        const fullKey = namespace ? `${namespace}.${key}` : key;
        const value = getNestedValue(enJson, fullKey);
        
        if (value === undefined) {
          console.error(`${RED}  - Missing key: ${NC}${fullKey} in ${filePath}`);
          return false;
        }
      }
      return true;
    },
    tip: 'Ensure all t(\"key\") calls have entries in en.json.'
  },
  {
    id: 'UI_ADAPTIVE_HELPERS',
    name: 'UX: Adaptive Gallery Spacing',
    checkFile: (path, content) => {
      if (path.endsWith('.tsx') && (path.includes('_components') || path.includes('src/app'))) {
        const matches = content.match(/(?<!(sm|md|lg|xl|2xl):)\b(p[xy]?|m[xy]?|gap)-[0-9]+\b/g) || [];
        for (const m of matches) {
           const baseProp = m.split('-')[0];
           if (!new RegExp(`(sm|md|lg|xl|2xl):${baseProp}-[0-9]+`).test(content)) return false;
        }
      }
      return true;
    },
    tip: 'Use responsive spacing scales.'
  },
  {
    id: 'UI_BOUTIQUE_AESTHETICS',
    name: 'Aesthetics: Museum Gallery Finish',
    checkFile: (path, content) => {
      if (path.endsWith('.tsx') && (content.includes('<h1') || content.includes('<h2') || content.includes('<h3'))) {
        return content.includes('tracking-tight') || content.includes('tracking-tighter') || /tracking-\[0\.[23]em\]/.test(content);
      }
      return true;
    },
    tip: 'Apply museum-grade letter spacing to all headings.'
  },
  {
    id: 'UI_DARK_VISIBILITY',
    name: 'Branding: Dark Mode Visibility',
    checkFile: (path, content) => {
      if ((path.includes('Header.tsx') || path.includes('Footer.tsx') || path.includes('CTASection.tsx')) && content.includes('logo.png')) {
        return content.includes('dark:drop-shadow');
      }
      return true;
    },
    tip: 'Ensure logo visibility in dark mode.'
  },
  {
    id: 'UI_FRAUD_TELEMETRY',
    name: 'Safety: Site-wide Fraud Detection',
    check: () => {
      const p = path.join(srcDir, 'app/[locale]/layout.tsx');
      if (!fs.existsSync(p)) return false;
      const c = fs.readFileSync(p, 'utf8');
      return (c.includes('js.stripe.com/v3') || c.includes('js.stripe.com/dahlia/stripe.js')) && c.includes('<Script');
    },
    tip: 'Inject Stripe.js site-wide.'
  },
  {
    id: 'A11y_ALT',
    name: 'Accessibility: Alt Text',
    checkFile: (path, content) => {
      return !(content.includes('<Image') && (!content.includes('alt=') || content.includes('alt=""')));
    },
    tip: 'Add alt text to all images.'
  },
  {
    id: 'LTS_LOADING',
    name: 'UX: Loading States',
    checkFile: (filePath) => {
      if (filePath.endsWith('page.tsx')) return fs.existsSync(path.join(path.dirname(filePath), 'loading.tsx'));
      return true;
    },
    tip: 'Every page needs a sibling loading.tsx.'
  },
  {
    id: 'UI_CSS_CONFLICT',
    name: 'Aesthetics: Clean Prop Mapping',
    checkFile: (path, content) => {
      if (!path.endsWith('.tsx')) return true;
      const classPatterns = /className=["'`]([^"'`]+)["' `]/g;
      let match;
      while ((match = classPatterns.exec(content)) !== null) {
        const classes = match[1].split(/\s+/);
        const bps = { base: [], sm: [], md: [], lg: [], xl: [], '2xl': [] };
        classes.forEach(c => {
          const parts = c.split(':');
          const prop = parts.length > 1 ? parts[parts.length - 1] : parts[0];
          const bp = parts.length > 1 ? parts[0] : 'base';
          if (bps[bp]) bps[bp].push(prop);
        });
        for (const b in bps) {
          const p = bps[b];
          if (p.filter(x => x.startsWith('tracking-')).length > 1) return false;
          if (p.filter(x => x.startsWith('text-') && !/-zinc|-white|-black|-teal|-center|-left|-right|-justify/.test(x)).length > 1) return false;
        }
      }
      return true;
    },
    tip: 'Avoid conflicting Tailwind classes on the same breakpoint.'
  }
];

const results = { passed: [], failed: [] };

function audit() {
  const all = [];
  const walk = (dir) => { fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { if (!['node_modules', '.next', '.git', '.gemini', 'brain', 'scripts'].includes(f)) walk(p); }
    else all.push(p);
  })};
  walk(rootDir);

  rules.forEach(rule => {
    let ok = true;
    if (rule.check) {
       ok = rule.check();
       if (!ok) results.failed.push({ rule, file: 'Project/Root' });
    } else if (rule.checkFile) {
       for (const f of all) {
          const c = fs.readFileSync(f, 'utf8');
          if (!rule.checkFile(f, c)) { ok = false; results.failed.push({ rule, file: path.relative(rootDir, f) }); }
       }
    }
    if (ok && !results.failed.some(f => f.rule.id === rule.id)) results.passed.push(rule);
  });
}

const runStep = (name, cmd) => {
  try {
    console.log(`${BOLD}${BLUE}[STEP] ${name}...${NC}`);
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch { 
    console.log(`${RED}✗ ${name} FAILED.${NC}\n`);
    return false; 
  }
};

const lintOk = runStep('Linting', 'npx eslint src --fix');
const typeOk = runStep('Type Safety', 'npx tsc --noEmit --strict --skipLibCheck');

console.log(`${BOLD}${BLUE}[STEP] Declarative Audit...${NC}`);
audit();

rules.forEach(rule => {
  const failures = results.failed.filter(f => f.rule.id === rule.id);
  if (failures.length > 0) {
    console.log(`${RED}✗ ${rule.name}${NC}`);
    failures.slice(0, 3).forEach(f => console.log(`  - ${f.file}`));
  } else if (results.passed.includes(rule)) {
    console.log(`${GREEN}✓ ${rule.name}${NC}`);
  }
});

const pass = lintOk && typeOk && results.failed.length === 0;
console.log(pass ? `\n${GREEN}${BOLD}✅ 10x AUDIT PASSED${NC}` : `\n${RED}${BOLD}❌ AUDIT FAILED${NC}`);
process.exit(pass ? 0 : 1);
