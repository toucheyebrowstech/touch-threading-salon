/**
 * ============================================================
 * File: frontend/src/hooks/useAdminResource.js
 * Purpose: Reusable admin dashboard hook for loading backend
 * resources such as services, offers, staff, appointments,
 * reviews, and messages.
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
 * - Supports adminApi functions like adminApi.appointments
 * - Supports string resources like "appointments"
 * - Tracks loading and error state
 * - Returns both `data` and `items` so existing admin pages work
 * - Keeps admin pages cleaner and easier to maintain
 * ============================================================
 */

import { useCallback, useEffect, useState } from "react";
import { api } from "../api/adminApi";

function normalizeList(response) {
  const payload = response?.data ?? response;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.appointments)) return payload.appointments;
  if (Array.isArray(payload?.services)) return payload.services;
  if (Array.isArray(payload?.offers)) return payload.offers;
  if (Array.isArray(payload?.staff)) return payload.staff;
  if (Array.isArray(payload?.reviews)) return payload.reviews;
  if (Array.isArray(payload?.messages)) return payload.messages;

  return [];
}

function normalizeError(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Unable to load data."
  );
}

async function loadResource(resource) {
  if (typeof resource === "function") {
    return resource();
  }

  const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
  return api.get(`/${cleanResource}`);
}

export function useAdminResource(resource, options = {}) {
  const { autoLoad = true } = options;

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!resource) return [];

    setLoading(true);
    setError("");

    try {
      const response = await loadResource(resource);
      const list = normalizeList(response);

      setData(list);
      setItems(list);

      return list;
    } catch (err) {
      const message = normalizeError(err);

      setError(message);
      setData([]);
      setItems([]);

      return [];
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
        let response;

        if (typeof resource === "function") {
          const listResponse = await loadResource(resource);
          const list = normalizeList(listResponse);
          response = list.find((entry) => entry?._id === id || entry?.id === id) || null;
        } else {
          const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
          response = await api.get(`/${cleanResource}/${id}`);
          response = response?.data ?? response;
        }

        setItem(response);
        return response;
      } catch (err) {
        setError(normalizeError(err));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [resource]
  );

  const create = useCallback(
    async (payload) => {
      if (!resource || typeof resource === "function") return null;

      setSaving(true);
      setError("");

      try {
        const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
        const response = await api.post(`/${cleanResource}`, payload || {});
        await load();
        return response?.data ?? response;
      } catch (err) {
        setError(normalizeError(err));
        return null;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  const update = useCallback(
    async (id, payload) => {
      if (!resource || !id || typeof resource === "function") return null;

      setSaving(true);
      setError("");

      try {
        const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
        const response = await api.patch(`/${cleanResource}/${id}`, payload || {});
        await load();
        return response?.data ?? response;
      } catch (err) {
        setError(normalizeError(err));
        return null;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  const remove = useCallback(
    async (id) => {
      if (!resource || !id || typeof resource === "function") return false;

      setSaving(true);
      setError("");

      try {
        const cleanResource = String(resource || "").replace(/^\/+|\/+$/g, "");
        await api.delete(`/${cleanResource}/${id}`);
        await load();
        return true;
      } catch (err) {
        setError(normalizeError(err));
        return false;
      } finally {
        setSaving(false);
      }
    },
    [resource, load]
  );

  useEffect(() => {
    if (autoLoad) load();
  }, [autoLoad, load]);

  return {
    data,
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
    setData,
    setItems,
    setItem,
    setError,
  };
}

export default useAdminResource;
