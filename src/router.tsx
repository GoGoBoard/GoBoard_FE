import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Base from './Base';
import Board from './pages/Board';
import Login from './pages/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Board />} handle={{ authRequired: true }} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/board"
        element={<Board />}
        handle={{ authRequired: true }}
      />
    </Route>,
  ),
);
