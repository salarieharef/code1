// Icon imports
import IconTitleMaker from "@/components/agreement/icon-title-maker";
import ListingIcon from "@/static/icons/agreement/listing-icon.svg";

// Component imports
import AgreementGroupList from "@/components/agreement/agreement-group-list";
import BaseAgreements from "@/components/agreement/base-agreements";
import FaqSearchResult from "@/components/faq/faq-search-result";
import QuestionMarkIcon from "@/static/icons/question-mark-icon.svg";

const Faq = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    group?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const group = searchParams?.group || "";

  return (
    <div
      className='mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-y-8 px-4 pb-14 pt-4 lg:py-10'
      id='search-result'
    >
      {query || group ? (
        <FaqSearchResult searchQuery={query} group_id={group} />
      ) : null}
      <IconTitleMaker
        icon={<ListingIcon className='size-7 text-blue-400' />}
        title={"دسته بندی پرسش ها"}
      />
      <AgreementGroupList type={"faq"} />
      <IconTitleMaker
        icon={<QuestionMarkIcon className='size-7 text-blue-400' />}
        title={"پرسش‌های متداول"}
        className='mt-0 lg:mt-4 [&_svg]:!size-8' //The default is 6 but this one needs more space
      />
      <BaseAgreements type={"faq"} />
    </div>
  );
};

export default Faq;
