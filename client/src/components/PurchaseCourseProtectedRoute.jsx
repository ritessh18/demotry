// import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { useParams, Navigate } from "react-router-dom";

// const PurchaseCourseProtectedRoute = ({ children }) => {
//   const { courseId } = useParams();
//   const { data, isLoading, error } =
//     useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <p>Loading...</p>;

//   // Redirect to login if not authenticated or no valid data
//   if (!data || error) {
//     return <Navigate to={`/course-detail/${courseId}`} />;
//   }

//   // Check for valid purchase status
//   const isPurchased = data?.purchased === true;
//   const isPaymentCompleted = data?.paymentStatus === "completed"; // adjust key as per API

//   if (!isPurchased || !isPaymentCompleted) {
//     return <Navigate to={`/payment/${courseId}`} />;
//   }

//   return children;
// };

// export default PurchaseCourseProtectedRoute;


import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } =
    useGetCourseDetailWithStatusQuery(courseId, {
      refetchOnMountOrArgChange: true, // Ensure fresh status
    });

  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCheckingStatus(false);
    }, 1500); // Give time for webhook to complete (adjust as needed)
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading || checkingStatus) return <p>Verifying your payment...</p>;

  if (!data || error) {
    return <Navigate to={`/course-detail/${courseId}`} />;
  }

  const isPurchased = data?.purchased === true;
  const isPaymentCompleted = data?.purchaseStatus === "completed";

  if (!isPurchased || !isPaymentCompleted) {
    return <Navigate to={`/payment/${courseId}`} />;
  }

  return children;
};

export default PurchaseCourseProtectedRoute;
