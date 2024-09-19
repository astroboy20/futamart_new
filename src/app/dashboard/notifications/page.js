import { Notification } from "@/container/dashboard/notification";
import { ProtectedRoute } from "@/context/ProtectedRoute";
export default function Page() {
  return (
    <div>
      <ProtectedRoute>
        <Notification />
      </ProtectedRoute>
    </div>
  );
}
