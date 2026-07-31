import Link from "next/link";

type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[var(--ink)] hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "text-[var(--ink-soft)]" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
