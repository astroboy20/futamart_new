import { Chats } from "@/container/dashboard/chats";
import { ProtectedRoute } from "@/context/ProtectedRoute";

export default function Page() {
  return (
    <div>
      <ProtectedRoute>
        <Chats />
      </ProtectedRoute>
    </div>
  );
}
