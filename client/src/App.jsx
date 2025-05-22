import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/createLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import PaymentPage from "./pages/PayementPage";
import SearchPage from "./pages/student/SearchPage";
import EditRole from "./pages/admin/EditRole";

// import route guards
import {
  ProtectedRoute,
  AuthenticatedUser,
  AdminRoute,
} from "./components/ProtectedRoutes"; // adjust path as needed
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";




const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <PurchaseCourseProtectedRoute>
            <ProtectedRoute>
              <CourseProgress />
            </ProtectedRoute>
          </PurchaseCourseProtectedRoute>
        ),
      },

      {
        path: "payment/:courseId",
        element: (
            <PaymentPage />
        ),
      },

      // Admin routes (protected & role-checked)
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "course",
            element: (
              <AdminRoute>
                <CourseTable />
              </AdminRoute>
            ),
          },
          {
            path: "course/create",
            element: (
              <AdminRoute>
                <AddCourse />
              </AdminRoute>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <AdminRoute>
                <EditCourse />
              </AdminRoute>
            ),
          },
          {
            path: "course/:courseId/lecture",
            element: (
              <AdminRoute>
                <CreateLecture />
              </AdminRoute>
            ),
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: (
              <AdminRoute>
                <EditLecture />
              </AdminRoute>
            ),
          },
            {
            path: "editRole",
            element: (
            <AdminRoute>
              <EditRole />
            </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider> 
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
