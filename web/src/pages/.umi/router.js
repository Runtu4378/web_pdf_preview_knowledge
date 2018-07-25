import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;


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
