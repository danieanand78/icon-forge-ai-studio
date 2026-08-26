import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { brand } from "@/config/brand";
import { specification } from "@/lib/mock-data";

export const Route = createFileRoute("/marque")({
  head: () => ({
    meta: [
      { title: "Spécification de la marque — IconForge AI" },
      {
        name: "description",
        content:
          "Palette, géométrie, traits, style, éléments interdits et références de la charte ISPM.",
      },
      { property: "og:title", content: "Spécification de la marque — IconForge AI" },
      {
        property: "og:description",
        content: "Règles graphiques appliquées à chaque icône générée.",
      },
    ],
  }),
  component: Marque,
});

function Bloc({ titre, items }: { titre: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">{titre}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span className="min-w-0">{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Marque() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader
        titre="Spécification de la marque"
        description={`Charte graphique ${brand.organisation} appliquée par le Brand Reader.`}
      />

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Palette</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {brand.palette.map((c) => (
            <div key={c.hex} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <span
                className="h-10 w-10 shrink-0 rounded-lg border border-border"
                style={{ backgroundColor: c.hex }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{c.nom}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {c.hex} · {c.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Bloc titre="Géométrie" items={specification.geometrie} />
        <Bloc titre="Traits" items={specification.traits} />
        <Bloc titre="Style" items={specification.style} />
        <Bloc titre="Éléments interdits" items={specification.interdits} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Références</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {specification.references.map((r) => (
            <div key={r.nom} className="rounded-xl border border-border p-4">
              <p className="text-sm font-medium text-foreground">{r.nom}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
