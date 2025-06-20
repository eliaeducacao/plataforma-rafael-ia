import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  circle: LucideIcons.Circle,
  'file-text': LucideIcons.FileText,
  scale: LucideIcons.Scale,
  calendar: LucideIcons.Calendar,
  'book-open': LucideIcons.BookOpen,
  'file-check': LucideIcons.FileCheck,
  brain: LucideIcons.Brain,
  user: LucideIcons.User,
  bot: LucideIcons.Bot,
};
