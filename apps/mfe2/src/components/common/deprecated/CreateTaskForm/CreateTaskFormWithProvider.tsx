import CreateTaskForm, { type CreateTaskFormProps } from ".";
import { createBridgeComponent } from "@module-federation/bridge-react/v18";
import AppProvider from "@/components/layouts/app-provider";
import { TaskProvider } from "@/contexts/TaskContext";

const CreateTaskFormWithProvider = (props: CreateTaskFormProps) => {
  return (
    <AppProvider>
      <TaskProvider>
        <CreateTaskForm {...props} />
      </TaskProvider>
    </AppProvider>
  );
};

export default createBridgeComponent({
  rootComponent: CreateTaskFormWithProvider,
});
