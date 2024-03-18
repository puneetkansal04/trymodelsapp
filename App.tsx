import * as React from 'react';
import Router from './src/router/Router';
import useInitialization from './src/hooks/useInitialization';

function App() {
  useInitialization();
  return <Router />;
}

export default App;
