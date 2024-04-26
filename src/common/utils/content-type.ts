/**
 * Converts MIME type strings to human-friendly descriptions.
 * @param mimeType The MIME type string to be converted.
 * @returns A human-friendly description of the MIME type.
 */
export function convertMimeTypeToDescription(mimeType: string): string {
  const mimeTypeDescriptions: { [key: string]: string } = {
    // Document types
    "application/pdf": "PDF Document",
    "application/msword": "Microsoft Word Document",
    "application/vnd.ms-excel": "Microsoft Excel Spreadsheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Microsoft Excel Spreadsheet (xlsx)",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Microsoft Word Document (docx)",
    "application/zip": "ZIP Archive",
    "application/x-7z-compressed": "7z Archive",
    // Image types
    "image/jpeg": "JPEG Image",
    "image/png": "PNG Image",
    "image/gif": "GIF Image",
    // Text formats
    "text/plain": "Text File",
    "text/html": "HTML Document",
    "text/css": "CSS File",
    "text/javascript": "JavaScript File",
    "text/xml": "XML File",
    "text/csv": "CSV File",
    // Programming file formats
    "application/javascript": "JavaScript File",
    "application/json": "JSON File",
    "application/xml": "XML Data",
    "application/x-httpd-php": "PHP Script",
    "application/x-csh": "C Shell Script",
    "application/x-perl": "Perl Script",
    "application/x-python": "Python Script",
    // Java formats
    "application/java-archive": "Java Archive (JAR)",
    "text/x-java-source": "Java Source File",
    // C/C++ formats
    "text/x-c": "C Source File",
    "text/x-c++": "C++ Source File",
    "text/x-csrc": "C Source File",
    "text/x-c++src": "C++ Source File",
    "text/x-chdr": "C Header File",
    "text/x-c++hdr": "C++ Header File",
    // Markdown & Configurations
    "text/markdown": "Markdown File",
    "application/x-yaml": "YAML File",
    // Audio and video formats
    "video/mp4": "MP4 Video",
    "audio/mp3": "MP3 Audio",
    "audio/mpeg": "MPEG Audio",
    // Add more MIME types as needed
  };

  return mimeTypeDescriptions[mimeType] || "Unknown File Type";
}
