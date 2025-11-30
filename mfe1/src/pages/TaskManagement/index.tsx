import {
  ErrorFallback,
  LoadingComponent,
} from "@/components/common/remote-wrapper";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";

const TaskManagement = createRemoteAppComponent({
  loader: () => loadRemote("remote/Button"),
  loading: <LoadingComponent />,
  fallback: (error: any) => <ErrorFallback error={error} />,
});

export default TaskManagement;
