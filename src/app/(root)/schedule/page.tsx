"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();

  useEffect(() => {
    console.log(isInterviewer)
    if ( !isInterviewer) {
      router.push("/");
    }
   
  }, [isInterviewer]);

  if (isLoading) return <LoaderUI />;
  
  // Only render the UI if the user is an interviewer
 
  return <InterviewScheduleUI />;
 
}

export default SchedulePage;