import {
  roleTitlesInformation,
  sectionTitles,
} from "@/constant/teaching-in-kateb/information.constant";
import { nextFetcher } from "@/utils/api/next-fetcher";
import routes from "@/utils/api/routes";
import { cn } from "@/utils/cn";
import { flatten, map } from "lodash-es";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
import { WrapperOutlineText } from "../WrapperOutlineText";
import {
  convertSecondsToTime,
  formatTime,
} from "@/utils/functions/formatDateTimeForServer";

export default function BasicInformation({
  informationData,
  wrapperStyle,
}: any) {
  const { watch } = useFormContext();
  const { data: session }: any = useSession();

  // Get 'academic_affiliation' and 'academic_role' fields for conditional display
  const academicAffiliation = watch("academic_affiliation");
  const academicRole = watch("academic_role");
  const isCollege = watch("is_college");

  // Fetch city data
  const { data: citiesData } = useSWRInfinite(
    (index) =>
      watch("state")
        ? routes.homeRoutes.cities({
            state: watch("state"),
            limit: 1000,
            page: index + 1,
          })?.url
        : null,
    (url) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.cities()?.method,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const cities = flatten(map(citiesData, "data"));

  // Fetch state data
  const { data: statesData } = useSWRInfinite(
    (index) => routes.homeRoutes.states({ page: index + 1, limit: 1000 })?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.states()?.method,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const states = flatten(map(statesData, "data"));

  // Fetch university data
  const { data: universitiesData } = useSWRInfinite(
    (index) =>
      routes.homeRoutes.universities({ page: index + 1, limit: 1000 })?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.homeRoutes.universities()?.method,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const universities = flatten(map(universitiesData, "data"));

  // Fetch field data
  const { data: fieldData } = useSWRInfinite(
    (index) => routes.fieldRoutes.fields({ page: index + 1 })?.url,
    (url) =>
      nextFetcher({
        url,
        method: routes.fieldRoutes.fields()?.method,
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const fields = flatten(map(fieldData, "data"));

  // Fetch academic branches data
  const { data: academicBranchData } = useSWRInfinite(
    (index) => routes.categoryRoutes.categories({ page: index + 1 }),
    (url: any) =>
      nextFetcher({
        url,
        method: "POST",
        body: {
          type: "academic_branch",
          version: 2,
        },
        useToken: true,
      }),
    { revalidateOnFocus: false }
  );
  const academic_branches = flatten(map(academicBranchData, "data"));

  // Lookup functions to get names by ID
  const lookupFunctions: Record<string, (id: string) => string> = {
    city_id: (id) => cities.find((c: any) => c.id === id)?.name || "---",
    state: (id) => states.find((s: any) => s.id === id)?.name || "---",
    university_id: (id) =>
      universities.find((u: any) => u.id === id)?.name || "---",
    field_id: (id) => fields.find((f: any) => f.id === id)?.name || "---",
    mobile: (id) => session?.user?.mobile,
    gender: (value) => (value === "man" ? "آقا" : "خانم"),
    is_college: (value) => (value === "true" ? "بله" : "خیر"),
    colleges: (value: any) => {
      return value?.length
        ? value?.map((item: any) => item.title).join("/ ")
        : "---";
    },
    avg_lesson_time: (value) =>
      formatTime(convertSecondsToTime(Number(value) || 0)) || "",
    academic_branch: (id: string) => {
      const branch = academic_branches.find((b: any) => b.id == id);
      return branch?.title || "---";
    },
    academic_group: (value: any) => {
      return value?.length
        ? value.map((item: any) => item.title).join(", ")
        : "---";
    },
    academic_field: (value: any) => {
      return value?.length
        ? value.map((item: any) => item.title).join(", ")
        : "---";
    },
  };

  // Function to get display value based on the field type
  const getFieldDisplayValue = (field: string) => {
    const fieldValue = watch(field);
    const lookupFunction = lookupFunctions[field];

    if (field === "section") {
      return sectionTitles[fieldValue] || "---";
    }
    return lookupFunction ? lookupFunction(fieldValue) : fieldValue || "---";
  };
  // html description
  const getHtmlDisplayValue = (field: string) => {
    const fieldValue = watch(field);
    return { __html: fieldValue || "---" };
  };

  //!TODO : CHANGE ALL AUTOCOMPLETE AND MULTISELECT
  //!TODO : change condition radio btn  => ex : item.field === "academic_affiliation"||
  return (
    <>
      {informationData?.map((section: any, sectionIndex: any): any => (
        <WrapperOutlineText
          titleBorder={section.sectionTitle}
          className={cn("mt-8 px-2 py-6 sm:px-6", wrapperStyle)}
          key={sectionIndex}
        >
          <div className='mb-6'>
            <div className='grid grid-cols-1 gap-4'>
              {section?.items?.map((item: any, itemIndex: any) => (
                <div
                  key={`information-${itemIndex}`}
                  className={cn(
                    "flex items-center justify-between",
                    item.field === "description" &&
                      "flex-col items-start space-y-2"
                  )}
                >
                  <span className='font-semibold text-slate-700'>
                    {item.key}
                  </span>
                  <span className='text-slate-900'>
                    {item.field === "description" ? (
                      // Render HTML safely
                      <p
                        className='text-slate-900'
                        dangerouslySetInnerHTML={getHtmlDisplayValue(
                          item.field
                        )}
                      />
                    ) : (
                      // Render normal text
                      <span className='text-slate-900'>
                        {item?.field === "academic_affiliation"
                          ? academicAffiliation === "true"
                            ? `بله ${academicRole ? `- ${roleTitlesInformation[academicRole]}` : ""}`
                            : "خیر"
                          : item.field === "is_college" && isCollege === "true"
                            ? `${getFieldDisplayValue(item.field)}`
                            : getFieldDisplayValue(item.field)}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </WrapperOutlineText>
      ))}
    </>
  );
}
