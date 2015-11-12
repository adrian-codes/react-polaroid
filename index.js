'use strict';

import fs from 'fs';
import path from 'path';
import {reactToHTML} from './utils/StaticUtils';

const dataPath = path.resolve(__dirname, 'data');

fs.readdir(dataPath, (err, files) => {
    files.forEach((f) => {
        const filePath = path.resolve(dataPath, f);
        const options = {encoding: 'utf8'};

        const fileContent = fs.readFileSync(filePath, options);
        const {html, slug} = reactToHTML(fileContent);
        const outputPath = path.resolve(__dirname, 'public', slug.concat('.html'));

        fs.writeFileSync(outputPath, html);
        console.log(outputPath, ' created');
    });
});
