import { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { Loader2 } from "lucide-react";
import SelectLinkFormAdsHeaderItem from "./select-link-form-ads-header";

type SelectedTriggerInputAdsLinkProps = {
  selectedTabParam?: any;
  handleSelected: (value: string) => void;
  TabAds: { type: string; title: string; show: boolean }[];
  placeholder?: string;
};

const SelectedTriggerInputAdsLink: React.FC<
  SelectedTriggerInputAdsLinkProps
> = ({ selectedTabParam, handleSelected, TabAds, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (value: string) => {
    handleSelected(value);
    setIsOpen(false);
  };

  const selectedTabTitle = TabAds?.find(
    (tab) => tab?.type === selectedTabParam
  )?.title;

  return (
    <Select
      dir='rtl'
      value={selectedTabParam}
      onValueChange={handleValueChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className='w-full border-0 bg-secondary'>
        <SelectValue placeholder={placeholder}>{selectedTabTitle}</SelectValue>
      </SelectTrigger>
      <SelectContent position='popper'>
        {TabAds?.length ? (
          TabAds.map((tab, i) =>
            tab.show ? (
              <SelectLinkFormAdsHeaderItem
                key={i}
                href={`?type_ads=${tab.type}`}
                isActive={selectedTabParam === tab?.type}
                onClick={() => handleValueChange(tab?.type)}
              >
                {tab.title}
              </SelectLinkFormAdsHeaderItem>
            ) : null
          )
        ) : (
          <div className='flex justify-center py-4 '>
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectedTriggerInputAdsLink;
