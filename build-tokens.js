import StyleDictionary from 'style-dictionary';

const myStyleDictionary = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    }
  }
});

await myStyleDictionary.buildAllPlatforms();
