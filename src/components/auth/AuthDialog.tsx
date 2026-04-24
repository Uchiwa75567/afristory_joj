import { Link } from "@tanstack/react-router";
import { ArrowRight, LogOut, Lock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getAuthRoleOption, ROLE_OPTIONS, type AuthRole, useAuth } from "./AuthProvider";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const { session, login, logout } = useAuth();
  const [role, setRole] = useState<AuthRole>("athlete");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) return;

    setRole(session?.role ?? "athlete");
    setName(session?.name ?? "");
    setEmail(session?.email ?? "");
    setOrganization(session?.organization ?? "");
    setPassword("");
  }, [open, session]);

  const selectedRole = useMemo(() => getAuthRoleOption(role), [role]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Renseigne au moins ton nom et ton email.");
      return;
    }

    login({
      name,
      email,
      organization: organization || selectedRole.label,
      role,
    });

    toast.success(`Connexion établie en tant que ${selectedRole.label.toLowerCase()}.`);
    setPassword("");
    onOpenChange(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl overflow-hidden border-border bg-background/95 p-0 shadow-[0_40px_120px_-60px_rgba(13,31,18,0.6)] backdrop-blur-xl sm:rounded-[28px]">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden bg-dark p-6 text-on-dark md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,191,96,0.22)_0%,rgba(29,191,96,0)_40%),radial-gradient(circle_at_bottom_right,rgba(246,166,35,0.18)_0%,rgba(246,166,35,0)_42%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-on-dark-soft">
                <Sparkles className="h-3.5 w-3.5 text-green" />
                Connexion multi-rôle
              </div>

              <DialogHeader className="mt-5 text-left">
                <DialogTitle className="font-serif text-4xl text-on-dark md:text-5xl">
                  Accès au musée
                </DialogTitle>
                <DialogDescription className="max-w-md text-on-dark-muted">
                  Sélectionne ton rôle pour ouvrir l'espace qui correspond à ton profil.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 space-y-3">
                {ROLE_OPTIONS.map((option) => {
                  const active = role === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                        active
                          ? "border-green/40 bg-bg-tag text-text shadow-[0_20px_50px_-40px_rgba(29,191,96,0.7)]"
                          : "border-white/10 bg-dark-surface/70 text-on-dark-muted hover:border-green/30 hover:text-on-dark"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`font-medium ${option.accentClass}`}>{option.label}</span>
                        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-on-dark-soft">
                          {option.recommendedPath}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">{option.description}</p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-green">
                        Ouvrir l'espace <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {session && (
              <div className="rounded-2xl border border-green/20 bg-bg-tag p-4">
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-green">
                  Session active
                </div>
                <div className="mt-2 font-serif text-2xl text-text">{session.name}</div>
                <p className="mt-1 text-sm text-text-secondary">
                  {session.roleLabel} · {session.organization}
                </p>
                <p className="mt-2 text-sm text-text-secondary">{session.email}</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-green px-5 text-bg"
                    onClick={() => onOpenChange(false)}
                  >
                    <Link to={session.preferredPath}>
                      Aller à mon espace <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-border bg-background text-text"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-green">
                <Lock className="h-3.5 w-3.5" /> Formulaire
              </div>

              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      Nom complet
                    </label>
                    <Input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Ton nom"
                      className="h-11 border-border bg-background text-text placeholder:text-text-muted/70"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      Adresse email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="toi@exemple.com"
                      className="h-11 border-border bg-background text-text placeholder:text-text-muted/70"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      Organisation / équipe
                    </label>
                    <Input
                      value={organization}
                      onChange={(event) => setOrganization(event.target.value)}
                      placeholder="Ex: Fédération, média, staff, club"
                      className="h-11 border-border bg-background text-text placeholder:text-text-muted/70"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      Mot de passe
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      className="h-11 border-border bg-background text-text placeholder:text-text-muted/70"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-full bg-gradient-green text-bg shadow-[0_18px_40px_-24px_rgba(29,191,96,0.65)]"
                >
                  {session
                    ? "Mettre à jour la session"
                    : `Se connecter en ${selectedRole.label.toLowerCase()}`}
                </Button>
              </form>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-background p-4">
              <div className="text-[0.65rem] uppercase tracking-[0.24em] text-text-muted">
                Rôle sélectionné
              </div>
              <div className="mt-2 font-serif text-2xl text-text">{selectedRole.label}</div>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {selectedRole.description}
              </p>
              <div className="mt-3 text-xs uppercase tracking-[0.22em] text-green">
                Accès recommandé: {selectedRole.recommendedPath}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
