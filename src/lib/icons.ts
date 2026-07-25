import {
  ShieldCheck,
  Sparkles,
  Clock3,
  UserCheck,
  ClipboardList,
  Calculator,
  FileCheck2,
  MessageSquareHeart,
  Database,
  ScrollText,
  Lock,
  FileSearch,
  SlidersHorizontal,
  Users,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/**
 * Named icon registry so CMS-editable content (Decap select-widget fields)
 * can reference an icon by string key instead of embedding React components.
 * Keep this list in sync with the `icon` select options in public/admin/config.yml.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  clock: Clock3,
  "user-check": UserCheck,
  "clipboard-list": ClipboardList,
  calculator: Calculator,
  "file-check": FileCheck2,
  "message-heart": MessageSquareHeart,
  database: Database,
  "scroll-text": ScrollText,
  lock: Lock,
  search: FileSearch,
  sliders: SlidersHorizontal,
  users: Users,
  "arrow-right": ArrowRight,
  "check-circle": CheckCircle2,
};

export function getIcon(name: string | undefined): LucideIcon {
  return (name && ICON_MAP[name]) || Sparkles;
}
