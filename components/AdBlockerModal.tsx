"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Shield } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdBlockerModal({ open, onClose }: Props) {
  const isVN =
    typeof navigator !== "undefined" && navigator.language.startsWith("vi");

  const t = isVN
    ? {
        title: "Trình chặn quảng cáo đang chặn kết nối",
        desc: "Ứng dụng cần kết nối thời gian thực với Firebase để đồng bộ dữ liệu. Vui lòng tắt ad-blocker hoặc thêm trang này vào danh sách trắng.",
        steps: [
          "Tìm biểu tượng ad-blocker (uBlock, AdGuard, v.v.)",
          "Chọn “Tắt trên trang này” hoặc “Thêm vào danh sách trắng”",
          "Nhấn “Tải lại trang”",
        ],
        reload: "Tải lại trang",
      }
    : {
        title: "Ad-blocker is blocking the connection",
        desc: "This app needs real-time connection to Firebase. Please disable your ad-blocker or whitelist this site.",
        steps: [
          "Find your ad-blocker icon (uBlock, AdGuard, etc.)",
          "Click “Disable on this site” or “Whitelist”",
          "Click “Reload page”",
        ],
        reload: "Reload page",
      };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Shield className="w-5 h-5" />
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-sm">{t.desc}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              {t.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t.reload}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
