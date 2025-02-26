import ReusableFormTable from "./ReusableFormTable";

export default function EducationalActivities({
  loading,
  setLoading,
  type,
  read_only = false,
}: any) {
  const columns = [
    {
      key: "organization",
      label: "نام سازمان، دانشگاه، شرکت صنعتی، فناوری و خصوصی",
      span: 5,
      placeholder: "نام سازمان را وارد کنید",
      visible: true,
    },
    {
      key: "position",
      label: "موقعیت و نوع همکاری",
      span: 4,
      placeholder: "موقعیت و نوع همکاری را وارد کنید",
      visible: true,
    },
  ];

  return (
    <ReusableFormTable
      title='فعالیت علمی، پژوهشی، مهارتی و ...'
      fields={["organization", "position"]}
      columns={columns}
      name='education_activities'
      loading={loading}
      setLoading={setLoading}
      type={type}
      read_only={read_only}
    />
  );
}
