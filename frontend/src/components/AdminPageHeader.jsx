/**
 * File name: src/components/AdminPageHeader.jsx
 * Purpose: Consistent page header for admin dashboard screens.
 * Contains: Title, subtitle, and optional right-side actions.
 * Used by: All admin pages.
 * Future edits: Adjust dashboard header spacing or typography here.
 */
export default function AdminPageHeader({ title, subtitle, children }) { return <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.3em] text-rose">Owner Dashboard</p><h1 className="mt-2 text-3xl font-black text-brown">{title}</h1>{subtitle && <p className="mt-2 max-w-2xl text-sm text-stone-600">{subtitle}</p>}</div>{children}</div>; }
