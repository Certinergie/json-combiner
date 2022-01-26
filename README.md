# Json combiner

## How to use the project: 
```
 npm i
 node src/combiner.js target={target-folder} source={source-folder} output={output-folder}
```
⚠️ all parameters must be set
⚠️ all folder must exist

## How it works:
- Base on the 'target' folder, it scans all the *.json files.
- It combines recursively the json object for each language. 
- It outputs to joined file in the output directory with the 'lang.json' file name.
