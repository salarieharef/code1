import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import ReusableFormTable from "./user-info/ReusableFormTable";

export function OriginalReferences({
  type,
  name = "original_references",
  read_only = false,
  max = 5,
}: any) {
  const params = useParams();

  const columns = [
    {
      key: "id",
      label: "id",
      span: 0,
      visible: false,
    },
    {
      key: "reference",
      label: "مرجع",
      span: 5,
      placeholder: "نام مرجع را وارد کنید.",
      visible: true,
    },
    {
      key: "file",
      label: "فایل",
      span: 4,
      type: "file",
      visible: true,
    },
  ];

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReusableFormTable
              title='مراجع اصلی'
              fields={["reference", "file"]}
              columns={columns}
              max={max}
              name={name}
              type={type}
              read_only={read_only}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SupplementaryReferences({
  type,
  name = "supplementary_references",
  read_only = false,
}: any) {
  const columns = [
    {
      key: "id",
      label: "id",
      span: 0,
      visible: false,
    },
    {
      key: "reference",
      label: "مرجع",
      span: 5,
      placeholder: "نام مرجع را وارد کنید.",
      visible: true,
    },
    {
      key: "file",
      label: "فایل",
      span: 4,
      type: "file",
      visible: true,
    },
  ];

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReusableFormTable
              title='مراجع تکمیلی'
              fields={["reference", "file"]}
              columns={columns}
              name={name}
              type={type}
              read_only={read_only}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
