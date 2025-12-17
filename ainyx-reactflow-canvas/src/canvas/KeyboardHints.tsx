export function KeyboardHints() {
  return (
    <div className="absolute bottom-4 right-4 z-10 rounded-md border bg-background px-3 py-2 shadow-sm">
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <Hint label="S" text="Add Service" />
        <Hint label="D" text="Add Database" />
        <Hint label="F" text="Fit View" />
      </div>
    </div>
  );
}

function Hint({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <kbd className="flex h-5 w-5 items-center justify-center rounded border bg-muted font-mono text-[10px]">
        {label}
      </kbd>
      <span>{text}</span>
    </div>
  );
}
