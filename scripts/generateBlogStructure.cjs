// scripts/generateBlogStructure.js

const fs = require('fs');
const path = require('path');

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function getFiles(srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => !fs.statSync(path.join(srcPath, file)).isDirectory());
}

function generateBlogStructure(srcPath) {
  const categories = getDirectories(srcPath);
  const structure = categories.map(category => {
    const subCategoriesPath = path.join(srcPath, category);
    const subCategories = getDirectories(subCategoriesPath);
    return {
      name: category,
      subCategories: subCategories.map(subCategory => {
        const articlesPath = path.join(subCategoriesPath, subCategory);
        const articles = getFiles(articlesPath);
        return {
          name: subCategory,
          articles: articles.map(article => article.replace('.md', ''))
        };
      })
    };
  });
  fs.writeFileSync('src/blogStructure.json', JSON.stringify(structure, null, 2));
}

generateBlogStructure(path.join(__dirname, '../src/pages/blog'));