interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-7">
      <h1 className="text-3xl tracking-tight">{title}</h1>
      <p className="text-muted mt-1">{subtitle}</p>
    </header>
  );
}
