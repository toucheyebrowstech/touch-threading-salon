/**
 * File name: src/components/ProtectedRoute.jsx
 * Purpose: Protects admin pages from unauthenticated visitors.
 * Contains: Token check, admin verification, loading state, and redirect logic.
 * Used by: src/App.jsx around the admin layout route.
 * Future edits: Change authentication rules or redirect path here.
 */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { adminApi, getToken, unwrap } from '../api/adminApi';
import LoadingSpinner from './LoadingSpinner.jsx';
export default function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, ok: false });
  useEffect(() => { let alive = true; async function check(){ if(!getToken()){ setState({ loading:false, ok:false }); return; } try { const res = await adminApi.me(); unwrap(res); if(alive) setState({ loading:false, ok:true }); } catch { if(alive) setState({ loading:false, ok:false }); } } check(); return () => { alive = false; }; }, []);
  if (state.loading) return <div className="min-h-screen grid place-items-center"><LoadingSpinner label="Checking admin access..." /></div>;
  if (!state.ok) return <Navigate to="/admin/login" replace />;
  return children;
}
