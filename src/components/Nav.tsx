import { NavLink } from 'react-router-dom';

const link = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-muted'}`;

export function Nav() {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4">
      <span className="text-xl font-bold tracking-tight">
        Acme<span className="text-brand">.</span>
      </span>
      <div className="flex gap-6">
        <a href="#" className="text-sm font-medium text-muted">Dashboard</a>
        <NavLink to="/" end className={link}>Account</NavLink>
        <NavLink to="/settings" className={link}>Settings</NavLink>
      </div>
    </nav>
  );
}
