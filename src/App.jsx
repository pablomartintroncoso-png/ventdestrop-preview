import logoAzul from "@/assets/logo-azul.png";
import logoBlanco from "@/assets/logo-blanco.png";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

// === Carrusel de imágenes del hero ===
const HERO_PHOTOS = [
  "/hero-botecompeti.jpg",
  "/hero-boteescuela.jpg",
  "/hero-botesocial.jpg",
];

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
  { label: "Social", href: "#social" },
  { label: "Agenda", href: "#agenda" },
  { label: "Notícies", href: "#noticies" },
  { label: "Contacte", href: "#contacte" },
];

const EVENTS = [
  {
    date: "24 NOV",
    title: "Regata Llagut Mediterrani – Badia de Cambrils",
    location: "Port de Cambrils",
    desc: "Prova del calendari federatiu. Categories absolut i veterà.",
  },
  {
    date: "30 NOV",
    title: "Jornada de Portes Obertes",
    location: "Base nàutica",
    desc: "Sessió gratuïta per a nous remers i famílies.",
  },
  {
    date: "12 DES",
    title: "Assemblea General Ordinària",
    location: "Sala Polivalent – Club",
    desc: "Memòria anual, pressupost i projectes 2026.",
  },
];

const NEWS = [
  {
    title: "Bronze al Campionat de Catalunya de Llagut",
    excerpt:
      "L’equip absolut aconsegueix el podi després d’una final molt disputada…",
  },
  {
    title: "Nova escola de rem per a infants (8–12)",
    excerpt:
      "Inscripcions obertes amb places limitades. Sessions dimarts i dijous…",
  },
  {
    title: "Projecte de renovació del varador",
    excerpt:
      "Presentem el pla d’infraestructura per millorar l’accessibilitat i el manteniment…",
  },
];

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-white/80 text-sm text-slate-700 border border-white/60 shadow-sm">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="max-w-5xl mx-auto text-center mb-10">
    <p className="uppercase tracking-widest text-sm text-slate-500">
      {kicker}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold mt-1 text-slate-900">
      {title}
    </h2>
    {children && (
      <p className="text-slate-600 mt-4 max-w-3xl mx-auto">{children}</p>
    )}
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
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_PHOTOS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const active = useActiveSection([
    "club",
    "escoles",
    "competicio",
    "agenda",
    "noticies",
    "galeria",
    "socis",
    "contacte",
  ]);
  const [lang, setLang] = useState("CAT");

  return (
    <Shell>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="Inici">
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              className="h-10 w-auto object-contain"
            />
            <div>
              <div className="font-bold leading-tight">{BRAND.name}</div>
              <div className="text-xs text-slate-500">{BRAND.tagline}</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`hover:text-slate-900 ${
                  active === n.href
                    ? "text-[var(--primary)] font-medium"
                    : "text-slate-600"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://app.cluber.es/clubes/68ff44c49f856547379716/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button style={{ backgroundColor: BRAND.primary }}>
                Fes-te soci
              </Button>
            </a>

            {/* Botó per descarregar la fitxa de salut */}
            <a href="/ficha-salut-rem.pdf" download>
              <Button variant="outline" className="border-slate-300">
                Descarregar fitxa
              </Button>
            </a>

            <Button
              variant="outline"
              className="border-slate-300"
              onClick={() => setLang(lang === "CAT" ? "ES" : "CAT")}
            >
              <Globe className="h-4 w-4 mr-1" />
              {lang}
            </Button>
          </div>

          {/* Menú mòbil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
  side="right"
  className="w-full max-w-xs bg-white !bg-opacity-100 shadow-xl border-l border-slate-200"
style={{ backgroundColor: "rgba(255,255,255,1)" }}

>

   <div className="fixed inset-0 bg-white">
   <div className="flex flex-col h-full bg-white !bg-opacity-100 p-4">

      {/* Logo y nombre */}
      <div className="flex items-center gap-2 mb-6">
        <img src={BRAND.logo} alt="logo" className="h-7" />
        <span className="font-semibold">{BRAND.name}</span>
      </div>

      {/* Enlaces del menú */}
      <nav className="grid gap-3">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="text-slate-700 text-lg"
          >
            {n.label}
          </a>
        ))}
      </nav>

      <Separator className="my-6" />

      {/* Botones */}
      <div className="grid gap-3 mt-auto">

        <a
          href="https://app.cluber.es/clubes/68ff44c49f856547379716/inscripcion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            style={{ backgroundColor: BRAND.primary }}
            className="w-full"
          >
            Fes-te soci
          </Button>
        </a>

        <a href="/ficha-salut-rem.pdf" download>
          <Button
            variant="outline"
            className="w-full border-slate-300"
          >
            Descarregar fitxa
          </Button>
        </a>

        <Button
          variant="outline"
          onClick={() => setLang(lang === "CAT" ? "ES" : "CAT")}
        >
          {lang}
        </Button>

      </div>
    </div>
  </div>
            
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative bg-gradient-to-b from-white to-[var(--light)] pb-12 md:pb-20"
        id="top"
      >
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: BRAND.primary }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: BRAND.accent }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Pill>Club esportiu · Comunitat · Mar</Pill>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 md:mt-8 text-slate-900 leading-[1.2] md:leading-[1.28]">
              Rem al Mediterrani,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                orgull de Cambrils
              </span>
            </h1>
            <p className="text-lg text-slate-600 mt-4">
              Promovem el rem tradicional i de competició per a totes les
              edats: formació, salut i èxit esportiu en un entorn únic.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button size="lg" style={{ backgroundColor: BRAND.primary }}>
                Prova una sessió{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <a
                href="/calendario.jpg"
                target="_blank"
                rel="noopener"
                aria-label="Calendari d’activitats (imatge)"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300"
                >
                  Calendari d’activitats
                </Button>
              </a>
            </div>
            <div className="flex gap-6 mt-8 text-slate-500">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> +200 socis
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" /> 15 títols
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4" /> 6 embarcacions
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img
                src={HERO_PHOTOS[slide]}
                alt={`Vent d’Estrop en acció ${slide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Foto: equip Vent d’Estrop
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schools */}
      <section id="escoles" className="py-16">
        <SectionTitle
          kicker="Programes"
          title="Escoles de rem"
        >
          Iniciació, tecnificació i veterà. Plans adaptats per edat i
          objectiu, amb horaris flexibles.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {/* Tarjeta 1 – FOTO */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <img
              src="/escola-1.jpg"
              alt="Escola infantil"
              className="w-full h-64 object-cover"
            />
            <CardHeader></CardHeader>
          </Card>

          {/* Tarjeta 2 – FOTO */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <img
              src="/escola-2.jpg"
              alt="Escola juvenil"
              className="w-full h-64 object-cover"
            />
            <CardHeader></CardHeader>
          </Card>

          {/* Tarjeta 3 – HORARIS + BOTÓ */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Adults
              </Badge>
              <CardTitle className="mt-2">
                Salut i competició
              </CardTitle>
              <CardDescription>
                Grups fitness i equip de llagut.
                <br />
                Matí o vespre.
                <br />
                <br />
                <strong>Horaris:</strong>
                <br />
                Dilluns – 19:00–20:30
                <br />
                Dimecres – 19:00–20:30
                <br />
                Dissabte – 09:00–11:00
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Prova una sessió
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/galeria";
                  }}
                >
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Competition */}
      <section id="competicio" className="py-16 bg-white">
        <SectionTitle
          kicker="Competició"
          title="Equips i resultats"
        >
          Participem en llagut mediterrani, rem de mar i regates locals.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {/* Foto 1 */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/competi-1.jpg"
              alt="Entrenaments de competició"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foto 2 */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/competi-2.jpg"
              alt="Equip de regates"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + horaris */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Equips i entrenaments</CardTitle>
              <CardDescription>
                Absolut, Veterà, Femení i Mixt. Sessions setmanals per
                millorar tècnica, resistència i coordinació.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-slate-700">
                <li>• Absolut – Dl, Dmc, Dvj 20:00–22:00</li>
                <li>• Veterà – Dm i Dv 19:00–20:30</li>
                <li>• Femení – Dx i Dv 18:00–19:30</li>
                <li>• Mixt – Ds 09:00–11:00</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Prova una sessió
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/galeria";
                  }}
                >
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social */}
      <section id="social" className="py-16 bg-white">
        <SectionTitle
          kicker="Social"
          title="Activitats Socials"
        >
          Descomptes per famílies, accés a material i activitats
          exclusives.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {/* Foto 1 */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/social-1.jpg"
              alt="Activitat social del club"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Foto 2 */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/social-2.jpg"
              alt="Esdeveniment comunitari"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + horaris */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Activitats socials</CardTitle>
              <CardDescription>
                Rem social, jornades familiars, sortides al mar i
                activitats de comunitat per a totes les edats.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-slate-700">
                <li>• Rem social – Dm i Dv 17:00–18:30</li>
                <li>• Sortides familiars – Caps de setmana</li>
                <li>• Activitats comunitàries mensuals</li>
                <li>• Sessions d’iniciació per nous membres</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Prova una sessió
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/galeria";
                  }}
                >
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-16 bg-[var(--light)]">
        <SectionTitle
          kicker="Agenda"
          title="Properes activitats"
        />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {EVENTS.map((e, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-white border text-center leading-none">
                    <div className="font-extrabold text-[var(--primary)]">
                      {e.date.split(" ")[0]}
                    </div>
                    <div className="text-xs text-slate-500">
                      {e.date.split(" ")[1]}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {e.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {e.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{e.desc}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-slate-300"
                >
                  Més informació
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="noticies" className="py-16 bg-white">
        <SectionTitle
          kicker="Actualitat"
          title="Notícies del club"
        />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  {n.title}
                </CardTitle>
                <CardDescription>{n.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="px-0 text-[var(--primary)]"
                >
                  Llegir més{" "}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Meteo */}
      <section id="meteo" className="py-16 bg-[var(--light)]">
        <SectionTitle
          kicker="Meteo"
          title="Condicions de vent i mar"
        >
          Informació actualitzada per planificar les sortides amb
          seguretat.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
          {/* Widget Windy */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-200 h-[420px]">
            <iframe
              width="100%"
              height="100%"
              src="https://embed.windy.com/embed2.html?lat=41.0743&lon=1.0564&detailLat=41.0743&detailLon=1.0564&zoom=11&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C"
              frameBorder="0"
            ></iframe>
          </div>

          {/* Explicació */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Vent i condicions del mar</CardTitle>
              <CardDescription>
                Consulta el vent actual, les ràfegues, l'onatge i
                l'evolució per hores.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-slate-700 text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li>Direcció i intensitat del vent</li>
                <li>Ràfegues i previsió per hores</li>
                <li>
                  Especificació per nivell del mar i superfície
                </li>
                <li>Model ECMWF (el més fiable del món)</li>
              </ul>

              <a
                href="https://www.windy.com/?41.0743,1.0564,11"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="mt-2 border-slate-300"
                >
                  Obrir totes les capes meteorològiques
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-10">
            <img
              src="/logos/radio-cambrils.png"
              alt="Ràdio Cambrils"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/club-nautic-cambrils.png"
              alt="Club Nàutic Cambrils"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/castro.png"
              alt="A.N. Castro"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/fcr.png"
              alt="FCR"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/ajuntament-cambrils.png"
              alt="Ajuntament de Cambrils"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/savall.png"
              alt="Savall"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/comaigua.png"
              alt="Comaigua"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/acuamar.png"
              alt="Acuamar"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />

            <img
              src="/logos/revista-cambrils.png"
              alt="Revista Cambrils"
              className="h-24 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Ajuda’ns a fer créixer el rem a Cambrils
            </h3>
            <p className="text-white/90 mt-2">
              Col·labora com a soci o patrocinador. El teu suport
              impulsa l’esport i la comunitat.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="text-[var(--dark)]"
            >
              Fes-te soci
            </Button>
            <Button
              variant="outline"
              className="border-white text-white"
            >
              Converteix-te en patrocinador
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacte" className="py-16 bg-white">
        <SectionTitle
          kicker="Contacte"
          title="Parlem?"
        />
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
                <Button style={{ backgroundColor: BRAND.primary }}>
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Informació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Moll de Ponent s/n, Port
                de Cambrils
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +34 600 000 000
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@ventdestrop.com
              </p>
              <Separator />
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/ventdestrop"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full border"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="https://www.facebook.com/vent.destropcambrils"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full border"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="p-2 rounded-full border"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[var(--dark)] text-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8">
          <div>
            <img
              src={BRAND.logoAlt}
              alt="logo blanc"
              className="h-8 w-auto mb-2"
            />
            <div className="font-bold text-white text-lg">
              {BRAND.name}
            </div>
            <p className="text-slate-400 mt-2 text-sm">
              Club de rem sense ànim de lucre. Promovem el rem
              tradicional i de mar a Cambrils.
            </p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Club</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#club">Qui som</a>
              </li>
              <li>
                <a href="#socis">Fes-te soci</a>
              </li>
              <li>
                <a href="#contacte">Contacte</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">
              Activitat
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#agenda">Agenda</a>
              </li>
              <li>
                <a href="#escoles">Escoles</a>
              </li>
              <li>
                <a href="#competicio">Competició</a>
              </li>
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
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Tots els drets
            reservats.
          </p>
          <p className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> Fet amb passió pel mar
          </p>
        </div>
      </footer>

      {/* Sticky join CTA */}
      <div className="fixed bottom-4 right-4 md:right-6 z-50">
        <a
          href="https://app.cluber.es/clubes/68ff44c49f856547379716/inscripcion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            style={{ backgroundColor: BRAND.primary }}
            className="shadow-xl"
          >
            Fes-te soci <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </Shell>
  );
}

