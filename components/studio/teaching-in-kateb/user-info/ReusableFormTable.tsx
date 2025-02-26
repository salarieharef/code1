// Form imports
import { useFieldArray } from "react-hook-form";

// Component imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WrapperOutlineText } from "../WrapperOutlineText";

// Util imports
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import { filter, find } from "lodash-es";
import CustomFileDropzone from "../CustomFileDropzone";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "@/components/ui/dropzone";

const ReusableFormTable = ({
  title,
  fields,
  columns,
  name,
  loading,
  setLoading,
  type,
  wrapperClassName,
  cardClassName,
  read_only = false,
  handleDelete,
  max = 5,
}: any) => {
  const visible_columns = filter(columns, "visible");

  const {
    fields: formFields,
    append,
    remove,
  } = useFieldArray({
    name,
  });

  const localDelete = (index: any) => {
    remove(index);
  };

  const renderInput = (column: any, index: any, field: any) => {
    if (column.type === "select") {
      return (
        <FormField
          name={`${name}.${index}.${column.key}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {read_only ? (
                  <p>{find(column.options, { value: field.value })?.label}</p>
                ) : (
                  <Select
                    dir='rtl'
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      disabled={read_only}
                      className='w-full bg-slate-100'
                    >
                      <SelectValue
                        className='placeholder:text-muted-foreground'
                        placeholder={column.placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {column.options.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (column.type === "file") {
      return (
        <FormField
          name={`${name}.${index}.${column.key}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <CustomFileDropzone
                  name={`${name}.${index}.${column.key}`}
                  placeholder='فایل خود را آپلود کنید'
                  containerClassName='mt-0 p-2 h-10 rounded-sm'
                  accept={{ "application/pdf": [".pdf"], "image/*": [] }}
                  showIcon={true}
                  read_only={read_only}
                /> */}
                <Dropzone
                  acceptedFileTypes={{
                    "application/pdf": [".pdf"],
                    "image/*": [],
                  }}
                  name={`${name}.${index}.${column.key}`}
                  placeholder='فایل خود را آپلود کنید'
                  fileType='document'
                  readOnly={read_only}
                  value={field.value}
                  showFileIcon
                  styles={{
                    container: "",
                    dropzone: "mt-0 p-2 h-10 rounded-sm border-primary ",
                    previewContainer:
                      " rounded-md w-full border border-slate-300 px-2 py-2",

                    preview: "w-full",
                    instructions: "text-primary",
                    deleteButton: "left-0 -top-1",
                  }}
                  onChange={(file: any) => {
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (column.type === "textarea") {
      return (
        <FormField
          name={`${name}.${index}.${column.key}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {read_only ? (
                  <p>{field?.value}</p>
                ) : (
                  <Textarea
                    {...field}
                    className='mt-1 w-full rounded-md border bg-slate-100 p-2'
                    placeholder={column.placeholder}
                    disabled={column.disabled}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    return (
      <FormField
        name={`${name}.${index}.${column.key}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {read_only ? (
                <p>{field?.value}</p>
              ) : (
                <Input
                  {...field}
                  className='mt-1 w-full rounded-md border bg-slate-100 p-2'
                  placeholder={column.placeholder}
                  disabled={column.disabled}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <WrapperOutlineText
      titleBorder={title}
      className={cn("mt-6 px-2 sm:mt-0 sm:px-6", wrapperClassName)}
      type={type}
    >
      <Card
        className={cn(
          "border-none bg-transparent p-1 shadow-none md:p-4",
          cardClassName
        )}
      >
        {/* Header for Desktop */}
        <div className='hidden gap-4 rounded-xl bg-slate-100 p-4 text-center text-sm font-normal md:grid md:grid-cols-12'>
          <span className='col-span-1'>ردیف</span>
          {visible_columns.map((column: any) => (
            <span
              key={column.key}
              className={`col-span-${column.span} truncate text-nowrap`}
            >
              {column.label}
            </span>
          ))}
          {!read_only ? <span className='col-span-2'>اقدامات</span> : null}
        </div>

        {/* Table Content */}
        <CardContent className='p-1 pt-0 md:p-4'>
          {formFields.map((field: any, index: any) => {
            return (
              <div key={field.id}>
                {/* Layout for Desktop */}
                <div className='my-4 hidden grid-cols-12 items-center gap-4 text-center md:grid'>
                  <div className='col-span-1'>
                    <p>{index + 1}</p>
                  </div>
                  {visible_columns.map((column: any) => (
                    <div key={column.key} className={`col-span-${column.span}`}>
                      {renderInput(column, index, field)}
                    </div>
                  ))}
                  {!read_only ? (
                    <div className='col-span-2'>
                      <Button
                        variant='destructive'
                        onClick={() =>
                          handleDelete
                            ? handleDelete(field?.original_id)
                            : localDelete(index)
                        }
                        disabled={loading}
                        className='w-24 rounded-3xl border border-red-500 bg-slate-50 px-8 text-sm text-red-500 hover:bg-red-200'
                      >
                        حذف
                      </Button>
                    </div>
                  ) : null}
                </div>

                {/* Layout for Mobile */}
                <div className='grid grid-cols-1 gap-4 md:hidden'>
                  {visible_columns.map((column: any) => (
                    <div key={column.key}>
                      <label className='block py-1 text-sm font-medium text-slate-700'>
                        {column.label}:
                      </label>
                      {renderInput(column, index, field)}
                    </div>
                  ))}
                  {!read_only ? (
                    <Button
                      variant='destructive'
                      onClick={() =>
                        handleDelete
                          ? handleDelete(field?.original_id)
                          : localDelete(index)
                      }
                      disabled={loading}
                      className='w-full rounded-3xl border border-red-500 bg-slate-50 text-sm text-red-500 hover:bg-red-200 md:w-24'
                    >
                      حذف
                    </Button>
                  ) : null}
                </div>

                <Separator orientation='horizontal' className='my-4' />
              </div>
            );
          })}

          {/* Add Button */}
          {formFields?.length < max && !read_only ? (
            <div className='flex justify-end md:px-8'>
              <Button
                className='mt-4 w-full items-center rounded-3xl border border-dashed border-blue-400 bg-blue-100 p-4 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-500 md:w-24'
                variant='outline'
                type='button'
                onClick={() =>
                  append(
                    fields.reduce(
                      (acc: any, field: any) => ({ ...acc, [field]: "" }),
                      {}
                    )
                  )
                }
              >
                افزودن
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </WrapperOutlineText>
  );
};

export default ReusableFormTable;
