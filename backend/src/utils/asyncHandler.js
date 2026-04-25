/**
 * File: backend/src/utils/asyncHandler.js
 * Purpose: Wraps async Express controllers so errors go to the central error handler.
 * Features: Removes repeated try/catch blocks from controllers.
 * Used by: All controller files.
 * Future edits: Usually no changes needed unless switching error handling style.
 */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
