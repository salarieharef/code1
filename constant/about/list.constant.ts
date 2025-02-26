// Type imports
import { ContactDetails, contactProps, TableData } from "@/types/about";

export const sampleData: TableData = {
  title: "بخش فروش و امور مشتریان",
  headers: ["پشتیبانی", "روزهای کاری", "روزهای تعطیل"],
  rows: [
    ["تیکت", "۸ الی ۲۲", "۲۱ الی ۸"],
    ["تلفنی", "۸ الی ۲۲", null],
  ],
};

export const katebContact: ContactDetails[] = [
  {
    label: "دفتر کاتب",
    value: "تهران، سعادت آباد، خیابان سی و یکم شرقی، پلاک 46، طبقه 4",
  },
  {
    label: "تلفن تماس",
    value: "1234567-021",
    phone: "1234567-021",
  },
  {
    label: "پست الکترونیک",
    value: "info@kateb.ir",
    email: "info@kateb.ir",
  },
];
