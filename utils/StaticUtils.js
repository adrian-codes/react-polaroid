'use strict';

import React from 'react';
import Home from '../jsx/templates/Home';
import {renderLayout} from '../jsx/Layout';

export function reactToHTML (data) {
    const d = JSON.parse(data);
    const props = d.props;
    let jsx;
    let html;

    switch (d.component) {
        case 'Home':
            jsx = React.renderToStaticMarkup(<Home {...props} />);
            break;
        default:
            break;
    }

    html = renderLayout(d.title, jsx);

    return {html, slug: d.slug};
}
