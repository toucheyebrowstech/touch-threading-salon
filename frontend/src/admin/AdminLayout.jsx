/**
 * File name: src/admin/AdminLayout.jsx
 * Purpose: Main protected admin dashboard layout.
 * Contains: Sidebar navigation, mobile nav, logout button, appointment sound alert controls, and Outlet content area.
 * Used by: Protected /admin routes.
 * Future edits: Add dashboard links, change owner layout, or move alert controls here.
 */

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CalendarDays, Gift, Home, LogOut, MessageSquareText, Scissors, Settings, Sparkles, Star, Users } from 'lucide-react';
import { clearToken } from '../api/adminApi';
import AdminAppointmentSoundAlert from '../components/AdminAppointmentSoundAlert.jsx';

const links = [
  ['/admin', 'Overview', Home],
  ['/admin/appointments', 'Appointments', CalendarDays],
  ['/admin/services', 'Services', Scissors],
  ['/admin/offers', 'Offers', Gift],
  ['/admin/staff', 'Staff', Users],
  ['/admin/reviews', 'Reviews', Star],
  ['/admin/messages', 'Messages', MessageSquareText],
  ['/admin/settings', 'Settings', Settings]
];

export default function AdminLayout() {
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    nav('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-blush bg-white p-5 shadow-soft lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brown text-white">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-sm font-black text-brown">Touch Threading</p>
            <p className="text-xs text-stone-500">Owner dashboard</p>
          </div>
        </div>

        <div className="mt-5">
          <AdminAppointmentSoundAlert />
        </div>

        <nav className="mt-6 space-y-2">
          {links.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              end={to === '/admin'}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive ? 'bg-brown text-white' : 'text-brown hover:bg-blush/60'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl bg-stone-100 px-4 py-3 text-sm font-black text-brown hover:bg-blush"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      <header className="sticky top-0 z-20 border-b border-blush bg-white/90 p-3 backdrop-blur lg:hidden">
        <div className="mb-3">
          <AdminAppointmentSoundAlert />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              end={to === '/admin'}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${
                  isActive ? 'bg-brown text-white' : 'bg-cream text-brown'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button onClick={logout} className="whitespace-nowrap rounded-full bg-stone-100 px-4 py-2 text-xs font-black text-brown">
            Logout
          </button>
        </div>
      </header>

      <main className="p-4 lg:ml-72 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
