import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import HomePage from '../pages/HomePage';
import GiftBuilderPage from '../pages/GiftBuilderPage';
import CorporatePage from '../pages/CorporatePage';
import CheckoutPage from '../pages/CheckoutPage';
import SuccessPage from '../pages/SuccessPage';
import NotFoundPage from '../pages/NotFoundPage';

import GiftLandingPage from '../gift/GiftLandingPage';
import GiftUnlockPage from '../gift/GiftUnlockPage';
import GiftRevealPage from '../gift/GiftRevealPage';

import AdminDashboardPage from '../admin/AdminDashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'builder', element: <GiftBuilderPage /> },
      { path: 'corporate', element: <CorporatePage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'success', element: <SuccessPage /> },
      { path: 'gift', element: <GiftLandingPage /> },
      { path: 'gift/unlock', element: <GiftUnlockPage /> },
      { path: 'gift/reveal', element: <GiftRevealPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
