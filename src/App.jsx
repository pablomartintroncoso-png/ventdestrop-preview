import logoAzul from "@/assets/logo-azul.png";
import logoBlanco from "@/assets/logo-blanco.png";
import React, { useEffect, useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ChevronRight,
  ChevronLeft,
  X,
  MapPin,
  Newspaper,
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
  Map as MapIcon,
  Radar,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";

const HERO_PHOTOS = [
  "/hero-botecompeti.jpg",
  "/hero-boteescuela.jpg",
  "/hero-botesocial.jpg",
];
const GALLERY_IMAGES = Array.from(
  { length: 15 },
  (_, i) => `/galeria-${i + 1}.jpg`
);

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblnnvjp";

// Mapa (OpenStreetMap) centrado en Cambrils (sin API key)
const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=1.0285%2C41.0615%2C1.0915%2C41.0915&layer=mapnik&marker=41.0743%2C1.0564";
const OSM_OPEN_URL = "https://www.openstreetmap.org/?mlat=41.0743&mlon=1.0564#map=14/41.0743/1.0564";

// Enlaces Meteocat (si algún día cambian, solo tocás estos 2)
const METEOCAT_CAMBRILS_URL = "https://www.meteo.cat/";
const METEOCAT_RADAR_URL = "https://www.meteo.cat/";

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
  { label: "Salut", href: "#salut" },
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

// ✅ SOLO 3 NOTICIAS (primera = beneficio 25%)
const NEWS = [
  {
    title: "Avantatge per a socis: -25% al Gimnàs Municipal de Cambrils",
    excerpt:
      "Tots els socis del Vent d’Estrop gaudeixen d’un 25% de descompte al gimnàs del Poliesportiu Municipal de Cambrils. Demana’l amb l’acreditació de soci o escriu-nos a info@ventdestrop.com.",
  },
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
];

const VOGADORES_SHORT =
  "Les Vogadores amb Cor són dones que han superat el càncer de mama i comparteixen la passió pel rem i els beneficis que aquest esport els aporta.";
const VOGADORES_FULL =
  'Les Vogadores amb Cor són dones que han superat el càncer de mama, comparteixen la passió pel rem i els beneficis que aquest esport els aporta. Des de fa temps, el Club de Rem Vent d\'Estrop Vogadors de Cambrils acull amb entusiasme a dones que han estat afectades per càncer de mama, conegudes com a "Vogadores amb Cor". Aquest grup especial comparteix la passió pel rem com a eina de recuperació i benestar, gaudint dels beneficis tant a nivell físic com mental. Per a elles, el rem no només és una activitat esportiva, sinó també una manera de reforçar el compromís, crear relacions socials i afrontar la vida amb més optimisme. La seva participació en el club és un exemple de com l\'esport pot ser una eina poderosa per a la recuperació i la millora de la qualitat de vida, fomentant la força interior i la solidaritat entre elles.';

const REM_ADAPTAT_SHORT =
  "El rem adaptat és una activitat esportiva inclusiva en la qual es surt a la mar amb una tripulació formada tant per persones amb discapacitats diverses com amb socis del club.";
const REM_ADAPTAT_FULL =
  "El rem adaptat és una activitat esportiva inclusiva en la qual es surt a la mar amb una tripulació formada tant per persones amb discapacitats diverses com amb socis del club. L'esport adaptat en general es considera un instrument d'integració social. L'esport afavoreix el desenvolupament personal i l'autoestima, crea compromís i autodisciplina, i fomenta l'esperit de lluita i el treball en equip. Vent d'Estrop ha aconseguit obrir les portes a col·lectius amb discapacitat intel·lectual i amb malalties mentals, i per al club cambrilenc és una satisfacció molt gran que aquests col·lectius puguin fruir del rem. Pat Perpinyà va ser la vogadora que va iniciar aquest projecte l'any 2009 i que aquest any ja arriba a la seva sisena temporada consecutiva. El club cambrilenc va ser pioner en aquesta pràctica inclusiva del rem dins del litoral català.";

const Pill = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-white/80 text-sm text-slate-700 border border-white/60 shadow-sm">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, children }) => (
  <div className="max-w-5xl mx-auto text-center mb-10">
    <p className="uppercase tracking-widest text-sm text-slate-500">{kicker}</p>
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
  const [lang, setLang] = useState("CAT");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVogadoresMore, setShowVogadoresMore] = useState(false);
  const [showRemAdaptatMore, setShowRemAdaptatMore] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");

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
    "social",
    "salut",
    "noticies",
    "meteo",
    "contacte",
  ]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openGallery = (startIndex = 0) => {
    setGalleryIndex(startIndex);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);

  const nextImage = () => {
    setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setGalleryIndex(
      (i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setContactStatus("sending");
    setContactError("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (res.ok) {
        setContactStatus("success");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        setContactStatus("error");
        setContactError("No s'ha pogut enviar. Torna-ho a provar en un moment.");
      }
    } catch (err) {
      setContactStatus("error");
      setContactError("Error de connexió. Revisa internet i torna-ho a provar.");
    }
  };

  return (
    <Shell>
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

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://app.cluber.es/clubes/68ff44c49f856547379716/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button style={{ backgroundColor: BRAND.primary }}>Fes-te soci</Button>
            </a>

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

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="md:hidden border-slate-500 text-slate-900"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full max-w-full shadow-xl border-l border-slate-200 p-0 flex flex-col"
              style={{ backgroundColor: "#ffffff", opacity: 1 }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img src={BRAND.logo} alt="logo" className="h-7" />
                  <span className="font-semibold text-slate-900">
                    {BRAND.name}
                  </span>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="sm">
                    Tancar
                  </Button>
                </SheetClose>
              </div>

              <nav className="grid gap-3 px-4 py-4">
                {NAV.map((n) => (
                  <SheetClose asChild key={n.href}>
                    <a
                      href={n.href}
                      className="text-slate-800 text-lg py-1 border-b border-slate-100 last:border-none"
                    >
                      {n.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto px-4 pb-4 space-y-3">
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
                  <Button variant="outline" className="w-full border-slate-300">
                    Descarregar fitxa
                  </Button>
                </a>

                <Button
                  variant="outline"
                  className="w-full border-slate-300"
                  onClick={() => setLang(lang === "CAT" ? "ES" : "CAT")}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {lang}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

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
              Promovem el rem tradicional i de competició per a totes les edats:
              formació, salut i èxit esportiu en un entorn únic.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                size="lg"
                style={{ backgroundColor: BRAND.primary }}
                onClick={() => scrollToSection("contacte")}
              >
                Prova una sessió
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <a
                href="/calendario.jpg"
                target="_blank"
                rel="noopener"
                aria-label="Calendari d’activitats (imatge)"
              >
                <Button size="lg" variant="outline" className="border-slate-300">
                  Calendari d’activitats
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-slate-500 text-sm">
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

      <section id="escoles" className="py-16 bg-white">
        <SectionTitle kicker="Programes" title="Escoles de rem">
          Iniciació, tecnificació i veterà. Plans adaptats per edat i objectiu,
          amb horaris flexibles.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <img
              src="/escola-1.jpg"
              alt="Escola infantil"
              className="w-full h-64 object-cover"
            />
            <CardHeader />
          </Card>

          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <img
              src="/escola-2.jpg"
              alt="Escola juvenil"
              className="w-full h-64 object-cover"
            />
            <CardHeader />
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Adults
              </Badge>
              <CardTitle className="mt-2">Salut i competició</CardTitle>
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
                  onClick={() => scrollToSection("contacte")}
                >
                  Prova una sessió
                </Button>

                <Button variant="outline" size="lg" onClick={() => openGallery(0)}>
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="competicio" className="py-16 bg-[var(--light)]">
        <SectionTitle kicker="Competició" title="Equips i resultats">
          Participem en llagut mediterrani, rem de mar i regates locals.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/competi-1.jpg"
              alt="Entrenaments de competició"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/competi-2.jpg"
              alt="Equip de regates"
              className="w-full h-full object-cover"
            />
          </div>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Equips i entrenaments</CardTitle>
              <CardDescription>
                Grups sènior i veterans (femení i masculí). Sessions setmanals per
                millorar tècnica, resistència i coordinació.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>
                  <strong>• Sènior femení</strong>
                  <br />
                  Dimecres i divendres 19:00–21:00 · Dissabte 10:00–11:30
                </li>
                <li>
                  <strong>• Sènior masculí</strong>
                  <br />
                  Dimarts i dijous 19:00–21:00 · Dissabte 08:30–10:00
                </li>
                <li>
                  <strong>• Veteranes (femení)</strong>
                  <br />
                  Dimecres i divendres 19:00–21:00 · Diumenge 09:15–10:15
                </li>
                <li>
                  <strong>• Veterans (masculí)</strong>
                  <br />
                  Dimarts i dijous 20:00–22:00 · Diumenge 08:15–09:15
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  style={{ backgroundColor: BRAND.primary }}
                  onClick={() => scrollToSection("contacte")}
                >
                  Prova una sessió
                </Button>

                <Button variant="outline" size="lg" onClick={() => openGallery(0)}>
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="social" className="py-16 bg-white">
        <SectionTitle kicker="Social" title="Activitats Socials">
          Descomptes per famílies, accés a material i activitats exclusives.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/social-1.jpg"
              alt="Activitat social del club"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm h-64 bg-slate-200">
            <img
              src="/social-2.jpg"
              alt="Esdeveniment comunitari"
              className="w-full h-full object-cover"
            />
          </div>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Activitats socials</CardTitle>
              <CardDescription>
                Rem social, jornades familiars, sortides al mar i activitats de
                comunitat per a totes les edats.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Rem social – Dm i Dv 17:00–18:30</li>
                <li>• Sortides familiars – Caps de setmana</li>
                <li>• Activitats comunitàries mensuals</li>
                <li>• Sessions d’iniciació per nous membres</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  style={{ backgroundColor: BRAND.primary }}
                  onClick={() => scrollToSection("contacte")}
                >
                  Prova una sessió
                </Button>

                <Button variant="outline" size="lg" onClick={() => openGallery(0)}>
                  Veure més fotos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="salut" className="py-16 bg-[var(--light)]">
        <SectionTitle kicker="Salut" title="Vogadores amb Cor & Rem Adaptat">
          Programes especials que combinen esport, inclusió i benestar a través
          del rem.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl shadow-sm flex flex-col">
            <CardHeader className="pb-0">
              <img
                src="/vogadores-amb-cor.jpg"
                alt="Vogadores amb Cor"
                className="w-full h-56 rounded-2xl object-cover mb-4"
              />
              <CardTitle>Vogadores amb Cor</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col">
              <p className="text-slate-700 text-sm leading-relaxed">
                {showVogadoresMore ? VOGADORES_FULL : VOGADORES_SHORT}
              </p>
              <Button
                variant="ghost"
                className="px-0 mt-2 text-[var(--primary)] w-fit"
                onClick={() => setShowVogadoresMore((prev) => !prev)}
              >
                {showVogadoresMore ? "Veure menys" : "Veure més"}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm flex flex-col">
            <CardHeader className="pb-0">
              <img
                src="/rem-adaptat.jpg"
                alt="Rem adaptat"
                className="w-full h-56 rounded-2xl object-cover mb-4"
              />
              <CardTitle>Rem adaptat</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col">
              <p className="text-slate-700 text-sm leading-relaxed">
                {showRemAdaptatMore ? REM_ADAPTAT_FULL : REM_ADAPTAT_SHORT}
              </p>
              <Button
                variant="ghost"
                className="px-0 mt-2 text-[var(--primary)] w-fit"
                onClick={() => setShowRemAdaptatMore((prev) => !prev)}
              >
                {showRemAdaptatMore ? "Veure menys" : "Veure més"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="noticies" className="py-16 bg-white">
        <SectionTitle kicker="Actualitat" title="Notícies del club" />
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
                <Button variant="ghost" className="px-0 text-[var(--primary)]">
                  Llegir més <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ✅ NUEVO METEO: mapa + panel útil (sin iframes frágiles de Meteocat) */}
      <section id="meteo" className="py-16 bg-[var(--light)]">
        <SectionTitle kicker="Meteo" title="Condicions de vent i temps">
          Predicció oficial (Meteocat) i mapa de referència per planificar les sortides amb seguretat.
        </SectionTitle>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" /> Cambrils · Port i base nàutica
              </CardTitle>
              <CardDescription>
                Ubicació ràpida per orientar-te abans de sortir.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white h-[420px]">
                <iframe
                  title="Mapa Cambrils"
                  src={OSM_EMBED_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a href={OSM_OPEN_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-slate-300">
                    Obrir mapa <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>

                <a href={METEOCAT_CAMBRILS_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    style={{ backgroundColor: BRAND.primary }}
                    className="text-white"
                  >
                    Meteocat (Cambrils) <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>

                <a href={METEOCAT_RADAR_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-slate-300">
                    Radar <Radar className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" /> Predicció Meteocat
              </CardTitle>
              <CardDescription>
                Ideal per decidir si surts al matí o al vespre amb un sol cop d’ull.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-slate-700 text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li>Estat del cel i evolució per hores</li>
                <li>Temperatura</li>
                <li>Precipitació</li>
                <li>Vent: velocitat i direcció</li>
              </ul>

              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
                <strong>Avís de seguretat</strong>
                <div className="mt-1">
                  Si hi ha avisos oficials (vent fort / mala mar) o indicacions del club, la sortida es pot anul·lar. En cas de dubte, prioritzeu la seguretat.
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={METEOCAT_CAMBRILS_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-slate-300">
                    Obrir Meteocat (Cambrils)
                  </Button>
                </a>
                <a href={METEOCAT_RADAR_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-slate-300">
                    Obrir Radar
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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

      <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Ajuda’ns a fer créixer el rem a Cambrils
            </h3>
            <p className="text-white/90 mt-2">
              Col·labora com a soci o patrocinador. El teu suport impulsa
              l’esport i la comunitat.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="text-[var(--dark)]">
              Fes-te soci
            </Button>
            <Button variant="outline" className="border-white text-white">
              Converteix-te en patrocinador
            </Button>
          </div>
        </div>
      </section>

      <section id="contacte" className="py-16 bg-white">
        <SectionTitle kicker="Contacte" title="Parlem?" />
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Formulari de contacte</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={submitContact}>
                <Input
                  placeholder="Nom i cognoms"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Correu"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Missatge"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />

                {contactStatus === "success" && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                    Missatge enviat amb èxit. Gràcies!
                  </div>
                )}

                {contactStatus === "error" && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">
                    {contactError}
                  </div>
                )}

                <Button
                  type="submit"
                  style={{ backgroundColor: BRAND.primary }}
                  disabled={contactStatus === "sending"}
                  className={contactStatus === "sending" ? "opacity-80" : ""}
                >
                  {contactStatus === "sending" ? "Enviant..." : "Enviar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Informació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Moll de Ponent s/n, Port de
                Cambrils
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
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                >
                  <Instagram className="h-4 w-4" style={{ color: "#E4405F" }} />
                </a>

                <a
                  href="https://www.facebook.com/vent.destropcambrils"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                >
                  <Facebook className="h-4 w-4" style={{ color: "#1877F2" }} />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                >
                  <Youtube className="h-4 w-4" style={{ color: "#FF0000" }} />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-10 bg-[var(--dark)] text-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8">
          <div>
            <img
              src={BRAND.logoAlt}
              alt="logo blanc"
              className="h-8 w-auto mb-2"
            />
            <div className="font-bold text-white text-lg">{BRAND.name}</div>
            <p className="text-slate-400 mt-2 text-sm">
              Club de rem sense ànim de lucre. Promovem el rem tradicional i de
              mar a Cambrils.
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
              <li>
                <a href="/ficha-salut-rem.pdf" download>
                  Descarregar fitxa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Activitat</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#salut">Salut</a>
              </li>
              <li>
                <a href="#escoles">Escoles</a>
              </li>
              <li>
                <a href="#competicio">Competició</a>
              </li>
              <li>
                <a href="#meteo">Meteo</a>
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
            © {new Date().getFullYear()} {BRAND.name}. Tots els drets reservats.
          </p>
          <p className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> Fet amb passió pel mar
          </p>
        </div>
      </footer>

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

      {isGalleryOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={closeGallery}
            aria-label="Tancar galeria"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 text-white"
            onClick={prevImage}
            aria-label="Imatge anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <img
            src={GALLERY_IMAGES[galleryIndex]}
            alt="Galeria Vent d'Estrop"
            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
          />

          <button
            className="absolute right-4 text-white"
            onClick={nextImage}
            aria-label="Imatge següent"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </Shell>
  );
}
