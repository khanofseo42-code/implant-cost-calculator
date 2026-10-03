"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid bg-background px-4">
      <Card className="w-full max-w-sm p-8" elevated>
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
          <Lock className="h-5 w-5 text-brand-600" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Admin sign in</h1>
        <p className="mt-1.5 text-sm text-foreground-muted">
          Enter the admin password to manage pricing configuration.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="password"
            label="Password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ?? undefined}
          />
          <Button type="submit" fullWidth isLoading={loading}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
