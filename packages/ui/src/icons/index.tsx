import type { ComponentType } from "react";

import type { IIcon } from "src/interfaces/IIcon";
import ClearDay from "./clear-day";
import ClearNight from "./clear-night";

export const iconRegistry = {
  day: ClearDay,
  night: ClearNight,
} as const satisfies Record<string, ComponentType<IIcon>>;

export type IconName = keyof typeof iconRegistry;
