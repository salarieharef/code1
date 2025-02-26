import Link from "next/link";

const content = {
  errorCode: "404",
  title: "صفحه ی مورد نظر شما پیدا نشد .",
  description: "متأسفیم، ما نتوانستیم صفحه مورد نظر شما را پیدا کنیم.",
  buttonText: "باز گشت به صفحه اصلی",
};

const styles = {
  main: "grid place-items-center px-6 py-24 sm:py-32 lg:px-8",
  container: "text-center",
  errorCode: "text-2xl md:text-4xl font-bold text-primary",
  title: "mt-4 text-xl font-medium tracking-tight text-slate-900 md:text-5xl",
  description: "mt-6 text-base leading-7 text-slate-600",
  buttonWrapper: "mt-10 flex items-center justify-center gap-x-6",
  button:
    "rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
};

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.errorCode}>{content.errorCode}</p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>
        <div className={styles.buttonWrapper}>
          <Link href='/' className={styles.button}>
            {content.buttonText}
          </Link>
        </div>
      </div>
    </main>
  );
}
