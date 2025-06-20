import * as LucideIcons from 'lucide-react';
import { iconMap } from './icon-map';

// Componente para renderizar ícone dinamicamente
export const DynamicIcon: React.FC<{
    name: string;
    className?: string;
    size?: number;
}> = ({ name, className = '', size = 24 }) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        return <LucideIcons.Circle className={className} size={size} />;
    }

    return <IconComponent className={className} size={size} />;
};