import { useState, useCallback, useRef } from 'react';
import { X, Upload, FileText, Image, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/shared/lib/utils';

export interface FileWithId extends File {
  id: string;
}

interface MultiFileUploadProps {
  selectedFiles: FileWithId[];
  onFilesSelect: (files: FileWithId[]) => void;
  onFileRemove: (fileId: string) => void;
  onFileReorder?: (files: FileWithId[]) => void;
  onFilesAdded?: () => void; // Callback quando arquivos são adicionados
  disabled?: boolean;
  maxFiles?: number;
  maxTotalSize?: number; // em bytes
  acceptedTypes?: string[];
}

const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB
const DEFAULT_ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/svg+xml',
];

export default function MultiFileUpload({
  selectedFiles,
  onFilesSelect,
  onFileRemove,
  onFilesAdded,
  // onFileReorder,
  disabled = false,
  maxFiles = DEFAULT_MAX_FILES,
  maxTotalSize = DEFAULT_MAX_TOTAL_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
}: MultiFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileId = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const validateFiles = useCallback((files: File[]): { valid: FileWithId[]; errors: string[] } => {
    const validFiles: FileWithId[] = [];
    const newErrors: string[] = [];
    let totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

    for (const file of files) {
      // Verificar se já atingiu o limite de arquivos
      if (validFiles.length + selectedFiles.length >= maxFiles) {
        newErrors.push(`Máximo de ${maxFiles} arquivos permitidos`);
        break;
      }

      // Verificar tipo do arquivo
      if (!acceptedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: Tipo de arquivo não suportado`);
        continue;
      }

      // Verificar tamanho individual (10MB por arquivo)
      if (file.size > 10 * 1024 * 1024) {
        newErrors.push(`${file.name}: Arquivo muito grande (máximo 10MB)`);
        continue;
      }

      // Verificar tamanho total
      if (totalSize + file.size > maxTotalSize) {
        newErrors.push(`${file.name}: Limite de tamanho total excedido`);
        continue;
      }

      // Verificar se é GIF
      if (file.type === 'image/gif') {
        newErrors.push(`${file.name}: GIFs não são suportados`);
        continue;
      }

      // Verificar se arquivo já existe
      const fileExists = selectedFiles.some(existingFile =>
        existingFile.name === file.name && existingFile.size === file.size
      );
      if (fileExists) {
        newErrors.push(`${file.name}: Arquivo já foi adicionado`);
        continue;
      }

      // Arquivo válido
      const fileWithId = Object.assign(file, { id: generateFileId() });
      validFiles.push(fileWithId);
      totalSize += file.size;
    }

    return { valid: validFiles, errors: newErrors };
  }, [selectedFiles, maxFiles, maxTotalSize, acceptedTypes]);

  const handleFilesSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const { valid: validFiles, errors: validationErrors } = validateFiles(fileArray);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Limpar erros após 5 segundos
      setTimeout(() => setErrors([]), 5000);
    }

    if (validFiles.length > 0) {
      onFilesSelect([...selectedFiles, ...validFiles]);
      // Chamar callback quando arquivos são adicionados
      if (onFilesAdded) {
        setTimeout(() => {
          onFilesAdded();
        }, 800);
      }
    }
  }, [validateFiles, onFilesSelect, selectedFiles, onFilesAdded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFilesSelect(files);
    }
  }, [handleFilesSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFilesSelect(files);
    }
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFilesSelect]);

  const handleFileRemove = useCallback((fileId: string) => {
    onFileRemove(fileId);
  }, [onFileRemove]);

  const getFileIcon = (file: FileWithId) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-600" />;
    }
    return <FileText className="h-4 w-4 text-red-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
  const sizePercentage = (totalSize / maxTotalSize) * 100;

  return (
    <div className="space-y-4">
      {/* Área de Drag & Drop */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Arraste arquivos aqui ou{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="text-primary hover:underline font-medium"
          >
            clique para selecionar
          </button>
        </p>
        <p className="text-xs text-muted-foreground">
          Máximo {maxFiles} arquivos • {formatFileSize(maxTotalSize)} total
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Erros */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Arquivos Selecionados */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Arquivos selecionados ({selectedFiles.length}/{maxFiles})
            </h4>
            <Badge variant="secondary" className="text-xs">
              {formatFileSize(totalSize)} / {formatFileSize(maxTotalSize)}
            </Badge>
          </div>

          {/* Barra de Progresso do Tamanho */}
          <div className="space-y-1">
            <Progress value={sizePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {sizePercentage > 80 && sizePercentage < 100 && "⚠️ Próximo do limite"}
              {sizePercentage >= 100 && "❌ Limite excedido"}
            </p>
          </div>

          {/* Lista de Arquivos */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border"
              >
                {/* Preview de Imagem */}
                {file.type.startsWith('image/') && file.type !== 'image/gif' ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-10 w-10 object-cover rounded border"
                  />
                ) : (
                  <div className="h-10 w-10 flex items-center justify-center bg-muted rounded border">
                    {getFileIcon(file)}
                  </div>
                )}

                {/* Informações do Arquivo */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)} • {file.type}
                  </p>
                </div>

                {/* Botão Remover */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileRemove(file.id)}
                  disabled={disabled}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 