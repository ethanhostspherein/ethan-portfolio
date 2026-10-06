import React from "react";
import DesktopIcon from "./DesktopIcon";
import { asset } from "./assets";
import {
  Sparkles,
  UserRound,
  Folder,
  Mountain,
  Lightbulb,
  FileText,
  Send,
  ArrowRight,
  Compass,
  ChartNoAxesColumnIncreasing,
  ArrowUpRight,
  LayoutGrid,
  HardDrive,
  Search,
  NotebookPen,
  Minus,
  Plus,
  Mail,
  SquarePen,
  Download,
  Terminal,
  Wifi,
  BatteryFull,
  Keyboard,
  ExternalLink,
  Layers,
  Sun,
  Link,
  Sprout,
  Moon,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
const Icons = {
  Sparkles,
  UserRound,
  Folder,
  Mountain,
  Lightbulb,
  FileText,
  Send,
  ArrowRight,
  Compass,
  ChartNoAxesColumnIncreasing,
  ArrowUpRight,
  LayoutGrid,
  HardDrive,
  Search,
  NotebookPen,
  Minus,
  Plus,
  Mail,
  SquarePen,
  Download,
  Terminal,
  Wifi,
  BatteryFull,
  Keyboard,
  ExternalLink,
  Layers,
  Sun,
  Link,
  Sprout,
  Moon,
  RotateCcw,
  SlidersHorizontal,
};
export function Icon({ name, size = 20, ...props }) {
  const Component = Icons[name] || Icons.Sparkles;
  return <Component size={size} strokeWidth={1.7} {...props} />;
}
export function AppIcon({ app, small = false, desktop = false }) {
  const artwork = {
    about: "contacts", work: "finder", journey: "safari", ideas: "tips",
    writing: "notes", contact: "mail", resume: "preview", terminal: "terminal",
    settings: "settings", apps: "apps",
    life: "photos", games: "games",
  }[app.id];
  return (
    <span
      className={`app-icon native-icon ${app.color} ${small ? "small" : ""}`}
    >
      {!artwork ? (
        <DesktopIcon type={desktop && app.id !== "resume" ? "work" : app.id} />
      ) : (
        <img className="macos-app-art" src={asset(`macos/${artwork}.png`)} alt="" width="60" height="60" draggable="false" decoding="async" />
      )}
    </span>
  );
}
