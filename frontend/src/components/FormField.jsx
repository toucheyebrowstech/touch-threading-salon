/**
 * File name: src/components/FormField.jsx
 * Purpose: Reusable labeled input/select/textarea wrapper for admin forms.
 * Contains: Label, field styling, and error-friendly structure.
 * Used by: Admin login and CRUD manager forms.
 * Future edits: Change field appearance or supported input types here.
 */
export default function FormField({ label, as='input', className='', ...props }) { const Comp = as; return <label className="block"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-brown/70">{label}</span><Comp className={`w-full rounded-2xl border border-blush bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/10 ${className}`} {...props}/></label>; }
