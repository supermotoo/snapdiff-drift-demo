import type { ReactNode } from 'react';

interface CardProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export function Card({ id, title, children }: CardProps) {
  return (
    <section id={id} className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
      <h2 className="text-base font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
