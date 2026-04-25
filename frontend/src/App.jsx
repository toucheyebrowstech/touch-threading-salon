/**
 * File: frontend/src/App.jsx
 * Purpose: Main combined frontend app router for public website and admin dashboard.
 * Features: Public salon routes, protected admin routes, navbar/footer visibility control, mobile sticky booking button, and scroll-to-top behavior.
 * Used by: src/main.jsx.
 * Future edits: Add new public routes near the public route group or new dashboard routes inside the /admin layout group.
 */

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBookButton from './components/MobileStickyBookButton';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home';
import Services from './pages/Services';
import Offers from './pages/Offers';
import Book from './pages/Book';
import Staff from './pages/Staff';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminOverview from './admin/AdminOverview.jsx';
import AdminAppointments from './admin/AdminAppointments.jsx';
import AdminServices from './admin/AdminServices.jsx';
import AdminOffers from './admin/AdminOffers.jsx';
import AdminStaff from './admin/AdminStaff.jsx';
import AdminReviews from './admin/AdminReviews.jsx';
import AdminMessages from './admin/AdminMessages.jsx';
import AdminSettings from './admin/AdminSettings.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen text-cocoa">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/book" element={<Book />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<AdminOverview />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileStickyBookButton />}
    </div>
  );
}
