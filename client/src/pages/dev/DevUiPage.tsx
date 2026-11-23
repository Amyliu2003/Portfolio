import React, { useState } from "react";
import { Button, Card, Input, SearchInput, Slider, Switch, Tag, Textarea } from "../../components/ui";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import "./dev-ui.css";

/**
 * Dev-only UI kit sheet (route registered only when import.meta.env.DEV).
 * Sections A–F mirror docs/design-system.html for side-by-side comparison.
 */

const SWATCHES = [
  { name: "background", value: "#080a14", varName: "--color-bg" },
  { name: "surface", value: "#0e1128", varName: "--color-surface" },
  { name: "primary", value: "#181A4B", varName: "--color-primary" },
  { name: "secondary", value: "#172FAB", varName: "--color-secondary" },
  { name: "accent", value: "#BA76FF", varName: "--color-accent", dark: true },
  { name: "accent 2", value: "#4affed", varName: "--color-accent-2", dark: true },
  { name: "text", value: "#e8e8f0", varName: "--color-fg", dark: true },
  { name: "border", value: "rgba(186,118,255,.15)", varName: "--color-border" },
  { name: "danger", value: "#ff5d6c", varName: "--color-danger", dark: true },
];

const RADII = [
  { v: "0", css: "var(--radius-0)", d: "Icons, borders, table cells — anywhere precision matters more than softness." },
  { v: "4px", css: "var(--radius-4)", hl: true, d: "Buttons, inputs, tags, dropdowns, search — small enough to read as a soft corner, not a shape." },
  { v: "8px", css: "var(--radius-8)", d: "Chips, tooltips, icon buttons — small footprint elements that still need to feel soft." },
  { v: "12px", css: "var(--radius-12)", d: "Nav items, sidebars, small panels — medium rounding for elements that frame content." },
  { v: "16px", css: "var(--radius-16)", hl: true, d: "Cards, panels, image areas — the default radius for any standalone content block." },
  { v: "20px", css: "var(--radius-20)", d: "Modals, drawers, large containers — bigger surfaces where rounding should be visibly felt." },
  { v: "pill", css: "var(--radius-pill)", d: "Toggles, avatars, progress bars — anything that should read as a capsule or circle." },
];

const BREAKPOINTS = [
  { px: 375, name: "mobile" },
  { px: 768, name: "tablet" },
  { px: 1280, name: "desktop" },
  { px: 1920, name: "wide" },
];

const Section: React.FC<{ letter: string; title: string; children: React.ReactNode }> = ({ letter, title, children }) => (
  <section className="ui-dev__section" aria-labelledby={`ui-dev-${letter}`}>
    <div className="ui-dev__lab">{letter}</div>
    <h2 className="ui-dev__h2" id={`ui-dev-${letter}`}>{title}</h2>
    {children}
  </section>
);

export default function DevUiPage() {
  useDocumentTitle("UI Kit (dev)");
  const [query, setQuery] = useState("");
  const [intensity, setIntensity] = useState(40);
  const [tags, setTags] = useState<Record<string, boolean>>({ "Creative tech 12": true });
  const [note, setNote] = useState<(typeof RADII)[number] | null>(null);

  const toggleTag = (t: string) => setTags((prev) => ({ ...prev, [t]: !prev[t] }));

  return (
    <main className="ui-dev">
      <div className="ui-dev__wrap">
        <div className="ui-dev__lab">dev only · /dev/ui</div>
        <h1 className="ui-dev__h1">UI Kit</h1>
        <p className="ui-dev__sub">
          Compare with docs/design-system.html · containers 16px · controls 4px · circular slider &amp; switch · #BA76FF
        </p>

        <Section letter="A" title="Colors">
          <div className="ui-dev__swatches">
            {SWATCHES.map((s) => (
              <div key={s.name} className="ui-dev__swatch" style={{ background: `var(${s.varName})`, color: s.dark ? "#000" : undefined }}>
                {s.name}
                <br />
                {s.value}
                <br />
                <code>{s.varName}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section letter="B" title="Buttons">
          <div className="ui-dev__panel ui-dev__row">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Destructive</Button>
            <Button variant="outline" disabled>Disabled</Button>
          </div>
        </Section>

        <Section letter="C" title="Inputs">
          <div className="ui-dev__panel ui-dev__stack">
            <div className="ui-dev__row ui-dev__row--top">
              <Input label="Project name" placeholder="Search(Project_Name)..." fieldClassName="ui-dev__grow" />
              <Input label="Email" type="email" placeholder="hello@amyliusiyan.com" fieldClassName="ui-dev__grow" />
            </div>
            <Textarea label="Message" placeholder="Tell me about the project..." />
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />
            <div className="ui-dev__row ui-dev__row--top">
              <Input label="With hint" placeholder="Optional" hint="Hint text sits under the field." fieldClassName="ui-dev__grow" />
              <Input label="With error" defaultValue="not-an-email" error="Enter a valid email." fieldClassName="ui-dev__grow" />
              <Input label="Disabled" placeholder="Disabled" disabled fieldClassName="ui-dev__grow" />
            </div>
          </div>
        </Section>

        <Section letter="D" title="Slider & Switch">
          <div className="ui-dev__panel ui-dev__stack">
            <Slider label="Intensity" value={intensity} onValueChange={setIntensity} />
            <div className="ui-dev__row ui-dev__row--wide">
              <Switch defaultChecked>Dithering on</Switch>
              <Switch>Hover effect</Switch>
              <Switch>Grain</Switch>
              <Switch disabled>Disabled</Switch>
            </div>
          </div>
        </Section>

        <Section letter="E" title="Badges & Cards">
          <div className="ui-dev__row ui-dev__row--mb">
            {["Creative tech 12", "Web 8", "Installation 5", "Dithering 3"].map((t) => (
              <Tag key={t} on={!!tags[t]} onClick={() => toggleTag(t)}>
                {t}
              </Tag>
            ))}
          </div>
          <div className="ui-dev__cards">
            {[
              { hd: "Project 01", bd: "Cross-domain mapping across sound, image and code.", tags: ["React", "Three.js"] },
              { hd: "Project 02", bd: "Palette generator with dithering integration.", tags: ["TS", "Canvas"] },
              { hd: "Project 03", bd: "Hover-dither project card effect.", tags: ["Tailwind"] },
            ].map((c) => (
              <Card key={c.hd}>
                <Card.Hd>{c.hd}</Card.Hd>
                <Card.Bd>
                  {c.bd}
                  <div className="ui-dev__row ui-dev__row--tight">
                    {c.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Card.Bd>
              </Card>
            ))}
          </div>
        </Section>

        <Section letter="F" title="Border Radius">
          <div className="ui-dev__panel">
            <div className="ui-dev__radii" onMouseLeave={() => setNote(null)}>
              {RADII.map((r) => (
                <div
                  key={r.v}
                  className={`ui-dev__ri ui-focus-ring${r.hl ? " is-hl" : ""}`}
                  tabIndex={0}
                  onMouseEnter={() => setNote(r)}
                  onFocus={() => setNote(r)}
                  onBlur={() => setNote(null)}
                  aria-label={`${r.v}: ${r.d}`}
                >
                  <b style={{ borderRadius: r.css }} />
                  <span>{r.v}</span>
                </div>
              ))}
            </div>
            <p className={`ui-dev__rnote${note ? " is-on" : ""}`} aria-live="polite">
              {note ? (
                <>
                  <em>{note.v}</em>
                  {note.d}
                </>
              ) : (
                "hover or focus a shape ( ´ ▽ ` )"
              )}
            </p>
            <div className="ui-dev__bp">
              {BREAKPOINTS.map((b) => (
                <div key={b.px}>
                  <b>{b.px}</b>
                  {b.name}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
