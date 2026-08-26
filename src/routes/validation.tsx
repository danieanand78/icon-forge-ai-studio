import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { validations } from "@/lib/mock-data";

export const Route = createFileRoute("/validation")({
  head: () => ({
    meta: [
      { title: "Validation — IconForge AI" },
      {
        name: "description",
        content:
          "Contrôles SVG, XML, viewBox, palette, stroke et nombre de couleurs avec score global.",
      },
      { property: "og:title", content: "Validation — IconForge AI" },
      {
        property: "og:description",
        content: "Vérification automatique de la conformité des icônes générées.",
      },
    ],
  }),
  component: Validation,
});

function Validation() {
  const scoreGlobal = 93;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <PageHeader
        titre="Validation"
        description="Contrôles automatiques appliqués à la dernière icône générée."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Vérifications</h2>
          <ul className="mt-4 divide-y divide-border">
            {validations.map((v) => {
              const ok = v.statut === "réussi";
              return (
                <li key={v.critere} className="flex items-center gap-4 py-3">
                  <span
                    className={[
                      "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                      ok ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground",
                    ].join(" ")}
                  >
                    {ok ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{v.critere}</p>
                    <p className="truncate text-xs text-muted-foreground">{v.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium capitalize text-muted-foreground">
                    {v.statut}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 text-center">
          <h2 className="text-sm font-semibold text-foreground">Score global</h2>
          <p className="mt-6 text-5xl font-semibold tracking-tight text-primary">{scoreGlobal}</p>
          <p className="text-sm text-muted-foreground">sur 100</p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${scoreGlobal}%` }} />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            5 contrôles réussis, 1 avertissement.
          </p>
        </section>
      </div>
    </div>
  );
}
