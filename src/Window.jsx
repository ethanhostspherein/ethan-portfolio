import React, { useRef, useState, useEffect } from "react";
export default function Window({
  win,
  title,
  children,
  onFront,
  onClose,
  onMinimize,
  onMaximize,
  active,
  mobile,
  onSwipe,
  hidden,
  onTile,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState(null);
  const resizing = useRef(null);
  const drag = useRef(null);
  const touch = useRef(null);
  const ref = useRef(null);
  useEffect(() => {
    const resize = () => {
      drag.current = null;
      resizing.current = null;
      setOffset({ x: 0, y: 0 });
      setDimensions((d) =>
        d
          ? {
              width: Math.max(420, Math.min(d.width, innerWidth * 0.8 - 100)),
              height: Math.max(280, Math.min(d.height, innerHeight * 0.75)),
            }
          : null,
      );
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (active && !hidden) {
      const target = ref.current?.querySelector("[data-autofocus]");
      target?.focus();
    }
  }, [active, hidden]);
  function start(e) {
    if (mobile || win.maximized || e.target.closest("button")) return;
    if (win.tile) {
      onTile(win.id, null);
      return;
    }
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function clamp(x, y) {
    const el = ref.current;
    return {
      x: Math.max(
        8 - el.offsetLeft - win.shift,
        Math.min(
          window.innerWidth - el.offsetWidth - el.offsetLeft - win.shift - 8,
          x,
        ),
      ),
      y: Math.max(
        44 - el.offsetTop - win.shift,
        Math.min(window.innerHeight - 130 - el.offsetTop - win.shift, y),
      ),
    };
  }
  function move(e) {
    if (drag.current)
      setOffset(clamp(e.clientX - drag.current.x, e.clientY - drag.current.y));
  }
  return (
    <section
      ref={ref}
      role="dialog"
      hidden={hidden}
      inert={hidden ? true : undefined}
      aria-label={title}
      className={`window ${win.tile ? `tile-${win.tile}` : ""} ${win.maximized ? "maximized" : ""} ${win.leaving ? "leaving" : ""} ${win.id === "terminal" ? "terminal-window" : ""} ${active ? "active" : ""}`}
      style={{
        zIndex: win.z,
        transform:
          win.maximized || mobile || win.tile
            ? undefined
            : `translate(${offset.x + win.shift}px,${offset.y + win.shift}px)`,
        width:
          dimensions && !win.maximized && !mobile && !win.tile
            ? dimensions.width
            : undefined,
        height:
          dimensions && !win.maximized && !mobile && !win.tile
            ? dimensions.height
            : undefined,
      }}
      onPointerDown={(e) => {
        onFront(win.id);
        if (mobile && !e.target.closest("input,textarea,button,a"))
          touch.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!touch.current) return;
        const dx = e.clientX - touch.current.x,
          dy = e.clientY - touch.current.y;
        if (mobile && Math.abs(dx) > 100 && Math.abs(dy) < 50)
          onSwipe(dx > 0 ? -1 : 1);
        touch.current = null;
      }}
      onPointerCancel={() => {
        touch.current = null;
      }}
    >
      <header
        className="window-bar"
        tabIndex={0}
        aria-label={`${title} window title bar. Control and arrow keys move the window.`}
        onKeyDown={(e) => {
          if (
            e.ctrlKey &&
            !mobile &&
            !win.maximized &&
            e.key.startsWith("Arrow")
          ) {
            e.preventDefault();
            setOffset((o) =>
              clamp(
                o.x +
                  (e.key === "ArrowRight"
                    ? 20
                    : e.key === "ArrowLeft"
                      ? -20
                      : 0),
                o.y +
                  (e.key === "ArrowDown" ? 20 : e.key === "ArrowUp" ? -20 : 0),
              ),
            );
          }
        }}
        onPointerDown={start}
        onPointerMove={move}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onPointerUp={(e) => {
          if (drag.current && e.clientX < 25) onTile(win.id, "left");
          else if (drag.current && e.clientX > innerWidth - 25)
            onTile(win.id, "right");
          else if (drag.current && e.clientY < 48) onMaximize(win.id);
          drag.current = null;
        }}
        onDoubleClick={(e) => {
          if (!e.target.closest("button")) onMaximize(win.id);
        }}
      >
        <div className="traffic-lights">
          <button
            className="close"
            aria-label={`Close ${title}`}
            onClick={() => onClose(win.id)}
          >
            ×
          </button>
          <button
            className="minimize"
            aria-label={`Minimize ${title}`}
            onClick={() => onMinimize(win.id)}
          >
            −
          </button>
          <div className="green-control">
            <button
              className="maximize"
              aria-label={`Maximize ${title}`}
              onClick={() => onMaximize(win.id)}
            >
              +
            </button>
            <div
              className="window-layout-menu"
              role="group"
              aria-label="Window layout"
            >
              <strong>Move & Resize</strong>
              <button onClick={() => onTile(win.id, "left")}>
                Left half <span>◧</span>
              </button>
              <button onClick={() => onTile(win.id, "right")}>
                Right half <span>◨</span>
              </button>
              <button onClick={() => onMaximize(win.id)}>
                Fill screen <span>□</span>
              </button>
              <button onClick={() => onTile(win.id, null)}>
                Floating window
              </button>
            </div>
          </div>
        </div>
        <span className="window-title">{title}</span>
      </header>
      <div className={`window-content content-${win.id}`}>{children}</div>
      {!mobile && !win.maximized && !win.tile && (
        <button
          className="resize-handle"
          aria-label={`Resize ${title}`}
          onPointerDown={(e) => {
            e.stopPropagation();
            const rect = ref.current.getBoundingClientRect();
            resizing.current = {
              x: e.clientX,
              y: e.clientY,
              width: rect.width,
              height: rect.height,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
            onFront(win.id);
          }}
          onPointerMove={(e) => {
            if (!resizing.current) return;
            const r = resizing.current,
              rect = ref.current.getBoundingClientRect();
            setDimensions({
              width: Math.max(
                420,
                Math.min(
                  innerWidth - rect.left - 12,
                  r.width + e.clientX - r.x,
                ),
              ),
              height: Math.max(
                280,
                Math.min(
                  innerHeight - rect.top - 105,
                  r.height + e.clientY - r.y,
                ),
              ),
            });
          }}
          onPointerUp={() => (resizing.current = null)}
          onPointerCancel={() => (resizing.current = null)}
          onKeyDown={(e) => {
            if (!e.key.startsWith("Arrow")) return;
            e.preventDefault();
            const rect = ref.current.getBoundingClientRect();
            setDimensions({
              width: Math.max(
                420,
                Math.min(
                  innerWidth - rect.left - 12,
                  rect.width +
                    (e.key === "ArrowRight"
                      ? 24
                      : e.key === "ArrowLeft"
                        ? -24
                        : 0),
                ),
              ),
              height: Math.max(
                280,
                Math.min(
                  innerHeight - rect.top - 105,
                  rect.height +
                    (e.key === "ArrowDown"
                      ? 24
                      : e.key === "ArrowUp"
                        ? -24
                        : 0),
                ),
              ),
            });
          }}
        >
          ◢
        </button>
      )}
    </section>
  );
}
