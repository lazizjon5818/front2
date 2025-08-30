// src/components/common/ScrollRestorer.tsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** pathname -> scrollY saqlaymiz */
const STORAGE_KEY = "__scroll_by_path__";

function loadMap(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveMap(map: Record<string, number>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

export default function ScrollRestorer() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'
  const mapRef = useRef<Record<string, number>>(loadMap());

  // Har qanday scrollda joriy pathname uchun pozitsiyani saqlab boramiz
  useEffect(() => {
    const onScroll = () => {
      mapRef.current[pathname] = window.scrollY || 0;
      saveMap(mapRef.current);
    };
    const throttled = (() => {
      let t = 0;
      return () => {
        const now = Date.now();
        if (now - t > 100) {
          t = now;
          onScroll();
        }
      };
    })();

    window.addEventListener("scroll", throttled, { passive: true });
    window.addEventListener("beforeunload", onScroll);
    return () => {
      onScroll();
      window.removeEventListener("scroll", throttled);
      window.removeEventListener("beforeunload", onScroll);
    };
  }, [pathname]);

  // Route o'zgarganda: POP => tiklash, PUSH/REPLACE => tepaga
  useEffect(() => {
    // Brauzer defaultini qo'lda boshqaramiz
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const saved = mapRef.current[pathname] ?? 0;

    const restore = () => {
      if (navType === "POP") {
        // back/forward: oldingi sahifaning saqlangan joyiga
        window.scrollTo({ top: saved, left: 0, behavior: "auto" });
      } else {
        // yangi sahifaga o'tish: tepadan
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    // Kontent balandligi tayyor bo‘lishi uchun 2x rAF + microtask
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(restore, 0);
      });
    });
  }, [pathname, navType]);

  return null;
}
