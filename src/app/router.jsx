import { createHashRouter } from 'react-router-dom';
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
import RecipientLandingPage from '../gift/RecipientLandingPage';
import RecipientChoicePage from '../gift/RecipientChoicePage';
import RecipientAddressPage from '../gift/RecipientAddressPage';
import RecipientConfirmedPage from '../gift/RecipientConfirmedPage';

import AdminDashboardPage from '../admin/AdminDashboardPage';
import OrdersPage from '../pages/OrdersPage';
import CollectionsPage from '../pages/CollectionsPage';

const router = createHashRouter([
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
      { path: 'gift/open', element: <RecipientLandingPage /> },
      { path: 'gift/choose', element: <RecipientChoicePage /> },
      { path: 'gift/address', element: <RecipientAddressPage /> },
      { path: 'gift/confirmed', element: <RecipientConfirmedPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;

