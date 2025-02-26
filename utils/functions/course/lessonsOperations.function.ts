import { map } from "lodash-es";

const HeadlineSetDefaultValues = (data: any, form: any) => {
  // form.reset(
  //   {
  //     headlines: map(data, (lesson) => ({
  //       id: lesson?.id,
  //       title: lesson?.title,
  //       name: lesson?.name,
  //     })) || [{ title: "", name: "" }],
  //   },
  //   { keepDefaultValues: true }
  // );

  form.setValue(
    "headlines",
    map(data, (lesson) => ({
      id: lesson?.id,
      title: lesson?.title,
      name: lesson?.name,
    })) || [{ title: "", name: "" }]
  );
};

export { HeadlineSetDefaultValues };
