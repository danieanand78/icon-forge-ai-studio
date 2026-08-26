import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiConfig } from "@/config/brand";
import { modelesIA } from "@/lib/mock-data";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — IconForge AI" },
      {
        name: "description",
        content: "Choix du modèle IA, thème de l'interface et configuration de l'API FastAPI.",
      },
      { property: "og:title", content: "Paramètres — IconForge AI" },
      {
        property: "og:description",
        content: "Configurez le modèle, le thème et le point d'entrée de l'API.",
      },
    ],
  }),
  component: Parametres,
});

function Parametres() {
  const [modele, setModele] = useState(modelesIA[0]!.id);
  const [theme, setTheme] = useState<"clair" | "sombre">("clair");
  const [url, setUrl] = useState(apiConfig.baseUrl);
  const [cle, setCle] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "sombre");
  }, [theme]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <PageHeader titre="Paramètres" description="Configuration de la plateforme." />

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Modèle IA</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {modelesIA.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModele(m.id)}
              className={[
                "rounded-xl border p-4 text-left transition-colors",
                modele === m.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-accent/50",
              ].join(" ")}
            >
              <p className="text-sm font-medium text-foreground">{m.nom}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Thème</h2>
        <div className="mt-4 flex gap-2">
          {(["clair", "sombre"] as const).map((t) => (
            <Button
              key={t}
              variant={theme === t ? "default" : "outline"}
              onClick={() => setTheme(t)}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">API FastAPI</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="url">URL de base</Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cle">Clé d'API</Label>
            <Input
              id="cle"
              type="password"
              value={cle}
              onChange={(e) => setCle(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
        <ul className="mt-4 space-y-1 font-mono text-xs text-muted-foreground">
          {Object.entries(apiConfig.endpoints).map(([k, v]) => (
            <li key={k}>
              {k} → {v}
            </li>
          ))}
        </ul>
        <Button className="mt-5" onClick={() => toast.success("Paramètres enregistrés (local).")}>
          Enregistrer
        </Button>
      </section>
    </div>
  );
}
