import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { generations } from "@/lib/mock-data";

export const Route = createFileRoute("/historique")({
  head: () => ({
    meta: [
      { title: "Historique — IconForge AI" },
      {
        name: "description",
        content: "Consultez toutes les icônes générées précédemment avec leur score et leur modèle.",
      },
      { property: "og:title", content: "Historique — IconForge AI" },
      {
        property: "og:description",
        content: "Journal complet des générations d'icônes SVG.",
      },
    ],
  }),
  component: Historique,
});

function Historique() {
  const [q, setQ] = useState("");
  const liste = generations.filter((g) => g.concept.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader
        titre="Historique"
        description="Toutes les générations précédentes."
        action={
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un concept…"
            className="w-full sm:w-64"
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {liste.map((g) => (
          <article key={g.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div
                className="h-14 w-14 shrink-0 rounded-xl border border-border bg-background p-2 [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: g.svg }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{g.concept}</p>
                <p className="truncate text-xs text-muted-foreground">{g.date}</p>
                <p className="truncate text-xs text-muted-foreground">{g.modele}</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {g.score}
              </span>
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">{g.id}</p>
          </article>
        ))}
        {liste.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucune génération ne correspond.</p>
        )}
      </div>
    </div>
  );
}
