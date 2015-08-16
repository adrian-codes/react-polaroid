'use strict';

export function renderLayout (title, reactOutput) {
    return (`
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="icon" type="image/png" href="/favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>${title}</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8">
        <link href="./css/index.css" rel="stylesheet" />
    </head>
    <body>
        <div id="content">${reactOutput}</div>
    </body>
    </html>`
    );
}
