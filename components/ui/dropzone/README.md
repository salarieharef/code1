# React Dropzone Component

A versatile and customizable file upload component for React applications, supporting multiple file types, previews, and various layouts.

## Features

- 📁 Multiple file type support (video, image, PDF, documents, spreadsheets, etc.)
- 🖼️ Built-in file previews
- 📏 File validation (size, duration, type)
- ✂️ Image cropping capability
- 📊 Upload progress tracking
- 🎨 Customizable styles and layouts
- 📱 Responsive design
- 🔄 Multiple file upload support
- 🎯 Drag and drop functionality

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

## Documentation

For detailed documentation, please see [Documentaion.md](./Documentaion.md)

# Dropzone Component Documentation

## Table of Contents

1. [Component Overview](#component-overview)
2. [File Structure](#file-structure)
3. [Props](#props)
4. [Usage Examples](#usage-examples)
5. [Styling](#styling)
6. [File Type Support](#file-type-support)

## Component Overview

The Dropzone component is a comprehensive file upload solution that handles various file types, previews, and upload states. It's built on top of react-dropzone and provides additional features like file validation, image cropping, and customizable layouts.

## File Structure

```

components/ui/dropzone/
├── index.tsx # Main component
├── types.ts # TypeScript interfaces and types
├── constant.ts # File type definitions and constants
├── validators.ts # File validation functions
└── previews.tsx # Preview components for different file types

```

## Props

### Core Props

- `fileType`: File type to accept ('video' | 'image' | 'pdf' | 'text' | 'document' | 'media' | 'all' | 'spreadsheet')
- `value`: Current file value (File | File[] | null)
- `onChange`: Callback when file changes
- `placeholder`: Custom placeholder text
- `name`: Form field name
- `readOnly`: Make dropzone read-only
- `disabled`: Disable dropzone

### Validation Props

- `maxFileSize`: Maximum file size in bytes
- `acceptedFileTypes`: Custom accept object for file types
- `maxVideoDuration`: Maximum duration for video files (in seconds)

### Layout Props

- `previewLayout`: 'grid' | 'table'
- `gridColumnCount`: Number of columns for grid layout
- `showDropzoneAfterPreview`: Show dropzone after file preview
- `dropzonePosition`: 'before' | 'after'
- `preserveExistingFiles`: Keep existing files when adding new ones

### Preview Props

- `showPreview`: Toggle file preview
- `showFileIcon`: Show file type icon
- `showFileName`: Show file name
- `showFileSize`: Show file size
- `showDelete`: Show delete button

### Image Specific Props

- `enableCropper`: Enable image cropping
- `cropperAspectRatio`: Aspect ratio for image cropper
- `cropperSizeOptions`: Size options for cropper

## Usage Examples

### Basic Image Upload

```tsx
<Dropzone
  type='image'
  value={imageFile}
  onChange={setImageFile}
  placeholder='Drop your image here'
/>
```

### Video Upload with Duration Limit

```tsx
<Dropzone
  type='video'
  maxDuration={100}
  maxSize={100 * 1024 * 1024}
  value={videoFile}
  onChange={setVideoFile}
  showProgress
  timeRemaining={3600}
  sizeRemaining={100 * 1024 * 1024}
/>
```

### Multiple File Upload with Grid Layout

```tsx
<Dropzone
  type='document'
  multiple
  layout='grid'
  gridColumns={3}
  value={files}
  onChange={setFiles}
  showDropzoneAfterFile
/>
```

## Styling

The component accepts a `styles` prop for customization:

```tsx
<Dropzone
  styles={{
    container: "custom-container-class",
    dropzone: "custom-dropzone-class",
    preview: "custom-preview-class",
    previewContainer: "custom-preview-container-class",
    deleteButton: "custom-delete-button-class",
    progressBar: "custom-progress-bar-class",
  }}
/>
```

## File Type Support

### Supported File Types

- **Images**: jpg, jpeg, png, gif, webp, svg
- **Videos**: mp4, mkv, mov, avi, webm
- **Documents**: pdf, docx, doc, odt, txt, rtf
- **Spreadsheets**: xlsx, xls, csv
- **Audio**: mp3, wav, ogg
- **Archives**: zip, rar

Each file type has specific validation rules and preview components.

## Best Practices

1. Always specify `maxSize` to prevent large file uploads
2. Use `type` prop to restrict file types
3. Implement proper error handling
4. Consider using `showProgress` for large file uploads
5. Use appropriate layouts based on your use case

## Error Handling

The component includes built-in error handling for:

- File size validation
- File type validation
- Video duration validation
- Image format validation
- PDF validation

Errors are displayed using a toast notification system.
