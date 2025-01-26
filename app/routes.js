//Read more about routing here: https://reactrouter.com/how-to/file-route-conventions
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes({
  ignoredRouteFiles: ["**/*.css", "**/*.test.{js,jsx,ts,tsx}", "**/__*.*"],
});
