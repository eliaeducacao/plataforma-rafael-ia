import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import MultiFileUpload, { type FileWithId } from "./multi-file-upload"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  selectedFiles: FileWithId[]
  onFilesSelect: (files: FileWithId[]) => void
  onFileRemove: (fileId: string) => void
  disabled?: boolean
}

export default function FileUploadModal({
  isOpen,
  onClose,
  selectedFiles,
  onFilesSelect,
  onFileRemove,
  disabled = false
}: FileUploadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Anexar Arquivos</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <MultiFileUpload
            selectedFiles={selectedFiles}
            onFilesSelect={onFilesSelect}
            onFileRemove={onFileRemove}
            onFilesAdded={onClose}
            disabled={disabled}
            maxFiles={10}
            maxTotalSize={50 * 1024 * 1024} // 50MB
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 