"use client";

import { useParams } from "next/navigation";

// Utility imports

// Component imports
import VideoSessionsTab from "../../lesson/VideoSessionsTab";

export default function LessonList() {
  const params = useParams();
  const courseId = params?.id || params?.classId;

  return (
    <>
      <div className='py-6'>
        <VideoSessionsTab course_id_param={courseId} />
      </div>

      {/* <Modal size='2xl' open={isModal} onOpenChange={setIsModal}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <UploadVideo
              courseId={courseId}
              selectedLesson={find(lessonsData?.data, {
                id: selectedLesson,
              })}
              onUploadSuccess={handleUploadSuccess}
            />
          </form>
        </Form>
      </Modal> */}
    </>
  );
}
