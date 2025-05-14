// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
// } from "@/features/api/courseApi";
// import { toast } from "sonner";

// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const params = useParams();
//   const courseId = params.courseId;

//   const { data: courseByIdData, isLoading: courseByIdLoading } =
//     useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});



//   useEffect(() => {
//     if (courseByIdData?.course) {
//       const course = courseByIdData?.course
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.coursePrice,
//         courseThumbnail: "",
//       });
//       // setPreviewThumnail(course.courseThumbnail);
//     }
//   }, [courseByIdData]);
  

//   // useEffect(() => {
//   //   if (courseByIdData?.course) {
//   //     const course = courseByIdData?.course;
//   //     setInput({
//   //       courseTitle: course.courseTitle,
//   //       subTitle: course.subTitle,
//   //       description: course.description,
//   //       category: course.category,
//   //       courseLevel: course.courseLevel,
//   //       coursePrice: course.coursePrice,
//   //       courseThumbnail: "",
//   //     });
//   //   }
//   // }, [courseByIdData]);

//   const [previewThumnail, setPreviewThumnail] = useState("");

//   const navigate = useNavigate();

//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };
//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };

//   //get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     await editCourse({ formData, courseId });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "course Updated");
//     }
//     if (error) {
//       toast.error(error.data.message || "Failed to update course");
//     }
//   }, [isSuccess, error]);

//   if (courseByIdLoading)
//     return <Loader2 className="h-4 w-4 animate-spin"> Please wait </Loader2>;

//   const isPublished = true;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between gap-10">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your courses here. Click save when you're done .
//           </CardDescription>
//         </div>
//         <div className="space-x-2 space-y-2 ">
//           <Button variant="outline">
//             {isPublished ? "Unpublished" : "Published"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div className="space-y-2">
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="courseTitle"
//               value={input.courseTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Fullstack developer"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Become a fullstack dev 0- hero"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Description</Label>
//             <RichTextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex items-center gap-5">
//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Select onValueChange={selectCategory}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Javascript">Javascript</SelectItem>
//                     <SelectItem value="Python">Python</SelectItem>
//                     <SelectItem value="Docker">Docker</SelectItem>
//                     <SelectItem value="MongoDB">MongoDB</SelectItem>
//                     <SelectItem value="HTML">HTML</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Course Level</Label>
//               <Select onValueChange={selectCourseLevel}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label>Course Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*" // ✅ correct
//               className="w-fit"
//             />

//             {previewThumnail && (
//               <img
//                 src={previewThumnail}
//                 className="max-w-xs max-h-40 object-contain my-2 rounded shadow"
//                 alt="Course Thumbnail"
//               />
//             )}
//           </div>
//           <div className="flex gap-2">
//             <Button onClick={() => navigate("/admin/course")} variant="outline">
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateCourseHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;


























// import React, { useEffect, useState, lazy, Suspense } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// import {
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
// } from "@/features/api/courseApi";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// // Lazy load RichTextEditor for better performance
// const RichTextEditor = lazy(() => import("@/components/RichTextEditor"));

// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const [previewThumnail, setPreviewThumnail] = useState("");

//   const navigate = useNavigate();
//   const { courseId } = useParams();

//   const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
//     useGetCourseByIdQuery(courseId, {
//       refetchOnMountOrArgChange: true,
//       refetchOnFocus: true,
//       refetchOnReconnect: true,
//     });

//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   useEffect(() => {
//     if (courseByIdData?.course) {
//       const course = courseByIdData.course;
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.coursePrice,
//         courseThumbnail: "", // clear file input
//       });

//       setPreviewThumnail(course.courseThumbnail || "");
//     }
//   }, [courseByIdData]);

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };

//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("File too large. Max 2MB allowed.");
//         return;
//       }
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     await editCourse({ formData, courseId });

//     // Trigger refetch after the course update to refresh the data
//     refetch();
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Course updated successfully.");
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to update course.");
//     }
//   }, [isSuccess, error]);

//   if (courseByIdLoading)
//     return (
//       <div className="flex justify-center items-center h-96">
//         <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         <span className="ml-2">Loading course...</span>
//       </div>
//     );

//   const isPublished = true;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between gap-10">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your courses here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2 space-y-2">
//           <Button variant="outline">
//             {isPublished ? "Unpublished" : "Published"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div className="space-y-2">
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="courseTitle"
//               value={input.courseTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Fullstack developer"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Become a fullstack dev 0- hero"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Description</Label>
//             <Suspense fallback={<p>Loading editor...</p>}>
//               <RichTextEditor input={input} setInput={setInput} />
//             </Suspense>
//           </div>
//           <div className="flex items-center gap-5">
//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Select value={input.category} onValueChange={selectCategory}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Javascript">Javascript</SelectItem>
//                     <SelectItem value="Python">Python</SelectItem>
//                     <SelectItem value="Docker">Docker</SelectItem>
//                     <SelectItem value="MongoDB">MongoDB</SelectItem>
//                     <SelectItem value="HTML">HTML</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Course Level</Label>
//               <Select
//                 value={input.courseLevel}
//                 onValueChange={selectCourseLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label>Course Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />

//             {previewThumnail && previewThumnail !== "loading" && (
//               <img
//                 src={previewThumnail}
//                 className="max-w-xs max-h-40 object-contain my-2 rounded shadow"
//                 alt="Course Thumbnail"
//               />
//             )}
//           </div>
//           <div className="flex gap-2">
//             <Button
//               onClick={() => navigate("/admin/course")}
//               variant="outline"
//             >
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateCourseHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;




// import React, { useEffect, useState, lazy, Suspense } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// // Lazy load RichTextEditor for better performance
// const RichTextEditor = lazy(() => import("@/components/RichTextEditor"));

// const CourseTab = () => {
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const [previewThumnail, setPreviewThumnail] = useState("");

//   const navigate = useNavigate();
//   const { courseId } = useParams();

//   // Fetch course data
//   const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
//     useGetCourseByIdQuery(courseId, {
//       refetchOnWindowFocus: true,
//       refetchOnReconnect: true,
//       refetchOnMountOrArgChange: true,
//     });

//   // Mutation hook for editing the course
//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   useEffect(() => {
//     if (courseByIdData?.course) {
//       const course = courseByIdData.course;
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.coursePrice,
//         courseThumbnail: "", // clear file input
//       });

//       setPreviewThumnail(course.courseThumbnail || "");
//     }
//   }, [courseByIdData]);

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };

//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("File too large. Max 2MB allowed.");
//         return;
//       }
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     // Make mutation request to update the course
//     await editCourse({ formData, courseId });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Course updated successfully.");
//       refetch(); // Refetch the course data after mutation
//     }
//     if (error) {
//       toast.error(error?.data?.message || "Failed to update course");
//     }
//   }, [isSuccess, error, refetch, data]);

//   if (courseByIdLoading)
//     return (
//       <div className="flex justify-center items-center h-96">
//         <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         <span className="ml-2">Loading course...</span>
//       </div>
//     );

//   const isPublished = true;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between gap-10">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your courses here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2 space-y-2">
//           <Button variant="outline">
//             {isPublished ? "Unpublished" : "Published"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div className="space-y-2">
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="courseTitle"
//               value={input.courseTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Fullstack developer"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Become a fullstack dev 0- hero"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Description</Label>
//             <Suspense fallback={<p>Loading editor...</p>}>
//               <RichTextEditor input={input} setInput={setInput} />
//             </Suspense>
//           </div>
//           <div className="flex items-center gap-5">
//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Select value={input.category} onValueChange={selectCategory}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Javascript">Javascript</SelectItem>
//                     <SelectItem value="Python">Python</SelectItem>
//                     <SelectItem value="Docker">Docker</SelectItem>
//                     <SelectItem value="MongoDB">MongoDB</SelectItem>
//                     <SelectItem value="HTML">HTML</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Course Level</Label>
//               <Select
//                 value={input.courseLevel}
//                 onValueChange={selectCourseLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label>Course Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />

//             {previewThumnail && previewThumnail !== "loading" && (
//               <img
//                 src={previewThumnail}
//                 className="max-w-xs max-h-40 object-contain my-2 rounded shadow"
//                 alt="Course Thumbnail"
//               />
//             )}
//           </div>
//           <div className="flex gap-2">
//             <Button
//               onClick={() => navigate("/admin/course")}
//               variant="outline"
//             >
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateCourseHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;


import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const [enabled, setEnabled] = useState(false);
useEffect(() => {
  if (courseId) {
    setEnabled(true);
  }
}, [courseId]);

  const {
  data: courseByIdData,
  isLoading: courseByIdLoading,
  refetch,
} = useGetCourseByIdQuery(courseId, {
  skip: !enabled,
  refetchOnMountOrArgChange: true,
});

useEffect(() => {
  if (courseByIdData?.course) {
    const course = courseByIdData.course;
    setInput({
      courseTitle: course.courseTitle || "",
      subTitle: course.subTitle || "",
      description: course.description || "",
      category: course.category || "",
      courseLevel: course.courseLevel || "",
      coursePrice: course.coursePrice || "",
      courseThumbnail: "",
    });
    setPreviewThumbnail(course.courseThumbnail);
  }
}, [courseByIdData]);


  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    // await editCourse({ formData, courseId });
    try {
      const result = await editCourse({ formData, courseId }).unwrap();
      toast.success(result.message || "Course updated");
      refetch();
      navigate("/admin/course");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update course");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  const isPublished = false;
  //   const isLoading = false;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your courses here. Click save when you are done
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "unPublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Eg. Full Stack Developer"
          />
        </div>
        <div className="space-y-4 mt-5">
          <Label>Sub Title</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Eg. Become a full stack Devloper from begineer to pro"
          />
        </div>
        <div className="space-y-4 mt-5">
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>
        <div className="flex items-center gap-5">
          <div className="mt-4 space-y-3">
            <Label>Category</Label>
            <Select value={input.category} onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 space-y-3">
            <Label>Course Level</Label>
            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Course Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 space-y-3">
            <Label>Price in (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-fit"
            />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>
        <div className="mt-4 space-y-3 space-x-2">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;