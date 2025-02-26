// Constant data imports
import { katebContact } from "@/constant/about/list.constant";

// Type imports
import { ContactDetails } from "@/types/about";
import Link from "next/link";

const ContactWays = () => {
  return (
    <div className='flex flex-col items-center gap-y-1.5 md:items-start'>
      {katebContact.map((item: ContactDetails, index: number) => (
        <div
          key={index}
          className='flex flex-wrap justify-center gap-1 text-center md:justify-start md:text-right'
        >
          <p>{item.label}</p>:
          {item.phone ? (
            <Link href={`tel:${item.phone}`}>{item.value}</Link>
          ) : item.email ? (
            <Link href={`mailto:${item.email}`}>{item.value}</Link>
          ) : (
            <p>{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactWays;
