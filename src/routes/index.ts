import React, { lazy } from "react";

const Home = lazy(() => import("~/views/Home"));
const NotFound = lazy(() => import("~/views/NotFound"));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
}

export const routes: RouteConfig[] = [
  { path: "/", component: Home },
  { path: "*", component: NotFound },
];
