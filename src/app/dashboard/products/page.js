import { Products } from "@/container/dashboard/products";
import { ProtectedRoute } from "@/context/ProtectedRoute";
export default function Page() {
  return (
    <div>
      <ProtectedRoute>
        {" "}
        <Products />
      </ProtectedRoute>
    </div>
  );
}
