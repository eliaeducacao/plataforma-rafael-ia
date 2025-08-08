import { useCaptureModel } from './model';
import { CaptureView } from './view';

export default function CaptureViewModel() {
  const methods = useCaptureModel();

  return <CaptureView {...methods} />;
}
