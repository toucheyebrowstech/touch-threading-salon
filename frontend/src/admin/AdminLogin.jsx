/**
 * File name: src/admin/AdminLogin.jsx
 * Purpose: Admin login page for salon owner access.
 * Contains: Email/password form, JWT save logic, loading/error states, and redirect after login.
 * Used by: Route /admin/login.
 * Future edits: Change login copy, background, or credential form behavior here.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { adminApi, setToken, unwrap } from '../api/adminApi';
import FormField from '../components/FormField.jsx';
export default function AdminLogin(){ const nav=useNavigate(); const [form,setForm]=useState({email:'',password:''}); const [loading,setLoading]=useState(false); const [error,setError]=useState(''); async function submit(e){ e.preventDefault(); try{ setLoading(true); setError(''); const res=await adminApi.login(form); const data=unwrap(res); setToken(data.token); nav('/admin',{replace:true}); }catch(err){ setError(err?.response?.data?.message||'Login failed. Check admin email and password.'); }finally{ setLoading(false); } } return <main className="min-h-screen bg-gradient-to-br from-cream via-white to-blush p-4 grid place-items-center"><form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-soft border border-blush"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brown text-white"><Scissors size={26}/></div><h1 className="mt-5 text-center text-3xl font-black text-brown">Salon Admin</h1><p className="mt-2 text-center text-sm text-stone-600">Manage appointments, services, offers, staff, reviews, messages, and business hours.</p>{error&&<div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}<div className="mt-6 space-y-4"><FormField label="Admin Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/><FormField label="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><button disabled={loading} className="w-full rounded-2xl bg-brown px-5 py-3 font-black text-white shadow-soft disabled:opacity-60">{loading?'Signing in...':'Sign In'}</button></div></form></main>; }
