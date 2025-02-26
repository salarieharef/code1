const category_types = [
  "branch",
  "main_group",
  "side_group",
  "field",
  "lesson",
  "colleges",
  "academic_group",
  "academic_field",
];

const FlattenCategories = (data: Record<string, any>): number[] => {
  const flattenedCategories = category_types
    .flatMap(
      (type) =>
        data[type]
          ?.filter((item: any) => item?.id && item.id !== 0)
          .map((item: any) => Number(item.id)) || []
    )
    .filter((id) => +id !== 0);

  if (data.grade) flattenedCategories.push(Number(data.grade));
  if (data.academic_branch)
    flattenedCategories.push(Number(data.academic_branch));

  return flattenedCategories;
};

export { category_types, FlattenCategories };
