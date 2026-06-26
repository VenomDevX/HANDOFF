const fs = require('fs');

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

  // Add Logo import
  if (!content.includes("import { Logo }")) {
    const useClientRegex = /'use client';\n/;
    if (useClientRegex.test(content)) {
      content = content.replace(useClientRegex, "'use client';\nimport { Logo } from '@/components/logo';\n");
    } else {
      content = "import { Logo } from '@/components/logo';\n" + content;
    }
    changed = true;
  }

  const headerLogoRegex1 = /<div className="w-4 h-4 bg-foreground rounded-none" \/>\s*<span className="uppercase tracking-widest text-xs">HANDOFF<\/span>/g;
  const headerReplacement1 = '<Logo width={24} height={24} />\n              <span className="uppercase tracking-widest text-xs">HANDOFF</span>';
  
  if (headerLogoRegex1.test(content)) {
    content = content.replace(headerLogoRegex1, headerReplacement1);
    changed = true;
  }
  
  const footerLogoRegex = /<div className="w-4 h-4 bg-foreground rounded-none" \/>\s*<span className="font-bold text-foreground">HANDOFF \/\/ 2026<\/span>/g;
  const footerReplacement = '<Logo width={20} height={20} />\n            <span className="font-bold text-foreground">HANDOFF // 2026</span>';

  if (footerLogoRegex.test(content)) {
    content = content.replace(footerLogoRegex, footerReplacement);
    changed = true;
  }
  
  const standaloneLogoRegex = /<div className="w-4 h-4 bg-foreground rounded-none" \/>/g;
  const standaloneReplacement = '<Logo width={20} height={20} />';
  
  if (standaloneLogoRegex.test(content)) {
    content = content.replace(standaloneLogoRegex, standaloneReplacement);
    changed = true;
  }

  const standaloneLogoSmallRegex = /<div className="w-3 h-3 bg-foreground rounded-none" \/>/g;
  const standaloneSmallReplacement = '<Logo width={16} height={16} />';
  
  if (standaloneLogoSmallRegex.test(content)) {
    content = content.replace(standaloneLogoSmallRegex, standaloneSmallReplacement);
    changed = true;
  }

  const standaloneLogoTinyRegex = /<div className="w-2 h-2 bg-foreground rounded-none" \/>/g;
  const standaloneTinyReplacement = '<Logo width={12} height={12} />';
  
  if (standaloneLogoTinyRegex.test(content)) {
    content = content.replace(standaloneLogoTinyRegex, standaloneTinyReplacement);
    changed = true;
  }
  
  const customPricingLogoRegex = /<div className="w-2 h-2 bg-foreground rounded-none" \/>\s*PLANS_AND_PRICING/g;
  const customPricingReplacement = '<Logo width={12} height={12} />\n              PLANS_AND_PRICING';
  
  if (customPricingLogoRegex.test(content)) {
    content = content.replace(customPricingLogoRegex, customPricingReplacement);
    changed = true;
  }

  // Handle case where Image logo was already inserted
  const regexImage = /<Image src="\/logo\.png" alt="[^"]+" width={(\d+)} height={(\d+)} className="object-contain" \/>/g;
  
  if (regexImage.test(content)) {
    content = content.replace(regexImage, (match, w, h) => {
        return `<Logo width={${w}} height={${h}} />`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
