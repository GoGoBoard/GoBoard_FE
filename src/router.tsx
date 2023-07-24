import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Base from './Base';
import Article from './pages/Article';
import Board from './pages/Board';
import Index from './pages/Index';
import Login from './pages/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board" handle={{ authRequired: true }}>
        <Route index element={<Board />} />
        <Route path="article/:articleIdx" element={<Article />} />
      </Route>
    </Route>,
  ),
);
