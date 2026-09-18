import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, GUIDES } from "@/lib/guides";
import type { Metadata } from "next";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}/` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = GUIDES.filter(
    (g) => g.slug !== slug && g.category === guide.category
  )
    .concat(GUIDES.filter((g) => g.slug !== slug && g.category !== guide.category))
    .slice(0, 3);

  return (
    <div>
      {/* Title band */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-xs font-semibold text-slate-500 mb-5 uppercase tracking-wide">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/guides" className="hover:text-teal-400">Guides</Link>
          </nav>
          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-4">
            {guide.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight max-w-3xl">
            {guide.title}
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl">{guide.description}</p>
          <p className="mt-4 text-xs text-slate-500">
            {guide.readTime} · checked against NHS guidance ·{" "}
            {guide.lastReviewed}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="rounded-xl border border-stone-200 bg-white p-6 md:p-10">
              <div className="article-body">
                <div
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(guide.content) }}
                />
              </div>

              <div className="mt-10 pt-6 border-t border-stone-100 rounded-lg bg-stone-50 p-4 text-xs text-stone-500 leading-relaxed">
                <strong className="text-stone-700">A note on this guide:</strong>{" "}
                last reviewed {guide.lastReviewed}. It offers general
                information for UK patients and is no substitute for advice from
                a clinician who can actually see you — when in doubt, ring 111,
                and in an emergency, 999.
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-5">
              <h2 className="text-sm font-extrabold text-rose-900 mb-1.5">
                Reading in an emergency?
              </h2>
              <p className="text-xs text-rose-800 leading-relaxed">
                Stop and dial <strong>999</strong>. For urgent help that
                isn&apos;t life-threatening, <strong>111</strong> is free and
                open around the clock.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide mb-3">
                Keep reading
              </h2>
              <div className="space-y-2">
                {related.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="block p-3 rounded-lg bg-stone-50 hover:bg-teal-50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-stone-800 leading-snug">
                      {g.title}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">{g.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 p-5">
              <h2 className="text-sm font-extrabold text-white mb-2">
                Check a live queue
              </h2>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Theory is useful — the actual wait at your nearest department is
                better.
              </p>
              <Link
                href="/near-me"
                className="block text-center rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-teal-400 transition-colors"
              >
                Departments near me
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // single-asterisk emphasis; must run after the bold pass
    .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      out.push("<ul>");
      while (i < lines.length && lines[i].startsWith("- ")) {
        out.push(`<li>${inlineFormat(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push("</ul>");
      continue;
    }

    const olMatch = line.match(/^(\d+)\. (.+)/);
    if (olMatch) {
      out.push("<ol>");
      while (i < lines.length) {
        const m = lines[i].match(/^(\d+)\. (.+)/);
        if (!m) break;
        out.push(`<li>${inlineFormat(m[2])}</li>`);
        i++;
      }
      out.push("</ol>");
      continue;
    }

    out.push(`<p>${inlineFormat(line)}</p>`);
    i++;
  }

  return out.join("\n");
}
