"use client";

import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Save, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface JsonSectionEditorProps {
  section: string;
  title: string;
  description: string;
}

async function fetchSection(section: string) {
  const res = await fetch(`/api/pricing?section=${section}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Failed to load");
  return json.data as unknown;
}

export function JsonSectionEditor({ section, title, description }: JsonSectionEditorProps) {
  const queryClient = useQueryClient();
  // `draft` holds the user's in-progress edits. Until they type anything, the
  // textarea derives its value straight from the query result — no effect
  // needed to keep them in sync.
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["pricing-section", section],
    queryFn: () => fetchSection(section),
  });

  const raw = draft ?? (data !== undefined ? JSON.stringify(data, null, 2) : "");

  const saveMutation = useMutation({
    mutationFn: async (parsedData: unknown) => {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: parsedData }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error + (json.issues ? `: ${json.issues[0]?.message}` : ""));
      }
      return json;
    },
    onSuccess: () => {
      setError(null);
      setDraft(null);
      setSavedAt(new Date().toLocaleTimeString());
      void queryClient.invalidateQueries({ queryKey: ["pricing-section", section] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to save"),
  });

  const importMutation = useMutation({
    mutationFn: async (csv: string) => {
      const res = await fetch("/api/pricing/csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, csv }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error + (json.issues ? `: ${json.issues[0]?.message}` : ""));
      }
      return json;
    },
    onSuccess: () => {
      setError(null);
      setSavedAt(new Date().toLocaleTimeString());
      void queryClient.invalidateQueries({ queryKey: ["pricing-section", section] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to import CSV"),
  });

  function handleSave() {
    setSavedAt(null);
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(raw);
    } catch {
      setError("That's not valid JSON — check for a trailing comma or missing bracket.");
      return;
    }
    setError(null);
    saveMutation.mutate(parsedData);
  }

  async function handleImportFile(file: File) {
    setSavedAt(null);
    const csv = await file.text();
    importMutation.mutate(csv);
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`/api/pricing/csv?section=${section}`} download>
            <Button type="button" variant="secondary" size="sm">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </a>
          <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <textarea
        value={raw}
        onChange={(e) => setDraft(e.target.value)}
        disabled={isLoading}
        spellCheck={false}
        rows={16}
        aria-label={`${title} JSON data`}
        className="focus-ring mt-5 w-full rounded-xl border border-border-strong bg-surface-muted p-4 font-mono text-xs text-foreground disabled:opacity-60"
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {error && (
            <span className="flex items-center gap-1.5 text-danger" role="alert">
              <AlertTriangle className="h-4 w-4" /> {error}
            </span>
          )}
          {!error && savedAt && (
            <span className="flex items-center gap-1.5 text-accent-700">
              <CheckCircle2 className="h-4 w-4" /> Saved at {savedAt}
            </span>
          )}
        </div>
        <Button
          type="button"
          onClick={handleSave}
          isLoading={saveMutation.isPending}
          disabled={isLoading}
        >
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </Card>
  );
}
