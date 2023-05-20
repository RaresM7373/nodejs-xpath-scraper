import { createBrowserRouter } from 'react-router-dom';

import { Routes } from '../constants/routes';
import RootScreen from '../screens/Root';

export const router = createBrowserRouter([
  {
    path: Routes.Root,
    element: <RootScreen />,
  },
]);
