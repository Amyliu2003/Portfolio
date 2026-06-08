import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";

// UofT Academic Excellence design tokens
const C = {
  blue: "#002A5C",
  gold: "#FFD200",
  teal: "#007FA3",
  ink: "#1A1A1A",
  white: "#FFFFFF",
  gray: "#F7F8F9",
  outline: "#C4C6D1",
  muted: "#747780",
  error: "#ba1a1a",
};

const DEFAULT_TIERS = [
  { id: "must", label: "MUST TAKE", color: "#002A5C" },
  { id: "high", label: "HIGH", color: "#007FA3" },
  { id: "maybe", label: "MAYBE", color: "#725c00" },
  { id: "later", label: "LATER", color: "#747780" },
  { id: "skip", label: "SKIP", color: "#C4C6D1" },
];

const PALETTE = [
  "#002A5C",
  "#264679",
  "#007FA3",
  "#004d64",
  "#725c00",
  "#FFD200",
  "#ba1a1a",
  "#43474f",
  "#747780",
  "#C4C6D1",
  "#1A1A1A",
  "#e5e2e1",
];

const SAMPLE = {
  courses: [
    {
      code: "INF2260H",
      name: "Speculative Design",
      credits: 0.5,
      term: "TBD",
      instructor: "TBD",
      notes: "",
    },
    {
      code: "INF2310H",
      name: "UX for Mixed Reality",
      credits: 0.5,
      term: "Fall",
      instructor: "Henrikson",
      notes: "",
    },
    {
      code: "INF2182H",
      name: "Information Visualization",
      credits: 0.5,
      term: "Winter",
      instructor: "DiPietro",
      notes: "",
    },
    {
      code: "INF2165H",
      name: "Accessibility & Inclusive Design",
      credits: 0.5,
      term: "Fall",
      instructor: "Petterson",
      notes: "",
    },
    {
      code: "INF2200H",
      name: "UX Leadership & Influence",
      credits: 0.5,
      term: "F/W",
      instructor: "Cox",
      notes: "Year 2+ only",
    },
    {
      code: "INF2164H",
      name: "UX for Video Games",
      credits: 0.5,
      term: "TBD",
      instructor: "TBD",
      notes: "",
    },
    {
      code: "INF2241H",
      name: "Critical Making",
      credits: 0.5,
      term: "Winter",
      instructor: "Gram",
      notes: "",
    },
    {
      code: "INF2224H",
      name: "Service Design",
      credits: 0.5,
      term: "TBD",
      instructor: "TBD",
      notes: "",
    },
    {
      code: "INF2171H",
      name: "Usability Assessment",
      credits: 0.5,
      term: "TBD",
      instructor: "TBD",
      notes: "",
    },
    {
      code: "INF2040H",
      name: "Project Management",
      credits: 0.5,
      term: "TBD",
      instructor: "TBD",
      notes: "",
    },
  ],
};

let uid = 200;

type Course = {
  code: string;
  name: string;
  credits: number;
  term: string;
  instructor: string;
  notes: string;
};

type Tier = {
  id: string;
  label: string;
  color: string;
};

const STORAGE_KEYS = {
  pool: "ctm_pool",
  tiers: "ctm_tiers",
  placements: "ctm_placements",
} as const;

function cloneDefaultTiers(): Tier[] {
  return DEFAULT_TIERS.map((tier) => ({ ...tier }));
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Card
function CourseCard({
  course,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  course: Course;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1px solid ${hov ? C.teal : C.outline}`,
        borderRadius: 4,
        padding: "8px 10px",
        cursor: "grab",
        opacity: isDragging ? 0.35 : 1,
        userSelect: "none",
        minWidth: 148,
        maxWidth: 190,
        flexShrink: 0,
        transition: "border-color 0.15s, box-shadow 0.15s",
        boxShadow: hov ? "0px 4px 20px rgba(0,0,0,0.05)" : "none",
        position: "relative",
      }}
    >
      {course.notes && (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 7,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.gold,
            border: "1px solid #b39700",
          }}
          title={course.notes}
        />
      )}
      <div
        style={{
          fontSize: 10,
          color: C.teal,
          fontFamily: "Inter,sans-serif",
          fontWeight: 600,
          marginBottom: 2,
          letterSpacing: 1,
        }}
      >
        {course.code}
      </div>
      <div
        style={{
          fontSize: 12,
          color: C.ink,
          fontWeight: 600,
          lineHeight: 1.35,
          marginBottom: 5,
          fontFamily: "'Source Serif 4',Georgia,serif",
        }}
      >
        {course.name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: C.muted,
          fontFamily: "Inter,sans-serif",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <span>{course.credits} cr</span>
        {course.term && course.term !== "TBD" && <span>. {course.term}</span>}
        {course.instructor && course.instructor !== "TBD" && (
          <span>. {course.instructor}</span>
        )}
      </div>
    </div>
  );
}

// Tier Row
function TierRow({
  tier,
  items,
  draggingCode,
  onDrop,
  onDragOver,
  onDragLeave,
  isOver,
  onEditTier,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onCardClick,
}: {
  tier: Tier;
  items: Course[];
  draggingCode: string | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  isOver: boolean;
  onEditTier: (tierId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onCardClick: (course: Course) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        marginBottom: 2,
        border: `1px solid ${C.outline}`,
      }}
    >
      <div
        onClick={() => onEditTier(tier.id)}
        title="Click to edit tier"
        style={{
          width: 80,
          minHeight: 68,
          background: tier.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          padding: "4px 6px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter,sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 2,
            textAlign: "center",
            lineHeight: 1.3,
            wordBreak: "break-word",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          {tier.label}
        </span>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          flex: 1,
          minHeight: 68,
          background: isOver ? "#EEF4FB" : C.white,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          padding: 8,
          alignContent: "flex-start",
          transition: "background 0.12s",
          borderLeft: `3px solid ${isOver ? tier.color : "transparent"}`,
        }}
      >
        {items.map((c) => (
          <CourseCard
            key={c.code}
            course={c}
            isDragging={draggingCode === c.code}
            onDragStart={(e) => e.dataTransfer.setData("courseCode", c.code)}
            onDragEnd={() => {}}
            onClick={() => onCardClick(c)}
          />
        ))}
        {items.length === 0 && (
          <span
            style={{
              color: C.outline,
              fontSize: 11,
              fontFamily: "Inter,sans-serif",
              alignSelf: "center",
              paddingLeft: 4,
              fontStyle: "italic",
            }}
          >
            drag here
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: C.gray,
          borderLeft: `1px solid ${C.outline}`,
          padding: "2px 3px",
          gap: 1,
        }}
      >
        <Ctl label="⚙" title="Edit tier" onClick={() => onEditTier(tier.id)} />
        <Ctl label="▲" title="Move up" onClick={onMoveUp} disabled={isFirst} />
        <Ctl
          label="▼"
          title="Move down"
          onClick={onMoveDown}
          disabled={isLast}
        />
      </div>
    </div>
  );
}

const Ctl = ({
  label,
  onClick,
  disabled,
  title,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      background: "none",
      border: "none",
      color: disabled ? C.outline : C.muted,
      cursor: disabled ? "default" : "pointer",
      fontSize: 12,
      padding: "3px 5px",
      borderRadius: 2,
      lineHeight: 1,
    }}
  >
    {label}
  </button>
);

// Tier Edit Modal
function TierModal({
  tier,
  onSave,
  onDelete,
  onAddAbove,
  onAddBelow,
  onClose,
}: {
  tier: Tier;
  onSave: (label: string, color: string) => void;
  onDelete: () => void;
  onAddAbove: () => void;
  onAddBelow: () => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState(tier.label);
  const [color, setColor] = useState(tier.color);
  return (
    <Overlay onClose={onClose}>
      <ModalBox title="Edit Tier" onClose={onClose}>
        <Label>Color</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {PALETTE.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: c,
                cursor: "pointer",
                border:
                  color === c
                    ? `3px solid ${C.ink}`
                    : `3px solid ${C.outline}`,
                boxSizing: "border-box",
                transition: "transform 0.1s",
              }}
              onMouseEnter={(e) =>
                (((e.target as HTMLDivElement).style.transform = "scale(1.2)"))
              }
              onMouseLeave={(e) =>
                (((e.target as HTMLDivElement).style.transform = "scale(1)"))
              }
            />
          ))}
        </div>
        <Label>Label</Label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={inputStyle}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 20,
          }}
        >
          <Btn primary onClick={() => onSave(label, color)}>
            Save
          </Btn>
          <Btn danger onClick={onDelete}>
            Delete Row
          </Btn>
          <Btn onClick={onAddAbove}>+ Row Above</Btn>
          <Btn onClick={onAddBelow}>+ Row Below</Btn>
        </div>
      </ModalBox>
    </Overlay>
  );
}

// Course Edit Modal
function CourseModal({
  course,
  onSave,
  onClose,
}: {
  course: Course;
  onSave: (course: Course) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(course.name);
  const [code, setCode] = useState(course.code);
  const [credits, setCredits] = useState(course.credits);
  const [term, setTerm] = useState(course.term || "");
  const [instructor, setInstructor] = useState(course.instructor || "");
  const [notes, setNotes] = useState(course.notes || "");

  return (
    <Overlay onClose={onClose}>
      <ModalBox title={`Edit · ${course.code}`} onClose={onClose} wide>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px 16px",
            marginBottom: 16,
          }}
        >
          <div style={{ gridColumn: "1/-1" }}>
            <Label>Course Name</Label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <Label>Code</Label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <Label>Credits</Label>
            <input
              value={credits}
              onChange={(e) => setCredits(parseFloat(e.target.value || "0"))}
              type="number"
              step="0.5"
              style={inputStyle}
            />
          </div>
          <div>
            <Label>Term</Label>
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Fall / Winter / TBD"
              style={inputStyle}
            />
          </div>
          <div>
            <Label>Instructor</Label>
            <input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        <Label>
          Reasoning / Notes <span style={{ color: C.gold, fontWeight: 700 }}>●</span>
        </Label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Why do you want / not want this course? Any caveats, scheduling conflicts, instructor notes..."
          style={{
            ...inputStyle,
            height: 90,
            resize: "vertical",
            fontFamily: "Inter,sans-serif",
            fontSize: 13,
          }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn
            primary
            onClick={() =>
              onSave({
                ...course,
                name,
                code,
                credits: parseFloat(String(credits)),
                term,
                instructor,
                notes,
              })
            }
          >
            Save
          </Btn>
        </div>
      </ModalBox>
    </Overlay>
  );
}

// Shared modal chrome
const Overlay = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,42,92,0.3)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(2px)",
    }}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const ModalBox = ({
  title,
  children,
  onClose,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) => (
  <div
    style={{
      background: C.white,
      borderRadius: 4,
      padding: 28,
      width: wide ? 440 : 360,
      boxShadow: "0 8px 40px rgba(0,42,92,0.18)",
      border: `1px solid ${C.outline}`,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <h3
        style={{
          margin: 0,
          color: C.blue,
          fontSize: 15,
          fontFamily: "'Source Serif 4',Georgia,serif",
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: C.muted,
          fontSize: 20,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 10,
      color: C.muted,
      fontFamily: "Inter,sans-serif",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
    }}
  >
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: `1px solid ${C.outline}`,
  borderRadius: 4,
  padding: "8px 10px",
  fontSize: 13,
  fontFamily: "Inter,sans-serif",
  color: C.ink,
  outline: "none",
  boxSizing: "border-box",
  background: C.white,
  transition: "border-color 0.15s",
};

const Btn = ({
  children,
  onClick,
  primary,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      background: primary ? C.blue : danger ? "#ba1a1a" : C.white,
      border: `1px solid ${primary ? C.blue : danger ? "#ba1a1a" : C.outline}`,
      color: primary || danger ? C.white : C.ink,
      padding: "8px 16px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "Inter,sans-serif",
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    }}
  >
    {children}
  </button>
);

// Main App
export default function CourseTiermaker() {
  const [tiers, setTiers] = useState<Tier[]>(() =>
    readStorage<Tier[]>(STORAGE_KEYS.tiers, cloneDefaultTiers()),
  );
  const [placements, setPlacements] = useState<Record<string, string>>(() =>
    readStorage<Record<string, string>>(STORAGE_KEYS.placements, {}),
  );
  const [pool, setPool] = useState<Course[]>(() =>
    readStorage<Course[]>(STORAGE_KEYS.pool, []),
  );
  const [overZone, setOverZone] = useState<string | null>(null);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [draggingCode, setDraggingCode] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importError, setImportError] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [saveWarning, setSaveWarning] = useState<string>("");
  const [nowTick, setNowTick] = useState(Date.now());
  const fileRef = useRef<HTMLInputElement>(null);
  const isEmbedded =
    typeof window !== "undefined" && window.self !== window.top;

  const getTierItems = (id: string) => pool.filter((c) => placements[c.code] === id);
  const getUnranked = () => pool.filter((c) => !placements[c.code]);

  const handleDrop = useCallback(
    (tierId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const code = e.dataTransfer.getData("courseCode");
      if (code) setPlacements((p) => ({ ...p, [code]: tierId }));
      setOverZone(null);
      setDraggingCode(null);
    },
    [],
  );

  const handleDropPool = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const code = e.dataTransfer.getData("courseCode");
    if (code)
      setPlacements((p) => {
        const n = { ...p };
        delete n[code];
        return n;
      });
    setOverZone(null);
    setDraggingCode(null);
  }, []);

  const handleImport = () => {
    setImportError("");
    try {
      const data = JSON.parse(jsonText);
      const arr = data.courses || data;
      if (!Array.isArray(arr)) throw new Error("Expected 'courses' array");
      setPool(
        arr.map((c, i) => ({
          code: c.code || `COURSE-${i}`,
          name: c.name || "Untitled",
          credits: c.credits ?? 0.5,
          term: c.term || "",
          instructor: c.instructor || "",
          notes: c.notes || "",
        })),
      );
      setPlacements({});
      setShowImport(false);
      setJsonText("");
    } catch (err) {
      setImportError(
        `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setJsonText(String(ev.target?.result || ""));
    r.readAsText(f);
  };

  const handleExport = () => {
    const out = {
      tiers: tiers.map((t) => ({ ...t, courses: getTierItems(t.id) })),
      unranked: getUnranked(),
      exportedAt: new Date().toISOString(),
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(out, null, 2)], { type: "application/json" }),
    );
    a.download = `course-tiers-${Date.now()}.json`;
    a.click();
  };

  const saveTier = (id: string, label: string, color: string) => {
    setTiers((p) => p.map((t) => (t.id === id ? { ...t, label, color } : t)));
    setEditingTier(null);
  };

  const deleteTier = (id: string) => {
    setPlacements((p) => {
      const n = { ...p };
      Object.keys(n).forEach((k) => {
        if (n[k] === id) delete n[k];
      });
      return n;
    });
    setTiers((p) => p.filter((t) => t.id !== id));
    setEditingTier(null);
  };

  const addTier = (refId: string, pos: "above" | "below") => {
    const t = { id: `tier-${uid++}`, label: "NEW", color: C.teal };
    setTiers((p) => {
      const a = [...p];
      const i = a.findIndex((x) => x.id === refId);
      a.splice(pos === "above" ? i : i + 1, 0, t);
      return a;
    });
    setEditingTier(null);
  };

  const moveTier = (id: string, dir: "up" | "down") => {
    setTiers((p) => {
      const a = [...p];
      const i = a.findIndex((t) => t.id === id);
      const j = dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= a.length) return p;
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  };

  const saveCourse = (updated: Course) => {
    setPool((p) => p.map((c) => (c.code === updated.code ? updated : c)));
    setEditingCourse(null);
  };

  const editTierData = tiers.find((t) => t.id === editingTier);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.pool, JSON.stringify(pool));
      localStorage.setItem(STORAGE_KEYS.tiers, JSON.stringify(tiers));
      localStorage.setItem(STORAGE_KEYS.placements, JSON.stringify(placements));
      setLastSavedAt(Date.now());
      setSaveWarning("");
    } catch {
      setSaveWarning("Save failed (localStorage may be full).");
    }
  }, [pool, tiers, placements]);

  useEffect(() => {
    const timerId = window.setInterval(() => setNowTick(Date.now()), 15000);
    return () => window.clearInterval(timerId);
  }, []);

  const saveStatusText = useMemo(() => {
    if (saveWarning) return saveWarning;
    if (!lastSavedAt) return "Not saved yet";
    const diff = nowTick - lastSavedAt;
    if (diff < 15000) return "Saved just now";
    return `Last saved ${new Date(lastSavedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }, [lastSavedAt, nowTick, saveWarning]);

  const handleClearAll = () => {
    const confirmed = window.confirm("Are you sure? This cannot be undone.");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEYS.pool);
    localStorage.removeItem(STORAGE_KEYS.tiers);
    localStorage.removeItem(STORAGE_KEYS.placements);
    setPool([]);
    setTiers(cloneDefaultTiers());
    setPlacements({});
    setOverZone(null);
    setEditingTier(null);
    setEditingCourse(null);
    setDraggingCode(null);
    setJsonText("");
    setImportError("");
    setShowImport(false);
    setLastSavedAt(null);
    setSaveWarning("");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.gray, fontFamily: "Inter,sans-serif" }}>
      {/* Top bar */}
      <div
        style={{
          background: C.blue,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 3, height: 28, background: C.gold }} />
          <div>
            <div
              style={{
                color: C.white,
                fontFamily: "'Source Serif 4',Georgia,serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: -0.2,
                whiteSpace: "nowrap",
              }}
            >
              Course Tiermaker
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 9,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              MI UXD · iSchool
            </div>
            <div
              style={{
                color: saveWarning ? "#FFD200" : "rgba(255,255,255,0.7)",
                fontSize: 9,
                letterSpacing: 0.6,
                marginTop: 2,
                whiteSpace: "nowrap",
              }}
            >
              {saveStatusText}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <HBtn onClick={() => setShowImport((s) => !s)} sky>
            ↑ Import JSON
          </HBtn>
          <HBtn
            outline
            onClick={() => {
              setPool(SAMPLE.courses);
              setPlacements({});
            }}
          >
            Sample
          </HBtn>
          <HBtn gold onClick={handleExport}>
            ↓ Export
          </HBtn>
          <HBtn danger onClick={handleClearAll}>
            Clear
          </HBtn>
        </div>
      </div>

      {/* Import panel */}
      {showImport && (
        <div
          style={{
            background: C.white,
            borderBottom: `1px solid ${C.outline}`,
            padding: "16px 24px",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <Label>Paste JSON or upload file</Label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder={`{ "courses": [{ "code": "INF2260H", "name": "Speculative Design", "credits": 0.5, "term": "Winter", "instructor": "TBD", "notes": "" }] }`}
              style={{
                ...inputStyle,
                height: 100,
                display: "block",
                marginBottom: 8,
                fontSize: 12,
                fontFamily: "monospace",
                resize: "vertical",
              }}
            />
            {importError && (
              <div style={{ color: C.error, fontSize: 11, marginBottom: 8 }}>
                {importError}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <Btn primary onClick={handleImport}>
                Import
              </Btn>
              <label style={{ display: "inline-block" }}>
                <Btn onClick={() => fileRef.current?.click()}>Upload file</Btn>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              <Btn onClick={() => setShowImport(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          padding: "20px 24px",
          maxWidth: isEmbedded ? "none" : 1100,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Tiers */}
        <div style={{ marginBottom: 4 }}>
          {tiers.map((tier, i) => (
            <TierRow
              key={tier.id}
              tier={tier}
              items={getTierItems(tier.id)}
              draggingCode={draggingCode}
              isOver={overZone === tier.id}
              isFirst={i === 0}
              isLast={i === tiers.length - 1}
              onDrop={handleDrop(tier.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverZone(tier.id);
              }}
              onDragLeave={() => setOverZone(null)}
              onEditTier={setEditingTier}
              onMoveUp={() => moveTier(tier.id, "up")}
              onMoveDown={() => moveTier(tier.id, "down")}
              onCardClick={setEditingCourse}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setTiers((p) => [...p, { id: `tier-${uid++}`, label: "NEW", color: C.muted }])
          }
          style={{
            width: "100%",
            background: "none",
            border: `1px dashed ${C.outline}`,
            color: C.muted,
            padding: 8,
            cursor: "pointer",
            borderRadius: 4,
            fontSize: 12,
            marginBottom: 24,
            fontFamily: "Inter,sans-serif",
            letterSpacing: 1,
          }}
        >
          + Add Tier
        </button>

        {/* Pool */}
        <div style={{ borderTop: `2px solid ${C.gold}`, paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: 600,
              }}
            >
              Unranked Pool
            </div>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 600 }}>
              {pool.length - getUnranked().length} ranked · {getUnranked().length} left
            </div>
          </div>
          <div
            onDrop={handleDropPool}
            onDragOver={(e) => {
              e.preventDefault();
              setOverZone("pool");
            }}
            onDragLeave={() => setOverZone(null)}
            style={{
              minHeight: 80,
              background: overZone === "pool" ? "#EEF4FB" : C.white,
              border: `1px solid ${overZone === "pool" ? C.teal : C.outline}`,
              borderRadius: 4,
              padding: 10,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              transition: "all 0.15s",
            }}
          >
            {pool.length === 0 && (
              <div
                style={{
                  color: C.outline,
                  fontSize: 12,
                  alignSelf: "center",
                  width: "100%",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Import JSON to add courses ↑ · or click Sample
              </div>
            )}
            {getUnranked().map((c) => (
              <CourseCard
                key={c.code}
                course={c}
                isDragging={draggingCode === c.code}
                onDragStart={(e) => {
                  e.dataTransfer.setData("courseCode", c.code);
                  setDraggingCode(c.code);
                }}
                onDragEnd={() => setDraggingCode(null)}
                onClick={() => setEditingCourse(c)}
              />
            ))}
            {pool.length > 0 && getUnranked().length === 0 && (
              <div style={{ color: C.outline, fontSize: 12, alignSelf: "center", fontStyle: "italic" }}>
                All courses ranked — drag back here to unrank
              </div>
            )}
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 6, fontStyle: "italic" }}>
            <span style={{ color: C.gold, fontWeight: 700 }}>●</span> = has reasoning note · click any card to edit or add notes
          </div>
          <div
            style={{
              fontSize: 10,
              color: C.outline,
              marginTop: 20,
              paddingTop: 12,
              borderTop: `1px solid ${C.outline}`,
              textAlign: "center",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Inspired by{" "}
            <a
              href="https://tiermaker.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: C.muted, textDecoration: "underline" }}
            >
              tiermaker.com
            </a>{" "}
            · built for UofT iSchool MI course planning
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingTier && editTierData && (
        <TierModal
          tier={editTierData}
          onSave={(l, c) => saveTier(editingTier, l, c)}
          onDelete={() => deleteTier(editingTier)}
          onAddAbove={() => addTier(editingTier, "above")}
          onAddBelow={() => addTier(editingTier, "below")}
          onClose={() => setEditingTier(null)}
        />
      )}
      {editingCourse && (
        <CourseModal
          course={editingCourse}
          onSave={saveCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}
    </div>
  );
}

const HBtn = ({
  children,
  onClick,
  gold,
  outline,
  sky,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  gold?: boolean;
  outline?: boolean;
  sky?: boolean;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      background: gold
        ? C.gold
        : sky
          ? "#38bdf8"
          : danger
            ? C.error
            : outline
              ? "transparent"
              : C.white,
      border: `1px solid ${
        gold
          ? C.gold
          : sky
            ? "#38bdf8"
            : danger
              ? C.error
              : outline
                ? "rgba(255,255,255,0.3)"
                : C.white
      }`,
      color: gold || sky ? C.blue : C.white,
      padding: "5px 14px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      fontFamily: "Inter,sans-serif",
    }}
  >
    {children}
  </button>
);
