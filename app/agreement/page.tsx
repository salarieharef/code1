// SVG imports
import BookIcon from "@/static/icons/agreement/book-icon.svg";
import ListingIcon from "@/static/icons/agreement/listing-icon.svg";

// Component imports
import AgreementGroupList from "@/components/agreement/agreement-group-list";
import AgreementHandler from "@/components/agreement/agreement-handler";
import BaseAgreements from "@/components/agreement/base-agreements";
import IconTitleMaker from "@/components/agreement/icon-title-maker";

const Agreement = ({
  searchParams,
}: {
  searchParams?: {
    group?: string;
  };
}) => {
  const group = searchParams?.group || "";

  return (
    <div className='mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-y-8 px-4 pb-14 pt-4 lg:py-10'>
      {group ? <AgreementHandler agreement_group={group} /> : null}
      <IconTitleMaker
        icon={<ListingIcon className='size-7 text-blue-400' />}
        title={"دسته بندی قوانین و مقررات"}
      />
      <AgreementGroupList type={"agreement"} />
      <IconTitleMaker
        icon={<BookIcon className='text-blue-400' />}
        title={"قوانین و مقررات عمومی"}
        className='mt-0 lg:mt-4 [&_svg]:!size-8' //The default is 6 but this one needs more space
      />
      <BaseAgreements type={"agreement"} />
    </div>
  );
};

export default Agreement;
