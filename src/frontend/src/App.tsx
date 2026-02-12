import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import LandingPage from './components/landing/LandingPage';

// Lazy load offer pages for code splitting
const OffTheBeatenPathPage = lazy(() => import('./pages/offers/OffTheBeatenPathPage'));
const PrivateAndPersonalPage = lazy(() => import('./pages/offers/PrivateAndPersonalPage'));
const FlexibleAsHellPage = lazy(() => import('./pages/offers/FlexibleAsHellPage'));
const StoriesAndBanterPage = lazy(() => import('./pages/offers/StoriesAndBanterPage'));
const StayYourWayPage = lazy(() => import('./pages/offers/StayYourWayPage'));
const ChooseYourOwnAdventurePage = lazy(() => import('./pages/offers/ChooseYourOwnAdventurePage'));
const ContactSubmissionsAdminPage = lazy(() => import('./pages/admin/ContactSubmissionsAdminPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-teal">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-xl font-bold">Loading...</p>
      </div>
    </div>
  );
}

// Root layout component
function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const offTheBeatenPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/off-the-beaten-path',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OffTheBeatenPathPage />
    </Suspense>
  ),
});

const privateAndPersonalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/private-and-personal',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivateAndPersonalPage />
    </Suspense>
  ),
});

const flexibleAsHellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/flexible-as-hell',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FlexibleAsHellPage />
    </Suspense>
  ),
});

const storiesAndBanterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/stories-and-banter',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StoriesAndBanterPage />
    </Suspense>
  ),
});

const stayYourWayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/stay-your-way',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StayYourWayPage />
    </Suspense>
  ),
});

const chooseYourOwnAdventureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/offers/choose-your-own-adventure',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChooseYourOwnAdventurePage />
    </Suspense>
  ),
});

// Primary admin contact/messages route
const adminContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/contact',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactSubmissionsAdminPage />
    </Suspense>
  ),
});

// Legacy admin submissions route (alias to /admin/contact)
const adminSubmissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/submissions',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactSubmissionsAdminPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  offTheBeatenPathRoute,
  privateAndPersonalRoute,
  flexibleAsHellRoute,
  storiesAndBanterRoute,
  stayYourWayRoute,
  chooseYourOwnAdventureRoute,
  adminContactRoute,
  adminSubmissionsRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
