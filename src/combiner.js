const fs = require('fs');
const { exit } = require('process');

let targetPath = process.argv.find((x) => x.startsWith('target='))?.split('=')[1];
let sourcePath = process.argv.find((x) => x.startsWith('source='))?.split('=')[1];
let outputPath = process.argv.find((x) => x.startsWith('output='))?.split('=')[1];

const languages = fs.readdirSync(targetPath);
languages.forEach(file => {
	console.log(file);
});

if(!(targetPath && sourcePath && outputPath))
{
	console.error("Cannot proceed generation if 'target' || 'source' || 'output' parameters are not all set");
	exit(-1);
}


function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
  function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
  
	if (isObject(target) && isObject(source)) {    
	  for (const key in source) {
		if (isObject(source[key])) {
		  if (!target[key]) { 
			Object.assign(target, { [key]: {} });
		  }else{          
			target[key] = Object.assign({}, target[key])
		  }
		  mergeDeep(target[key], source[key]);
		} else {
		  Object.assign(target, { [key]: source[key] });
		}
	  }
	}
  
	return mergeDeep(target, ...sources);
  }

languages.forEach(language => {
	const target = require(targetPath+'\\'+language);
	const source = require(sourcePath+'\\'+language);
	const test = mergeDeep(target, source); 

	fs.writeFileSync(outputPath+'\\'+language, JSON.stringify(test, null, 2));	
})
