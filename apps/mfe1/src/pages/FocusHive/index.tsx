import { ErrorFallback } from "@/components/common/remote-wrapper";
import { LoaderTwo } from "@repo/ui";
import { createRemoteAppComponent } from "@module-federation/bridge-react";
import { loadRemote } from "@module-federation/runtime";

const FocusHivePage = createRemoteAppComponent({
  loader: () => loadRemote("focushive/FocusHiveApp"),
  loading: <LoaderTwo />,
  fallback: (error: any) => <ErrorFallback error={error} />,
});

export default FocusHivePage;
