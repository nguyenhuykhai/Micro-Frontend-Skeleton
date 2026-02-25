export interface RemoteApp {
  id: string;
  name: string;
  url: string;
  scope: string;
  module: string;
}

export interface AppRoute {
  key: string;
  path: string;
  isRemote?: boolean;
}
