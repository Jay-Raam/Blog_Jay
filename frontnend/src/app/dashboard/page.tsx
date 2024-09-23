import CreatePost from "@/components/Post";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  );
};

export default Dashboard;
