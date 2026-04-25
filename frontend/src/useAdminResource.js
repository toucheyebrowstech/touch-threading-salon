/**
 * ============================================================
 * File: frontend/src/hooks/useAdminResource.js
 * Purpose: Reusable admin dashboard hook for loading, creating,
 * updating, and deleting backend resources such as services,
 * offers, staff, appointments, reviews, and messages.
 *
 * Used by:
 * - AdminServices.jsx
 * - AdminOffers.jsx
 * - AdminStaff.jsx
 * - AdminAppointments.jsx
 * - AdminReviews.jsx
 * - AdminMessages.jsx
 *
 * What this file does:
 * - Fetches resource data from the backend API
 * - Tracks loading and error state
 * - Provides create/update/delete helpers
 * - Keeps admin pages cleaner and easier to maintain
 * ============================================================
 */

import { useCallback, useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "https://touch-threading-salon.onrender.com";

function buildUrl(resource, id = "") {
  const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
  const cleanId = String(id || "").replace(/^\/+|\/+$/g, "");

  return cleanId
    ? `${API_BASE}/api/${cleanResource}/${cleanId}`
    : `${API_BASE}/api/${cleanResource}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null
        ? data.message || data.error || "Request failed"
        : data || "Request failed";

    throw new Error(message);
  }

  return data;
}

export function useAdminResource(resource) {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!resource) return;

    setLoading(true);
    setError("");

    try {
      const data = await fetch(buildUrl(resource)).then(parseResponse);
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.items)
            ? data.items
            : [];

      setItems(list);
    } catch (err) {
      setError(err.message || "Unable to load data.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [resource]);

  const getOne = useCallback(
    async (id) => {
      if (!resource || !id) return null;

      setLoading(true);
      setError("");

      try {
        const data = await fetch(buildUrl(resource, id)).then(parseResponse);
        setItem(data);
        return data;
      } catch (err) {
        setError(err.message || "Unable to load item.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [resource]
  );

  const create = useCallback(
    async (payload) => {
      if (!resource) return null;

      setSaving(true);
      setError("");

      try {
        const data = await fetch(buildUrl(resource), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload || {}),
        }).then(parseResponse);

        await load();
        return data;
      } catch (err) {
        setError(err.message || "Unable to create item.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  const update = useCallback(
    async (id, payload) => {
      if (!resource || !id) return null;

      setSaving(true);
      setError("");

      try {
        const data = await fetch(buildUrl(resource, id), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload || {}),
        }).then(parseResponse);

        await load();
        return data;
      } catch (err) {
        setError(err.message || "Unable to update item.");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  const remove = useCallback(
    async (id) => {
      if (!resource || !id) return false;

      setSaving(true);
      setError("");

      try {
        await fetch(buildUrl(resource, id), {
          method: "DELETE",
        }).then(parseResponse);

        await load();
        return true;
      } catch (err) {
        setError(err.message || "Unable to delete item.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    items,
    item,
    loading,
    saving,
    error,
    load,
    refresh: load,
    getOne,
    create,
    update,
    remove,
    setItems,
    setItem,
    setError,
  };
}