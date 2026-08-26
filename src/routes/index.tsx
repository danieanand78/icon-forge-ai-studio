import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Gauge, Sparkles, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { PipelineViz } from "@/components/PipelineViz";
import { Button } from "@/components/ui/button";
import { generations, systemStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — IconForge AI" },
      {
        name: "description",
        content:
          "État du système, volume d'icônes générées et dernières générations de la plateforme IconForge AI.",
      },
      { property: "og:title", content: "Tableau de bord — IconForge AI" },
      {
        property: "og:description",
        content: "Supervision des générations d'icônes SVG conformes à la charte ISPM.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Icônes générées", valeur: "192", icone: Sparkles, detail: "+18 cette semaine" },
  { label: "Score moyen", valeur: "91 / 100", icone: Gauge, detail: "Conformité charte" },
  { label: "Taux de validation", valeur: "87 %", icone: TrendingUp, detail: "Sur 30 jours" },
  { label: "Générations du jour", valeur: "6", icone: Activity, detail: "Depuis 08 h 00" },
];

function Dashboard() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader
        titre="Tableau de bord"
        description="Vue d'ensemble de la plateforme de génération d'icônes."
        action={
          <Button asChild>
            <Link to="/generer">Générer une icône</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-sm text-muted-foreground">{s.label}</p>
              <s.icone className="h-4 w-4 shrink-0 text-primary" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{s.valeur}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
          </div>
        ))}
      </div>

      <section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">État du système</h2>
          <ul className="mt-4 space-y-3">
            {systemStatus.map((s) => (
              <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-muted-foreground">{s.label}</span>
                <span className="flex shrink-0 items-center gap-2 font-medium text-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {s.valeur}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Dernières générations</h2>
            <Link to="/historique" className="text-xs font-medium text-primary hover:underline">
              Tout l'historique
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {generations.slice(0, 4).map((g) => (
              <li key={g.id} className="flex items-center gap-4 py-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-lg border border-border bg-background p-1.5 [&_svg]:h-full [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: g.svg }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{g.concept}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {g.date} · {g.modele}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {g.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PipelineViz />
    </div>
  );
}
