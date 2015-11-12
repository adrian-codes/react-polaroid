'use strict';

import fs from 'fs';
import path from 'path';
import { reactToHTML } from './utils/StaticUtils';

const dataPath = path.resolve(__dirname, 'data');
const date = new Date();
const sitemap = [`<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`];
const atomFeed = [`<feed xmlns="http://www.w3.org/2005/Atom">
<title>Website Title</title>
<link href="http://website.com/" rel="alternate"/>
<link href="http://website.com/atom.xml" rel="self"/>
<id>http://website.com/</id>
<updated>${date}</updated>`];
let summary = '';
let sitemapString = '';
let atomString = '';


const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
const atomFeedPath = path.resolve(__dirname, 'public', 'atom.xml');

fs.writeFile(sitemapPath, sitemap, (err) => {
  if (err) {
    throw err;
  }
  console.log('Sitemap initialized.');
});
fs.writeFile(atomFeedPath, atomFeed, (err) => {
  if (err) {
    throw err;
  }
  console.log('Atom Feed initialized.');
});

fs.readdir(dataPath, (err, files) => {
  let i = 0;
  let a = 0;
  files.forEach((f) => {
    const filePath = path.resolve(dataPath, f);
    const options = { encoding: 'utf8' };

    const fileContent = fs.readFileSync(filePath, options);

    const { html, slug } = reactToHTML(fileContent);
    const json = JSON.parse(fileContent);
    if (json.props.itemName) {
      summary = json.props.description;
    }
    const outputPath = path.resolve(__dirname, 'public', slug.concat('.html'));
    fs.writeFileSync(outputPath, html);
    console.log(outputPath, ' created');
      //generate sitemap
      const date = new Date();
      sitemapString += `
  <url>
    <loc>http://website.com/${slug}.html</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`;
      if (i === files.length - 1) {
        sitemapString += '\n</urlset>';
      }
      i += 1;

      //generate atom feed
      atomString += `
  <entry>
    <link href="http://website.com/${slug}.html" rel="alternate"/>
    <id>http://website.com/${slug}.html</id>
    <title>` + json.title + `</title>
    <updated>${date}</updated>
    <summary>` + json.props.description + `</summary>
  </entry>`;
      if (a === files.length - 1) {
        atomString += '\n</feed>';
      }
      a += 1;

  });

  //write to sitemap file
  fs.appendFile(sitemapPath, sitemapString, (err) => {
    if (err) {
      throw err;
    }
  });
  //write to atom file
  fs.appendFile(atomFeedPath, atomString, (err) => {
    if (err) {
      throw err;
    }
  });
});
