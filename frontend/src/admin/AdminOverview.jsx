/**
 * File name: src/admin/AdminOverview.jsx
 * Purpose: Admin dashboard overview screen.
 * Contains: Quick stats cards loaded from appointments, services, staff, reviews, and messages APIs.
 * Used by: Route /admin.
 * Future edits: Add charts, revenue metrics, or daily schedule summaries here.
 */
import { useEffect, useState } from 'react';
import { CalendarCheck, Inbox, Scissors, Star, Users } from 'lucide-react';
import { adminApi, unwrap } from '../api/adminApi';
import AdminPageHeader from '../components/AdminPageHeader.jsx';
const cards=[['Appointments','appointments',CalendarCheck],['Services','services',Scissors],['Staff','staff',Users],['Reviews','reviews',Star],['Messages','messages',Inbox]];
export default function AdminOverview(){ const [stats,setStats]=useState({}); useEffect(()=>{ async function load(){ const [a,s,st,r,m]=await Promise.allSettled([adminApi.appointments(),adminApi.services(),adminApi.staff(),adminApi.adminReviews(),adminApi.messages()]); setStats({appointments:a.status==='fulfilled'?unwrap(a.value).length:0,services:s.status==='fulfilled'?unwrap(s.value).length:0,staff:st.status==='fulfilled'?unwrap(st.value).length:0,reviews:r.status==='fulfilled'?unwrap(r.value).length:0,messages:m.status==='fulfilled'?unwrap(m.value).length:0}); } load();},[]); return <section><AdminPageHeader title="Dashboard Overview" subtitle="Quick snapshot of salon operations and customer activity."/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map(([label,key,Icon])=><div key={key} className="rounded-3xl border border-blush bg-white p-5 shadow-soft"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase text-stone-500">{label}</p><p className="mt-2 text-4xl font-black text-brown">{stats[key]??'—'}</p></div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-brown"><Icon size={22}/></div></div></div>)}</div><div className="mt-6 rounded-3xl bg-brown p-6 text-white shadow-soft"><h2 className="text-xl font-black">Owner Notes</h2><p className="mt-2 text-sm text-white/80">Use the left menu to confirm appointments, update prices, approve reviews, change offers, and adjust business hours. Public website data updates from the backend collections.</p></div></section>; }
