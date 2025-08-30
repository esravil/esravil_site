import fs from 'fs';
import path from 'path';
import { HomeClient } from './home-client';

// Function to count additional lines in about page content
function getAboutContentLines() {
  try {
    const aboutFilePath = path.join(process.cwd(), 'src/app/about/page.tsx');
    const aboutContent = fs.readFileSync(aboutFilePath, 'utf8');
    
    // Find the content after "Hey I'm esravil..." paragraph  
    const afterFirstParagraph = aboutContent.split('Hey I&apos;m esravil')[1];
    if (!afterFirstParagraph) return 12; // fallback
    
    // Count meaningful lines (headers, list items)
    const meaningfulLines = (afterFirstParagraph.match(/(h2 className|<li>)/g) || []).length;
    
    return Math.max(meaningfulLines, 1);
  } catch (error) {
    return 12; // fallback number
  }
}

export default function Home() {
  const additionalLines = getAboutContentLines();
  return (
    <HomeClient additionalLines={additionalLines} />
  );
}
