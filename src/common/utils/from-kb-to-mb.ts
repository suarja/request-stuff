/**
 * Converts size from kilobytes to megabytes.
 * @param sizeInKb The file size in kilobytes.
 * @returns The file size in megabytes, formatted to two decimal places.
 */
export function convertKbToMb(sizeInKb: number): string {
  const sizeInMb = sizeInKb / 1024 ** 2;
  return `${sizeInMb.toFixed(2)} MB`;
}
