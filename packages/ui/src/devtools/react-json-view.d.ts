declare module "react-json-view" {
  import { Component } from "react";

  export interface ReactJsonViewProps {
    src: object | any;
    name?: string | null;
    theme?: string;
    colorScheme?: "light" | "dark";
    iconStyle?: "circle" | "triangle" | "square";
    collapsed?: boolean | number;
    collapseStringsAfterLength?: number;
    shouldCollapse?: (field: any) => boolean;
    enableClipboard?: boolean;
    displayObjectSize?: boolean;
    displayDataTypes?: boolean;
    onEdit?: false | ((edit: any) => void);
    onAdd?: false | ((add: any) => void);
    onDelete?: false | ((del: any) => void);
    onSelect?: false | ((select: any) => void);
    sortKeys?: boolean;
    quotesOnKeys?: boolean;
    groupArraysAfterLength?: number;
    indentWidth?: number;
    validationMessage?: string;
    style?: React.CSSProperties;
  }

  export default class ReactJson extends Component<ReactJsonViewProps> {}
}
