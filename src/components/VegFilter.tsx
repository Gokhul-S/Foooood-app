import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'veg' | 'nonveg';

interface VegFilterProps {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
  className?: string;
}

export function VegFilter({ activeFilter, onChange, className }: VegFilterProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <FilterButton
        active={activeFilter === 'all'}
        onClick={() => onChange('all')}
      >
        All
      </FilterButton>
      <FilterButton
        active={activeFilter === 'veg'}
        onClick={() => onChange('veg')}
        isVeg
      >
        <span className="w-3 h-3 border-2 border-foooood-green rounded-sm flex items-center justify-center mr-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-foooood-green" />
        </span>
        Veg
      </FilterButton>
      <FilterButton
        active={activeFilter === 'nonveg'}
        onClick={() => onChange('nonveg')}
        isNonVeg
      >
        <span className="w-3 h-3 border-2 border-foooood-red rounded-sm flex items-center justify-center mr-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-foooood-red" />
        </span>
        Non-Veg
      </FilterButton>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isVeg?: boolean;
  isNonVeg?: boolean;
}

function FilterButton({ active, onClick, children, isVeg, isNonVeg }: FilterButtonProps) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      onClick={onClick}
      className={cn(
        'rounded-full h-9 px-4 font-medium transition-all',
        active && isVeg && 'bg-foooood-green hover:bg-foooood-green/90 border-foooood-green',
        active && isNonVeg && 'bg-foooood-red hover:bg-foooood-red/90 border-foooood-red',
        !active && 'bg-card hover:bg-muted'
      )}
    >
      {children}
    </Button>
  );
}
