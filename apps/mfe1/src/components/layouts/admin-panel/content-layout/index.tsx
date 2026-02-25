import Navbar from "../navbar";
import { useAppContext } from "@/components/providers/app-provider";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const { isRemote } = useAppContext();
  return (
    <div className="w-full px-4">
      {!isRemote && <Navbar title={title} />}
      <div>{children}</div>
    </div>
  );
}
