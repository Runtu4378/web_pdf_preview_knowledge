import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/index/dealBase64",
    "exact": true,
    "component": require('../index/dealBase64.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index/index.js').default
  },
  {
    "path": "/index/p-embed",
    "exact": true,
    "component": require('../index/p-embed.js').default
  },
  {
    "path": "/index/p-iframe",
    "exact": true,
    "component": require('../index/p-iframe.js').default
  },
  {
    "path": "/index/p-object",
    "exact": true,
    "component": require('../index/p-object.js').default
  },
  {
    "component": () => React.createElement(require('D:/code/cmrh/learn/web_pdf_preview_knowledge/web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];

export default function() {
  return (
<Router history={window.g_history}>
      <Route render={({ location }) =>
        renderRoutes(routes, {}, { location })
      } />
    </Router>
  );
}
