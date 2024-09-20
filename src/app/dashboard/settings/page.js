import { Settings } from "@/container/dashboard/settings/settings";
import { ProtectedRoute } from "@/context/ProtectedRoute";


export default function Page() {
  return (
    <div>
      <ProtectedRoute>
        <Settings/>
      </ProtectedRoute>
    </div>
  );
}
