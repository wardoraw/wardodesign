import fs from 'fs';

function updateAppTsx() {
    const appPath = './src/App.tsx';
    let appContent = fs.readFileSync(appPath, 'utf-8');
    
    let projectsData = JSON.parse(fs.readFileSync('./projects-data.json', 'utf-8'));
    
    // Clean up titles and descriptions
    projectsData = projectsData.map(p => {
        const cleanTitle = p.title.replace(' :: Behance', '');
        const cleanCategory = p.category.replace(' :: Behance', '');
        return {
            ...p,
            title: cleanTitle,
            category: cleanCategory,
            description: `Proyecto de ${cleanCategory.toLowerCase()} para ${p.client.replace(' :: Behance', '')}.`,
            isNew: p.year === '2026'
        };
    });
    
    // Convert to string
    const projectsString = `const PROJECTS = ${JSON.stringify(projectsData, null, 2)};`;
    
    // Replace in App.tsx
    const startIdx = appContent.indexOf('const PROJECTS = [');
    const endIdx = appContent.indexOf('];\n\nexport default function App()') + 2;
    
    if (startIdx !== -1 && endIdx !== -1) {
        appContent = appContent.substring(0, startIdx) + projectsString + appContent.substring(endIdx);
        fs.writeFileSync(appPath, appContent);
        console.log('Updated src/App.tsx');
    } else {
        console.error('Could not find PROJECTS array in App.tsx');
    }
}

updateAppTsx();
