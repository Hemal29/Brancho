import { FileDown } from "lucide-react";

type Download = {
  slug: string;
  title: string;
  description: string;
  format: string;
  size: string;
  updated: string;
  pages: string;
};

type DownloadCardProps = {
  item: Download;
  index?: number;
};

const formatMap: Record<string, string> = {
  PDF: "bg-red-500/10 text-red-500",
  ZIP: "bg-blue-500/10 text-blue-500",
  PPTX: "bg-orange-500/10 text-orange-500",
};

export default function DownloadCard({ item, index = 0 }: DownloadCardProps) {
  return (
    <div
      className="group flex flex-col rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
      style={{ transitionDelay: `${index * 20}ms` }}
    >
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${
            formatMap[item.format] ?? "bg-secondary text-accent-deep"
          }`}
        >
          <FileDown size={13} />
          {item.format}
        </span>
        <span className="text-xs text-muted">{item.size}</span>
      </div>

      <h3 className="mt-6 font-heading text-xl font-semibold text-navy">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
        <div className="text-xs text-muted">
          <p>{item.pages}</p>
          <p className="mt-0.5">Updated {item.updated}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-all group-hover:bg-accent"
        >
          Download
        </button>
      </div>
    </div>
  );
}
