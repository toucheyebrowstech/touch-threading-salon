/**
 * File: frontend/src/pages/Staff.jsx
 * Purpose: Public staff/workers page.
 * Features: Worker profile cards with roles, specialties, working days, bios, placeholders, and booking links.
 * Used by: Route /staff in App.jsx.
 * Future edits: Add real staff photos, certificates, or staff-specific calendars here.
 */

import { salonApi } from '../api/salonApi';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionTitle from '../components/SectionTitle';
import StaffCard from '../components/StaffCard';
import { fallbackStaff } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';

export default function Staff() {
  const { data: staff, loading } = usePublicData(salonApi.getStaff, fallbackStaff);

  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Our Team" title="Friendly beauty specialists" description="Choose a preferred worker while booking, or select any available specialist for your appointment." />
        {loading ? <LoadingSpinner label="Loading staff..." /> : null}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {staff.map((worker) => <StaffCard key={worker._id} staff={worker} />)}
        </div>
      </div>
    </main>
  );
}
