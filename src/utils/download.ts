import { saveAs } from 'file-saver'

export function downloadBlob(data: BlobPart, filename: string) {
  const blob = new Blob([data])
  saveAs(blob, filename)
}
