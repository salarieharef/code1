// Component imports
import { FeatureCard, FeatureImagePos } from "./feature-card";

// SVG imports
import feature1 from "@/static/icons/features/feature1.svg";

export default function Features({ className }: any) {
  return (
    <div
      className={`w-full bg-slate-50 px-16 py-8 dark:bg-slate-900 xl:px-60 xl:py-16 ${className}`}
    >
      <FeatureCard
        title='دروس آنلاین'
        description='مدرس ها دو ترفند برای آموزش در اختیار دارن در سایت یکی از محبوب ترین روش ها دروس آنلاین هست. آنچه می یابید ممکن است شما را شگفت زده و الهام بخش کند'
        btnLink='/category'
        btnText='مرور دروس'
        image={feature1}
        imagePos={FeatureImagePos.right}
        selected
      />

      {/* <FeatureCard
        title="دسته‌بندی دروس"
        description="تمام دروس دسته بندی شده اند و شما می توانید تمام دروس مربوط به رشته خود را به راحتی پیدا کنید"
        btnLink="/category"
        btnText="مرور دسته‌بندی‌ها"
        image={feature2}
        imagePos={FeatureImagePos.left}
        selected
      /> */}
    </div>
  );
}
