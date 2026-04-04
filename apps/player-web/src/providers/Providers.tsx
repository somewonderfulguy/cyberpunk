import { ReactNode } from "react";
import { PlayerProvider } from "../stores";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => (
  <PlayerProvider>{children}</PlayerProvider>
);
