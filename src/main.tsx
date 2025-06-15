import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Route, Switch } from 'wouter';

import './index.css';

import HomePage from '@/modules/home/pages/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </StrictMode>
);
