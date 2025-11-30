import type { LucideProps } from "lucide-react";

export interface AppMenuItem {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
  isRemote?: boolean;
}
