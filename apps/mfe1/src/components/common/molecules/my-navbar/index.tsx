import Navbar from "@/components/layouts/admin-panel/navbar";
import { createBridgeComponent } from "@module-federation/bridge-react/v18";

const MyNavbar = ({
  title,
  extraContent,
  className,
}: {
  title: string;
  extraContent?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Navbar title={title} extraContent={extraContent} className={className} />
  );
};

export default createBridgeComponent({
  rootComponent: MyNavbar,
});
