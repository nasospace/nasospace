import { RouterProvider } from "react-router-dom";
import { Providers } from "@/app/providers";
import { router } from "@/app/routes";

import { SmoothScroll, CustomCursor } from "@/components/shared";

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </SmoothScroll>
  );
}
