/**
 * File name: src/admin/AdminMessages.jsx
 * Purpose: Contact message inbox for salon owner.
 * Contains: Customer contact form submissions, contact info, message text, and received date.
 * Used by: Route /admin/messages.
 * Future edits: Add reply, archive, or read/unread functionality here.
 */
import { adminApi } from '../api/adminApi';
import { useAdminResource } from '../hooks/useAdminResource';
import { shortDateTime, text } from '../utils/format';
import AdminPageHeader from '../components/AdminPageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
export default function AdminMessages(){ const {data,loading,error,refresh}=useAdminResource(adminApi.messages); return <section><AdminPageHeader title="Messages" subtitle="Read customer contact form messages from the public contact page."><button onClick={refresh} className="rounded-2xl bg-brown px-4 py-3 text-sm font-black text-white">Refresh</button></AdminPageHeader>{loading&&<LoadingSpinner/>}{error&&<EmptyState title="Could not load messages" message={error}/>} {!loading&&!error&&data.length===0&&<EmptyState title="No messages yet" message="Contact form submissions will appear here."/>}<div className="grid gap-4 md:grid-cols-2">{data.map(m=><article key={m._id} className="rounded-3xl border border-blush bg-white p-5 shadow-soft"><div className="flex justify-between gap-4"><div><h3 className="font-black text-brown">{text(m.name)}</h3><p className="text-sm text-stone-500">{text(m.email)} · {text(m.phone)}</p></div><p className="text-xs text-stone-500">{shortDateTime(m.createdAt)}</p></div><p className="mt-3 text-sm font-bold text-rose">{text(m.subject,'Website message')}</p><p className="mt-2 text-sm text-stone-700">{text(m.message)}</p></article>)}</div></section>; }
