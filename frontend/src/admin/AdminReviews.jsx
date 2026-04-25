/**
 * File name: src/admin/AdminReviews.jsx
 * Purpose: Review moderation screen for public testimonials.
 * Contains: Review list, approval/hide toggle, rating display, and delete action.
 * Used by: Route /admin/reviews.
 * Future edits: Add reply-to-review or featured testimonial controls here.
 */
import { adminApi } from '../api/adminApi';
import { useAdminResource } from '../hooks/useAdminResource';
import { shortDate } from '../utils/format';
import AdminPageHeader from '../components/AdminPageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
export default function AdminReviews(){ const {data,loading,error,refresh}=useAdminResource(adminApi.adminReviews); async function toggle(r){ await adminApi.approveReview(r._id, !r.isApproved); refresh(); } async function remove(id){ if(confirm('Delete this review?')){ await adminApi.deleteReview(id); refresh(); } } return <section><AdminPageHeader title="Reviews" subtitle="Approve reviews before they appear on the public website."/><>{loading&&<LoadingSpinner/>}{error&&<EmptyState title="Could not load reviews" message={error}/>} {!loading&&!error&&data.length===0&&<EmptyState title="No reviews yet" message="Customer review submissions will appear here."/>}<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map(r=><div key={r._id} className="rounded-3xl border border-blush bg-white p-5 shadow-soft"><div className="flex items-center justify-between"><p className="font-black text-brown">{r.name||'Customer'}</p><span className={`rounded-full px-3 py-1 text-xs font-black ${r.isApproved?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{r.isApproved?'Approved':'Hidden'}</span></div><p className="mt-1 text-gold">{'★'.repeat(Number(r.rating||5))}</p><p className="mt-3 text-sm text-stone-700">“{r.message||r.comment||''}”</p><p className="mt-3 text-xs text-stone-500">Submitted {shortDate(r.createdAt)}</p><div className="mt-4 flex gap-2"><button onClick={()=>toggle(r)} className="rounded-xl bg-blush px-3 py-2 text-xs font-black text-brown">{r.isApproved?'Hide':'Approve'}</button><button onClick={()=>remove(r._id)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700">Delete</button></div></div>)}</div></></section>; }
