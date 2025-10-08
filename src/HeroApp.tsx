import { RouterProvider } from "react-router";
import { router } from "./router/app.router";

export const HeroApp = () => {
  return <RouterProvider router={router} />;
};
