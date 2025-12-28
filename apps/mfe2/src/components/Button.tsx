import React from "react";
import { publishEvent } from "@repo/core/event-bus";
import { Button } from "@repo/ui";

const RemoteButton: React.FC = () => {
  const triggerSuccess = () => {
    publishEvent("notification:show", {
      title: "Thành công!",
      message: "Dữ liệu từ Remote MFE2 đã được đồng bộ.",
      type: "success",
      duration: 3000,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Remote Button Component</h2>
      <Button onClick={triggerSuccess}>Click me from Remote!</Button>
      <p className="text-xs text-green-600 mt-2">
        ✓ Connected to host - Notification service ready
      </p>
    </div>
  );
};

export default RemoteButton;
