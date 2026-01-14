import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";
import {
  Button,
  LoaderTwo,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { ErrorFallback } from "../../remote-wrapper";

const CreateTaskFormWithProvider = createRemoteAppComponent({
  loader: () => loadRemote("remote/CreateTaskFormWithProvider"),
  loading: <LoaderTwo />,
  fallback: (error: any) => <ErrorFallback error={error} />,
});

const TaskSideSheet = () => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  return (
    <Sheet open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Create new task"
        >
          <CirclePlus className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tạo nhiệm vụ mới</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <CreateTaskFormWithProvider header="Tạo nhiệm vụ từ Host App" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskSideSheet;
