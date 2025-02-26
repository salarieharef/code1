# Dropzone Component Documentation

A comprehensive and customizable file upload component for React applications.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Component API](#component-api)
3. [File Type Support](#file-type-support)
4. [Layouts](#layouts)
5. [Validation](#validation)
6. [Advanced Features](#advanced-features)
7. [Styling](#styling)
8. [Examples](#examples)
9. [TypeScript Support](#typescript-support)

## Basic Usage

```tsx
import Dropzone from "@/components/ui/dropzone";

function MyComponent() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Dropzone
      type='image'
      value={file}
      onChange={setFile}
      placeholder='Drop your image here'
    />
  );
}
```

## Component API

### Core Props

| Prop       | Type                                                                                       | Default  | Description                 |
| ---------- | ------------------------------------------------------------------------------------------ | -------- | --------------------------- |
| `type`     | `'video' \| 'image' \| 'pdf' \| 'text' \| 'document' \| 'media' \| 'all' \| 'spreadsheet'` | Required | Type of files to accept     |
| `value`    | `File \| File[] \| null`                                                                   | `null`   | Current file value          |
| `onChange` | `(file: File \| File[] \| null) => void`                                                   | -        | Callback when file changes  |
| `multiple` | `boolean`                                                                                  | `false`  | Allow multiple file uploads |
| `disabled` | `boolean`                                                                                  | `false`  | Disable the dropzone        |
| `readOnly` | `boolean`                                                                                  | `false`  | Make the dropzone read-only |

### Preview Props

| Prop           | Type      | Default | Description         |
| -------------- | --------- | ------- | ------------------- |
| `showPreview`  | `boolean` | `true`  | Show file preview   |
| `showFileIcon` | `boolean` | `false` | Show file type icon |
| `showFileName` | `boolean` | `true`  | Show file name      |
| `showFileSize` | `boolean` | `true`  | Show file size      |
| `showDelete`   | `boolean` | `true`  | Show delete button  |

### Layout Props

| Prop               | Type      | Default  | Description                      |
| ------------------ | --------- | -------- | -------------------------------- | ---------------------------------------- |
| `layout`           | `'grid'   | 'table'` | \-                               | Layout style for multiple files          |
| `gridColumns`      | `number`  | `2`      | Number of columns in grid layout |
| `dropzonePosition` | `'before' | 'after'` | `'after'`                        | Position of dropzone relative to preview |

## File Type Support

### Images

- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- Features:
  - Image preview
  - Image cropping
  - Aspect ratio control
  - Size validation

```tsx
<Dropzone
  type='image'
  enableCropper
  cropperAspectRatio={16 / 9}
  maxSize={5 * 1024 * 1024} // 5MB
/>
```

### Videos

- Supported formats: `.mp4`, `.mkv`, `.mov`, `.avi`, `.webm`
- Features:
  - Video preview
  - Duration validation
  - Size validation

```tsx
<Dropzone
  type='video'
  maxDuration={300} // 5 minutes
  maxSize={100 * 1024 * 1024} // 100MB
  showProgress
/>
```

### Documents

- Supported formats: `.pdf`, `.docx`, `.doc`, `.txt`, `.rtf`
- Features:
  - File icon preview
  - Size validation

## Layouts

### Grid Layout

```tsx
<Dropzone
  type='image'
  multiple
  layout='grid'
  gridColumns={3}
  value={files}
  onChange={setFiles}
/>
```

### Table Layout

```tsx
<Dropzone
  type='document'
  multiple
  layout='table'
  value={files}
  onChange={setFiles}
/>
```

## Validation

### Built-in Validators

```tsx
<Dropzone
  type='video'
  maxSize={100 * 1024 * 1024} // File size validation
  maxDuration={300} // Video duration validation
  accept={{ "video/mp4": [".mp4"] }} // File type validation
/>
```

### Custom Validation

```tsx
const validateFile = async (file: File) => {
  if (file.size > maxSize) {
    throw new Error("File too large");
  }
  // Additional validation logic
};
```

## Advanced Features

### Image Cropping

```tsx
<Dropzone
  type='image'
  enableCropper
  cropperAspectRatio={1}
  cropperSizeOptions={[
    { value: "small", label: "Small (100x100)" },
    { value: "medium", label: "Medium (300x300)" },
  ]}
  onSizeChange={(size) => console.log(size)}
/>
```

### Upload Progress

```tsx
<Dropzone
  type='video'
  showProgress
  isUploading={true}
  progress={45}
  timeRemaining={120}
  sizeRemaining={50 * 1024 * 1024}
  onCancel={() => handleCancel()}
/>
```

## Styling

### Using Style Props

```tsx
<Dropzone
  styles={{
    container: "custom-container",
    dropzone: "custom-dropzone",
    preview: "custom-preview",
    deleteButton: "custom-delete-btn",
    progressBar: "custom-progress",
    icon: "custom-icon",
    instructions: "custom-instructions",
  }}
/>
```

### Default Classes

The component uses Tailwind CSS classes by default and can be customized using the `cn` utility:

```tsx
import { cn } from "@/utils/cn";

<Dropzone className={cn("your-custom-classes", defaultClasses)} />;
```

## Examples

### Multiple File Upload with Progress

```tsx
function MultipleFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (files: File[]) => {
    setProgress(0);
    // Upload logic
  };

  return (
    <Dropzone
      type='document'
      multiple
      keepFiles
      value={files}
      onChange={setFiles}
      onFileUpload={handleUpload}
      showProgress
      progress={progress}
      layout='table'
    />
  );
}
```

### Image Upload with Cropping

```tsx
function ImageUploadWithCrop() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <Dropzone
      type='image'
      value={image}
      onChange={setImage}
      enableCropper
      cropperAspectRatio={16 / 9}
      cropperSizeOptions={[
        { value: "thumbnail", label: "Thumbnail" },
        { value: "full", label: "Full Size" },
      ]}
    />
  );
}
```

## TypeScript Support

The component comes with full TypeScript support. Key types include:

```typescript
interface BaseDropzoneProps {
  type:
    | "video"
    | "image"
    | "pdf"
    | "text"
    | "document"
    | "media"
    | "all"
    | "spreadsheet";
  value?: File | File[] | null;
  onChange?: (file: File | File[] | null) => void;
  // ... other props
}

interface DropzoneStyles {
  container?: string;
  dropzone?: string;
  preview?: string;
  // ... other style props
}
```

For more detailed type definitions, refer to the `types.ts` file.

## Best Practices

1. Always specify `maxSize` to prevent large file uploads
2. Use appropriate `type` prop to restrict file types
3. Implement proper error handling
4. Consider using `showProgress` for large file uploads
5. Use `multiple` and `layout` props appropriately for multiple file uploads
6. Implement proper cleanup in your components
