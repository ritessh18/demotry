// import React from "react";
// import Course from "./Course";
// import { useLoadUserQuery } from "@/features/api/authApi";

// const MyLearning = () => {
//   const { data, isLoading } = useLoadUserQuery();

//   const myLearning = data?.user?.enrolledCourses || [];
//   return (
//     <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
//       <h1 className="font-bold text-2xl">My Learning</h1>
//       <div className="my-5">
//         {isLoading ? (
//           <MyLearningSkeleton />
//         ) : myLearning.length === 0 ? (
//           <p>You are not enrolled in any course .</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {" "}
//             {myLearning.map((course, index) => (
//               <Course key={index} course={course} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLearning;

// const MyLearningSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//     {[...Array(3)].map((_, index) => (
//       <div
//         key={index}
//         className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
//       ></div>
//     ))}
//   </div>
// );


import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourses || [];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 my-10">
      <h1 className="font-bold text-2xl">My Learning</h1>
      {!isLoading && data?.user?.name && (
        <h2 className="text-lg font-medium mt-2 mb-4 text-gray-600 dark:text-gray-300">
          Welcome, {data.user.name}
        </h2>
      )}
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={course._id || index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
