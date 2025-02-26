import { toast } from "@/components/ui/use-toast";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useRouter } from "next/navigation";

interface SubmitOptions {
  apiEndpoint: string;
  data: Record<string, any>;
  imageField?: string;
  idField?: string;
  successCallback?: any;
  errorCallback?: (error: any) => void;
  redirectPath?: (id: string) => string;
  useFormData?: boolean;
  token?: string;
}

export const useSubmitForm = () => {
  const router = useRouter();

  const submitForm = async ({
    apiEndpoint,
    data,
    imageField,
    idField,
    successCallback,
    errorCallback,
    redirectPath,
    useFormData = false, // Optional: Flag to use FormData for submission
    token,
  }: SubmitOptions) => {
    let payload: any;
    let headers: Record<string, string> = {};

    if (useFormData) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== imageField && key !== idField) {
          payload.append(key, value);
        }
      });

      if (imageField && data[imageField]) {
        payload.append(imageField, data[imageField][0]);
      }

      if (idField && data[idField]) {
        payload.append(idField, data[idField]);
      }

      headers["Content-Type"] = "multipart/form-data";
    } else {
      payload = { ...data };
      if (imageField) {
        delete payload[imageField];
      }
      headers["Content-Type"] = "application/json";
    }

    try {
      headers["Authorization"] = token ? `Bearer ${token}` : "";
      const res = await nextFetcher({
        url: apiEndpoint,
        method: "POST",
        body: payload,
        options: {
          headers,
        },
        useToken: true,
      });
      if (res.success) {
        toast({
          variant: "success",
          title: res.msg || "Operation successful",
        });

        if (successCallback) {
          successCallback(res);
        }

        if (redirectPath && res?.data) {
          router.push(redirectPath(res.data?.id));
        }
      } else {
        throw res;
      }

      return res; // Return the response for further processing if needed
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.msg || "An error occurred",
      });

      if (errorCallback) {
        errorCallback(e);
      }

      throw e; // Re-throw the error for the caller to handle if needed
    }
  };

  return submitForm;
};
