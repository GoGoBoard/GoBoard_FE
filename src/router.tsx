import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Base from './Base';
import Article from './pages/Article';
import Board from './pages/Board';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route
        index
        element={<Index />}
        handle={{ authRequired: false, redirectTo: '/board' }}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/board"
        handle={{ authRequired: true, redirectTo: '/login' }}
      >
        <Route index element={<Board />} />
        <Route path="article/:articleIdx" element={<Article />} />
      </Route>
    </Route>,
  ),
);
