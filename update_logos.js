const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/dashboard/layout.tsx',
  'app/page.tsx',
  'app/product/page.tsx',
  'app/solutions/page.tsx',
  'app/ai/page.tsx',
  'app/security/page.tsx',
  'app/enterprise/page.tsx',
  'app/pricing/page.tsx'
];

filesToUpdate.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Add next/image import if not exists
  if (!content.includes("import Image from 'next/image'") && !content.includes('import Image from "next/image"')) {
    // Find the last import statement or the end of the 'use client' directive
    const useClientRegex = /'use client';\n/;
    if (useClientRegex.test(content)) {
      content = content.replace(useClientRegex, "'use client';\nimport Image from 'next/image';\n");
    } else {
      content = "import Image from 'next/image';\n" + content;
    }
    changed = true;
  }

  // Replace the logo div with Image component
  // <div className="w-4 h-4 bg-foreground rounded-none" />
  // <span className="uppercase tracking-widest text-xs">HANDOFF</span>
  
  const headerLogoRegex1 = /<div className="w-4 h-4 bg-foreground rounded-none" \/>\s*<span className="uppercase tracking-widest text-xs">HANDOFF<\/span>/g;
  const headerReplacement1 = '<Image src="/logo.png" alt="Handoff Logo" width={24} height={24} className="object-contain" />\n              <span className="uppercase tracking-widest text-xs">HANDOFF</span>';
  
  if (headerLogoRegex1.test(content)) {
    content = content.replace(headerLogoRegex1, headerReplacement1);
    changed = true;
  }
  
  const footerLogoRegex = /<div className="w-4 h-4 bg-foreground rounded-none" \/>\s*<span className="font-bold text-foreground">HANDOFF \/\/ 2026<\/span>/g;
  const footerReplacement = '<Image src="/logo.png" alt="Handoff Logo" width={20} height={20} className="object-contain" />\n            <span className="font-bold text-foreground">HANDOFF // 2026</span>';

  if (footerLogoRegex.test(content)) {
    content = content.replace(footerLogoRegex, footerReplacement);
    changed = true;
  }
  
  // also check other standalone logo divs just in case, but let's be safe.
  const standaloneLogoRegex = /<div className="w-4 h-4 bg-foreground rounded-none" \/>/g;
  const standaloneReplacement = '<Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain" />';
  
  if (standaloneLogoRegex.test(content)) {
    content = content.replace(standaloneLogoRegex, standaloneReplacement);
    changed = true;
  }

  // <div className="w-3 h-3 bg-foreground rounded-none" />
  const standaloneLogoSmallRegex = /<div className="w-3 h-3 bg-foreground rounded-none" \/>/g;
  const standaloneSmallReplacement = '<Image src="/logo.png" alt="Logo" width={16} height={16} className="object-contain" />';
  
  if (standaloneLogoSmallRegex.test(content)) {
    content = content.replace(standaloneLogoSmallRegex, standaloneSmallReplacement);
    changed = true;
  }

  // <div className="w-2 h-2 bg-foreground rounded-none" />
  const standaloneLogoTinyRegex = /<div className="w-2 h-2 bg-foreground rounded-none" \/>/g;
  const standaloneTinyReplacement = '<Image src="/logo.png" alt="Logo" width={12} height={12} className="object-contain" />';
  
  if (standaloneLogoTinyRegex.test(content)) {
    content = content.replace(standaloneLogoTinyRegex, standaloneTinyReplacement);
    changed = true;
  }
  
  // pricing page header logo uses w-2 h-2
  const customPricingLogoRegex = /<div className="w-2 h-2 bg-foreground rounded-none" \/>\s*PLANS_AND_PRICING/g;
  const customPricingReplacement = '<Image src="/logo.png" alt="Logo" width={12} height={12} className="object-contain" />\n              PLANS_AND_PRICING';
  
  if (customPricingLogoRegex.test(content)) {
    content = content.replace(customPricingLogoRegex, customPricingReplacement);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
