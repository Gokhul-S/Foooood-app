import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-1 ${className}`}>
      <span className="font-display font-extrabold text-2xl md:text-3xl">
        <span className="text-primary">F</span>
        <span className="text-foooood-gold">o</span>
        <span className="text-primary">o</span>
        <span className="text-foooood-gold">o</span>
        <span className="text-primary">o</span>
        <span className="text-foooood-gold">d</span>
      </span>
    </Link>
  );
}
