import { useEffect } from "react";

export const SITE_OWNER = "Amy Liu";

/** Sets document.title as "<page> — Amy Liu" (or the owner name alone when page is omitted). */
export function useDocumentTitle(page?: string) {
  const title = page ? `${page} — ${SITE_OWNER}` : `${SITE_OWNER} — Portfolio`;
  useEffect(() => {
    document.title = title;
  }, [title]);
}
