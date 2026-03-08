import { RouterProvider } from "react-router-dom";
import { Providers } from "./app/providers";
import { router } from "./app/routes";

const App = () => (
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);

export default App;
