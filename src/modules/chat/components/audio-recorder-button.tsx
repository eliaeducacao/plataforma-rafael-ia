import { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface AudioRecorderButtonProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  disabled?: boolean;
}

export function AudioRecorderButton({ onAudioRecorded, disabled = false }: AudioRecorderButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        onAudioRecorded(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao gravar áudio:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
      size="icon"
      className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
      variant={isRecording ? "destructive" : "default"}
      title={isRecording ? "Parar gravação" : "Gravar áudio"}
    >
      {isRecording ? (
        <Square className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}