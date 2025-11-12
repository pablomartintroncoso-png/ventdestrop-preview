import logoAzul from "@/assets/logo-azul.png";
import logoBlanco from "@/assets/logo-blanco.png";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ChevronRight,
  MapPin,
  Newspaper,
  Phone,
  Mail,
  Users,
  Instagram,
  Facebook,
  Youtube,
  Trophy,
  Ship,
  Heart,
  Menu,
  Globe,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

// --- Brand system ---
const BRAND = {
  name: "Vent d’Estrop",
  tagline: "Club de Rem Cambrils",
  primary: "#0B5DAA",
  secondary: "#FFCC00",
  accent: "#007A9E",
  dark: "#0D1B2A",
  light: "#F5F9FF",
  logo: logoAzul,
  logoAlt: logoBlanco,
};


const NAV = [
  { label: "Club", href: "#club" },
  { label: "Escoles", href: "#escoles" },
  { label: "Competició", href: "#competicio" },
  { label: "Agenda", href: "#agenda" },
  { label: "Notícies", href: "#noticies" },
  { label: "Galeria", href: "#galeria" },
  { label: "Socis", href: "#socis" },
  { label: "Contacte", href: "#contacte" },
];

const EVENTS = [
  { date: "24 NOV", title: "Regata Llagut Mediterrani – Badia de Cambrils", location: "Port de Cambrils", desc: "Prova del calendari federatiu. Categories absolut i veterà." },
  { date: "30 NOV", title: "Jornada de Portes Obertes", location: "Base nàutica", desc: "Sessió gratuïta per a nous remers i famílies." },
  { date: "12 DES", title: "Assemblea General Ordinària", location: "Sala Polivalent – Club", desc: "Memòria anual, pressupost i projectes 2026." },
];

const NEWS = [
  { title: "Bronze al Campionat de Catalunya de Llagut", excerpt: "L’equip absolut aconsegueix el podi després d’una final molt disputada…" },
  { title: "Nova escola de rem per a infants (8–12)", excerpt: "Inscripcions obertes amb places limitades. Sessions dimarts i dijous…" },
  { title: "Projecte de renovació del varador", excerpt: "Presentem el pla d’infraestructura per millorar l’accessibilitat i el manteniment…" },
];

const SPONSORS = [
  "Cambrils Turisme",
  "Ports de la Generalitat",
  "Récord Náutica",
  "Ajuntament de Cambrils",
  "Cooperativa Agrícola",
  "Nàutica XYZ",
];

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-white/80 text-sm text-slate-700 border border-white/60 shadow-sm">{children}</span>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="max-w-5xl mx-auto text-center mb-10">
    <p className="uppercase tracking-widest text-sm text-slate-500">{kicker}</p>
    <h2 className="text-3xl md:text-4xl font-bold mt-1 text-slate-900">{title}</h2>
    {children && <p className="text-slate-600 mt-4 max-w-3xl mx-auto">{children}</p>}
  </div>
);

const Shell = ({ children }) => (
  <div
    className="min-h-screen bg-[var(--light)] text-slate-800"
    style={{
      "--primary": BRAND.primary,
      "--secondary": BRAND.secondary,
      "--accent": BRAND.accent,
      "--dark": BRAND.dark,
      "--light": BRAND.light,
    }}
  >
    {children}
  </div>
);

function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] || "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const active = useActiveSection(["club","escoles","competicio","agenda","noticies","galeria","socis","contacte"]);
  const [lang, setLang] = useState("CAT");

  return (
    <Shell>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="Inici">
            <img src={BRAND.logo} alt={`${BRAND.name} logo`} className="h-10 w-auto object-contain" />
            <div>
              <div className="font-bold leading-tight">{BRAND.name}</div>
              <div className="text-xs text-slate-500">{BRAND.tagline}</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`hover:text-slate-900 ${active === n.href ? "text-[var(--primary)] font-medium" : "text-slate-600"}`}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button className="hidden md:inline-flex" style={{ backgroundColor: BRAND.primary }}>
              Fes-te soci
            </Button>
            <Button variant="outline" className="border-slate-300 hidden md:inline-flex" onClick={() => setLang(lang === "CAT" ? "ES" : "CAT")}>
              <Globe className="h-4 w-4 mr-1"/>{lang}
            </Button>
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex items-center gap-2 mb-6">
                  <img src={BRAND.logo} alt="logo" className="h-7" />
                  <span className="font-semibold">{BRAND.name}</span>
                </div>
                <nav className="grid gap-3">
                  {NAV.map((n) => (
                    <a key={n.href} href={n.href} className="text-slate-700" aria-label={n.label}>{n.label}</a>
                  ))}
                </nav>
                <Separator className="my-4" />
                <div className="grid gap-2">
                  <Button style={{ backgroundColor: BRAND.primary }}>Fes-te soci</Button>
                  <Button variant="outline" onClick={() => setLang(lang === "CAT" ? "ES" : "CAT")}>{lang}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
  className="relative bg-gradient-to-b from-white to-[var(--light)] pb-6 md:pb-10"
  id="top"
>

        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: BRAND.primary }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: BRAND.accent }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center py-12 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Pill>Club esportiu · Comunitat · Mar</Pill>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 text-slate-900 leading-[1.14] md:leading-[1.18]">


              Rem al Mediterrani,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">orgull de Cambrils</span>
            </h1>
            <p className="text-lg text-slate-600 mt-4">
              Promovem el rem tradicional i de competició per a totes les edats: formació, salut i èxit esportiu en un entorn únic.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button size="lg" style={{ backgroundColor: BRAND.primary }}>
                Prova una sessió <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300">
                Calendari d’activitats
              </Button>
            </div>
            <div className="flex gap-6 mt-8 text-slate-500">
              <div className="flex items-center gap-2"><Users className="h-4 w-4"/> +200 socis</div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4"/> 15 títols</div>
              <div className="flex items-center gap-2"><Ship className="h-4 w-4"/> 6 embarcacions</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-video rounded-2xl bg-slate-200 shadow-xl overflow-hidden grid place-items-center">
              <img src={BRAND.logo} alt="Marca Vent d’Estrop" className="h-24 opacity-70" />
            </div>
            <div className="mt-3 text-xs text-slate-500">Substituir per foto o vídeo de portada</div>
          </motion.div>
        </div>
      </section>

      {/* Value props */}
      <section id="club" className="py-14 bg-[var(--light)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {[{ title: "Comunitat i salut", desc: "Activitat inclusiva per a totes les edats amb programes de benestar." }, { title: "Formació contínua", desc: "Escoles de rem base, juvenil i adult amb tècnics titulats." }, { title: "Competició", desc: "Equipaments, calendari i staff per portar-te al següent nivell." }].map((v, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>{v.title}</CardTitle>
                <CardDescription>{v.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Schools */}
      <section id="escoles" className="py-16">
        <SectionTitle kicker="Programes" title="Escoles de rem">
          Iniciació, tecnificació i veterà. Plans adaptats per edat i objectiu, amb horaris flexibles.
        </SectionTitle>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {[{ tag: "Infantil (8–12)", title: "Descobreix el rem", body: "Joc, tècnica bàsica i seguretat. Dimarts i dijous 17:00–18:15." }, { tag: "Juvenil (13–17)", title: "Tecnificació", body: "Millora gest tècnic, força i treball en equip. Dll-Dmc-Dvj 18:30–20:00." }, { tag: "Adults", title: "Salut i competició", body: "Grups fitness i equip de llagut. Matí o vespre." }].map((p, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">{p.tag}</Badge>
                <CardTitle className="mt-2">{p.title}</CardTitle>
                <CardDescription>{p.body}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button style={{ backgroundColor: BRAND.accent }}>Inscriu-t’hi</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Competition */}
      <section id="competicio" className="py-16 bg-white">
        <SectionTitle kicker="Competició" title="Equips i resultats">
          Participem en llagut mediterrani, rem de mar i regates locals.
        </SectionTitle>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Equips 2025</CardTitle>
              <CardDescription>Absolut, Veterà, Femení, Mixt</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
                <li>• Absolut Masculí – Entrenador: J. Pons</li>
                <li>• Absolut Femení – Entrenadora: M. Serra</li>
                <li>• Veterà – Entrenador: R. Vidal</li>
                <li>• Mixt – Coordinació tècnica</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Últims resultats</CardTitle>
              <CardDescription>Actualització mensual</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700">
                <li>🥉 3r – Campionat Catalunya Llagut (Absolut)</li>
                <li>🥈 2n – Regata Costa Daurada (Veterà)</li>
                <li>🥇 1r – Trofeu Festa Major (Mixt)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-16 bg-[var(--light)]">
        <SectionTitle kicker="Agenda" title="Properes activitats" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {EVENTS.map((e, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-white border text-center leading-none">
                    <div className="font-extrabold text-[var(--primary)]">{e.date.split(" ")[0]}</div>
                    <div className="text-xs text-slate-500">{e.date.split(" ")[1]}</div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{e.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1"><MapPin className="h-4 w-4"/>{e.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{e.desc}</p>
                <Button variant="outline" className="mt-4 border-slate-300">Més informació</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="noticies" className="py-16 bg-white">
        <SectionTitle kicker="Actualitat" title="Notícies del club" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Newspaper className="h-4 w-4"/>{n.title}</CardTitle>
                <CardDescription>{n.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="px-0 text-[var(--primary)]">Llegir més <ChevronRight className="h-4 w-4"/></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-16 bg-[var(--light)]">
        <SectionTitle kicker="Moments" title="Galeria" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-white rounded-xl border grid place-items-center text-slate-400">Foto {i+1}</div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section id="socis" className="py-16 bg-white">
        <SectionTitle kicker="Fes-te soci" title="Quotes i beneficis">
          Descomptes per famílies, accés a material i activitats exclusives.
        </SectionTitle>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {[{ plan: "Base", price: "15€ / mes", perks: ["Accés entrenaments","Participació activitats","Assegurança bàsica"] },{ plan: "Complet", price: "25€ / mes", perks: ["Totes les sessions","Preferència regates","Equipació bàsica"] },{ plan: "Família", price: "60€ / mes", perks: ["2 adults + 2 infants","Descomptes events","Pack benvinguda"] }].map((p, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>{p.plan}</CardTitle>
                <CardDescription>{p.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-700 space-y-2 mb-4">
                  {p.perks.map((k, j) => <li key={j}>• {k}</li>)}
                </ul>
                <Button style={{ backgroundColor: BRAND.primary }}>Unir-me</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sponsors */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {SPONSORS.map((s, i) => (
              <span key={i} className="text-sm text-slate-500">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Ajuda’ns a fer créixer el rem a Cambrils</h3>
            <p className="text-white/90 mt-2">Col·labora com a soci o patrocinador. El teu suport impulsa l’esport i la comunitat.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="text-[var(--dark)]">Fes-te soci</Button>
            <Button variant="outline" className="border-white text-white">Converteix-te en patrocinador</Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacte" className="py-16 bg-white">
        <SectionTitle kicker="Contacte" title="Parlem?" />
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Formulari de contacte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Input placeholder="Nom i cognoms" />
                <Input type="email" placeholder="Correu" />
                <Textarea placeholder="Missatge" />
                <Button style={{ backgroundColor: BRAND.primary }}>Enviar</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Informació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Moll de Ponent s/n, Port de Cambrils</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> +34 600 000 000</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4"/> info@ventdestrop.com</p>
              <Separator />
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="p-2 rounded-full border"><Instagram className="h-4 w-4"/></a>
                <a href="#" aria-label="Facebook" className="p-2 rounded-full border"><Facebook className="h-4 w-4"/></a>
                <a href="#" aria-label="YouTube" className="p-2 rounded-full border"><Youtube className="h-4 w-4"/></a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[var(--dark)] text-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8">
          <div>
            <img src={BRAND.logoAlt} alt="logo blanc" className="h-8 w-auto mb-2" />
            <div className="font-bold text-white text-lg">{BRAND.name}</div>
            <p className="text-slate-400 mt-2 text-sm">Club de rem sense ànim de lucre. Promovem el rem tradicional i de mar a Cambrils.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Club</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#club">Qui som</a></li>
              <li><a href="#socis">Fes-te soci</a></li>
              <li><a href="#contacte">Contacte</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Activitat</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#agenda">Agenda</a></li>
              <li><a href="#escoles">Escoles</a></li>
              <li><a href="#competicio">Competició</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Legal</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Avís legal</li>
              <li>Privacitat</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8 flex items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {BRAND.name}. Tots els drets reservats.</p>
          <p className="flex items-center gap-1"><Heart className="h-3 w-3"/> Fet amb passió pel mar</p>
        </div>
      </footer>

      {/* Sticky join CTA */}
      <div className="fixed bottom-4 right-4 md:right-6 z-50">
        <Button size="lg" style={{ backgroundColor: BRAND.primary }} className="shadow-xl">
          Fes-te soci <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Shell>
  );
}
