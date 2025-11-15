"use client";

import { db } from "@/lib/firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

// Define a base type that includes the document ID
type WithId<T> = T & { id: string };

export function useRealtimeCollection<T extends DocumentData>(
  path: string
): { data: WithId<T>[]; error: string | null; blocked: boolean } {
  const [data, setData] = useState<WithId<T>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const col = collection(db, path);
    const unsub = onSnapshot(
      col,
      (snap) => {
        setData(
          snap.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as WithId<T>)
          )
        );
        setError(null);
        setBlocked(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        const msg = err.message.toLowerCase();
        if (
          msg.includes("blocked") ||
          msg.includes("aborted") ||
          err.code === "unavailable"
        ) {
          setBlocked(true);
        } else {
          setError("Lỗi kết nối. Vui lòng thử lại.");
        }
      }
    );

    return unsub;
  }, [path]);

  return { data, error, blocked };
}
