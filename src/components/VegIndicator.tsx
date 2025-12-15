import { cn } from '@/lib/utils';

interface VegIndicatorProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export function VegIndicator({ isVeg, size = 'md', className }: VegIndicatorProps) {
  return (
    <div
      className={cn(
        'border-2 rounded-sm flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        isVeg ? 'border-foooood-green' : 'border-foooood-red',
        className
      )}
    >
      <div
        className={cn(
          'rounded-full',
          dotSizeClasses[size],
          isVeg ? 'bg-foooood-green' : 'bg-foooood-red'
        )}
      />
    </div>
  );
}

export function PureVegBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 bg-foooood-green-bg text-foooood-green rounded-full text-xs font-medium',
      className
    )}>
      <VegIndicator isVeg={true} size="sm" />
      <span>Pure Veg</span>
    </div>
  );
}
