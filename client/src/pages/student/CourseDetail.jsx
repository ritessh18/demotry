// // import BuyCourseButton from "@/components/BuyCourseButton";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// // import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// // import React from "react";
// // import ReactPlayer from "react-player";
// // import { useNavigate, useParams } from "react-router-dom";

// // const CourseDetail = () => {
// //   const params = useParams();
// //   const courseId = params.courseId;
// //   const navigate = useNavigate();

// //   const { data, isLoading, isError } =
// //     useGetCourseDetailWithStatusQuery(courseId, {
// //       refetchOnMountOrArgChange: true, // 🔁 this ensures fresh fetch
// //     });

// //   if (isLoading) return <h1>Loading ...</h1>;

// //   if (isError) return <h1> Failed to load course etails</h1>;
  

// //   const { course, purchased, purchaseStatus } = data;

// //   const handleContinueCourse = () => {
// //     if (purchased) {
// //       navigate(`/course-progress/${courseId}`);
// //     }
// //   };

// //   return (
// //     <div className="space-y-5 ">
// //       <div className="bg-[#2D2F31] text-white ">
// //         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2 ">
// //           <h1 className="font-bold text-2xl md:text-3xl">
// //             {course?.courseTitle}
// //           </h1>
// //           <p className="text-base md:text-lg">{course?.subTitle}</p>
// //           <p>
// //             Created by{" "}
// //             <span className="text-[#C0C4FC] underline italic">
// //               {course?.creator.name}
// //             </span>
// //           </p>
// //           <div className="flex items-center gap-2 text-sm">
// //             <BadgeInfo size={16} />
// //             <p>Last Updated {course?.createdAt.split("T")[0]} </p>
// //           </div>
// //           <p>Students enrolled : {course?.enrolledStudents.length} </p>
// //         </div>
// //       </div>
// //       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
// //         <div className="w-full lg:w-1/2 space-y-5">
// //           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
// //           <p
// //             className="text-sm"
// //             dangerouslySetInnerHTML={{ __html: course.description }}
// //           />
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Course Content</CardTitle>
// //               <CardDescription>
// //                 {course.lectures.length} Lectures
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-3">
// //               {course.lectures.map((lecture, idx) => (
// //                 <div key={idx} className="flex items-center gap-3 text-sm">
// //                   <span>
// //                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
// //                   </span>
// //                   <p>{lecture.lectureTitle}</p>
// //                 </div>
// //               ))}
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <div className="w-full lg:w-1/3">
// //           <Card>
// //             <CardContent className="p-4 flex flex-col">
// //               <div className="w-full aspect-video mb-4">
// //                 <ReactPlayer
// //                   width="100%"
// //                   height="100%"
// //                   url={course.lectures[0].videoUrl}
// //                   controls={true}
// //                 />
// //               </div>
// //               <h1>{course.lectures[0].lectureTitle}</h1>
// //               <Separator className="my-2" />
// //               <h1 className="text-lg md:text-xl font-semibold">
// //                 <span>₹{course.coursePrice}</span>
// //               </h1>
// //             </CardContent>
// //             {/* <CardFooter>
// //               {purchased ? (
// //                 <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
// //               ) : (
// //                 <BuyCourseButton courseId={courseId}/>
// //               )}
// //             </CardFooter> */}

// //             <CardFooter>
// //               {!purchased ? (
// //                 <BuyCourseButton courseId={courseId} />
// //               ) : purchaseStatus === "pending" ? (
// //                 <Button
// //                   className="w-full"
// //                   onClick={() => navigate(`/payment/${courseId}`)}
// //                 >
// //                   Complete Payment
// //                 </Button>
// //               ) : (
// //                 <Button onClick={handleContinueCourse} className="w-full">
// //                   Continue Course
// //                 </Button>
// //               )}
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseDetail;



// import BuyCourseButton from "@/components/BuyCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const CourseDetail = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const navigate = useNavigate();

//   const { data, isLoading, isError } =
//     useGetCourseDetailWithStatusQuery(courseId, {
//       refetchOnMountOrArgChange: true,
//     });

//   if (isLoading) return <h1>Loading ...</h1>;

//   if (isError) return <h1>Failed to load course details</h1>;

//   const { course, purchased, purchaseStatus } = data;

//   const handleContinueCourse = () => {
//     if (purchased) {
//       navigate(`/course-progress/${courseId}`);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {course?.courseTitle}
//           </h1>
//           <p className="text-base md:text-lg">{course?.subTitle}</p>
//           <p>
//             Created by{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last Updated {course?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled : {course?.enrolledStudents.length}</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto my-5 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>
//                 {course.lectures.length} Lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm break-words">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p className="break-words">{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
//                 <ReactPlayer
//                   width="100%"
//                   height="100%"
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1 className="text-base sm:text-lg font-medium">
//                 {course.lectures[0].lectureTitle}
//               </h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">
//                 <span>₹{course.coursePrice}</span>
//               </h1>
//             </CardContent>

//             <CardFooter>
//               {!purchased ? (
//                 <BuyCourseButton courseId={courseId} />
//               ) : purchaseStatus === "pending" ? (
//                 <Button
//                   className="w-full"
//                   onClick={() => navigate(`/payment/${courseId}`)}
//                 >
//                   Complete Payment
//                 </Button>
//               ) : (
//                 <Button onClick={handleContinueCourse} className="w-full">
//                   Continue Course
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;


import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId, {
      refetchOnMountOrArgChange: true,
    });

  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (isError) return <h1 className="text-center mt-10">Failed to load course details</h1>;

  const { course, purchased, purchaseStatus } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base sm:text-lg">{course?.subTitle}</p>
          <p>
            Created by{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Video and Price Section - on top for mobile */}
        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls
                />
              </div>
              <h1 className="text-base sm:text-lg font-medium">
                {course.lectures[0].lectureTitle}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{course.coursePrice}
              </h1>
            </CardContent>

            <CardFooter>
              {!purchased ? (
                <BuyCourseButton courseId={courseId} />
              ) : purchaseStatus === "pending" ? (
                <Button
                  className="w-full"
                  onClick={() => navigate(`/payment/${courseId}`)}
                >
                  Complete Payment
                </Button>
              ) : (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Course Description and Lecture List */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-5">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm break-words">
                  <span>
                    {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p className="break-words">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
