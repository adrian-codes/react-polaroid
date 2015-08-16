'use strict';

import fs from 'fs';
import path from 'path';
import {reactToHTML} from './utils/StaticUtils';

const dataPath = path.resolve(__dirname, 'data');

fs.readdir(dataPath, (err, files) => {
    files.forEach((f) => {
        const filePath = path.resolve(dataPath, f);
        const options = {encoding: 'utf8'};

        fs.readFile(filePath, options, (err, data) => {
            const {html, slug} = reactToHTML(data);
            const outputPath = path.resolve(__dirname, 'public', slug.concat('.html'));

            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    throw err;
                }
                console.log(outputPath, ' created');
            });
        });
    });
});


