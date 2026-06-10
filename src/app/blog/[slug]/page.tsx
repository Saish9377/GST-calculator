import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HiArrowLeft, HiCalendar, HiClock, HiUser, HiListBullet } from 'react-icons/hi2';
import { ShareButtons } from '@/components/blog/ShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} — GST Calculator India`,
    description: post.description,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function MiniCardThumbnail({ category }: { category: string }) {
  let gradient = 'from-indigo-600 to-blue-500';
  let icon = '💡';
  
  if (category === 'Updates') {
    gradient = 'from-purple-600 to-indigo-500';
    icon = '⚡';
  } else if (category === 'Compliance') {
    gradient = 'from-emerald-600 to-teal-500';
    icon = '⚖️';
  } else if (category === 'Education') {
    gradient = 'from-cyan-600 to-blue-500';
    icon = '🎓';
  } else if (category === 'Tax Rates') {
    gradient = 'from-blue-600 to-teal-500';
    icon = '📊';
  }

  return (
    <div className={`relative h-32 w-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:12px_12px]" />
      <span className="text-3xl filter drop-shadow-md select-none">{icon}</span>
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related articles (same category or others, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <>
      {/* Dynamic Hero Article Banner */}
      <section className="relative overflow-hidden border-b border-border py-10 md:py-14 bg-surface/30">
        {/* Glow Highlights */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-secondary/5 blur-[90px] pointer-events-none" />
        
        {/* Custom CSS Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button inside banner */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted hover:text-primary transition-colors group"
            >
              <HiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </div>

          <div className="max-w-4xl">
            {/* Category Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-primary/15 text-primary border border-primary/20 mb-4">
              {post.category}
            </span>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            {/* Author and Date Meta Row */}
            <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
              <span className="flex items-center gap-1">
                <HiCalendar className="w-4 h-4 text-primary" />
                {post.date}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <HiClock className="w-4 h-4 text-secondary" />
                {post.readTime}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <HiUser className="w-4 h-4 text-indigo-400" />
                By {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky Table of Contents (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            <div className="card p-5 glass">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2 pb-2 border-b border-border">
                <HiListBullet className="w-4 h-4 text-primary" />
                Table of Contents
              </h3>
              <nav className="space-y-1 pl-1">
                {post.content.map((block, index) => {
                  if (block.type !== 'heading2' && block.type !== 'heading3') return null;
                  const isH2 = block.type === 'heading2';
                  return (
                    <a
                      key={index}
                      href={`#heading-${index}`}
                      className={`block text-xs leading-relaxed transition-all duration-200 hover:text-primary border-l-2 border-transparent hover:border-primary/50 hover:pl-3 text-muted ${
                        isH2 
                          ? 'font-semibold text-muted/90 pl-2 py-1' 
                          : 'pl-4 text-muted/70 text-[11px] py-0.5'
                      }`}
                    >
                      {block.text}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="card p-5 glass">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 pb-2 border-b border-border">
                Share Article
              </h3>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </aside>

          {/* RIGHT COLUMN: Article Content Container */}
          <main className="col-span-12 lg:col-span-9 space-y-8">
            <article className="card-elevated p-6 sm:p-10">
              
              {/* Mobile Table of Contents (Collapsible outline at top of post body) */}
              <div className="lg:hidden bg-surface-elevated/40 border border-border rounded-xl p-5 mb-8">
                <details className="group">
                  <summary className="flex items-center justify-between font-bold text-sm text-foreground cursor-pointer select-none">
                    <span className="flex items-center gap-2">
                      <HiListBullet className="w-4 h-4 text-primary" />
                      Table of Contents
                    </span>
                    <span className="text-xs text-muted group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <nav className="mt-4 pl-3 border-l-2 border-primary/20 space-y-2.5">
                    {post.content.map((block, index) => {
                      if (block.type !== 'heading2' && block.type !== 'heading3') return null;
                      const isH2 = block.type === 'heading2';
                      return (
                        <a
                          key={index}
                          href={`#heading-${index}`}
                          className={`block text-xs leading-relaxed text-muted hover:text-primary ${
                            isH2 ? 'font-semibold text-muted/90' : 'pl-3 text-muted/70'
                          }`}
                        >
                          {block.text}
                        </a>
                      );
                    })}
                  </nav>
                </details>
              </div>

              {/* Body Content with Upgraded Premium Typography */}
              <section className="space-y-6 text-muted text-sm sm:text-base leading-relaxed sm:leading-loose">
                {post.content.map((block, index) => {
                  const headingId = `heading-${index}`;
                  switch (block.type) {
                    case 'paragraph':
                      return (
                        <p key={index} className="text-muted/90 leading-relaxed sm:leading-loose font-normal">
                          {block.text}
                        </p>
                      );

                    case 'heading2':
                      return (
                        <h2
                          key={index}
                          id={headingId}
                          className="scroll-mt-24 text-xl sm:text-2xl font-bold text-foreground pt-6 pb-2 border-b border-border/50 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-6 rounded-full bg-primary inline-block" />
                          {block.text}
                        </h2>
                      );

                    case 'heading3':
                      return (
                        <h3
                          key={index}
                          id={headingId}
                          className="scroll-mt-24 text-base sm:text-lg font-bold text-foreground pt-4 mb-2"
                        >
                          {block.text}
                        </h3>
                      );

                    case 'list':
                      return (
                        <ul
                          key={index}
                          className="list-disc pl-5 sm:pl-6 space-y-3.5 my-4 text-muted/90 leading-relaxed"
                        >
                          {block.items?.map((item, idx) => (
                            <li key={idx}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      );

                    case 'table':
                      return (
                        <div
                          key={index}
                          className="overflow-x-auto my-6 rounded-xl border border-border shadow-sm max-w-full"
                        >
                          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px]">
                            <thead className="bg-surface-elevated text-foreground font-semibold border-b border-border">
                              <tr>
                                {block.headers?.map((h, idx) => (
                                  <th key={idx} className="p-3.5 sm:p-4 whitespace-nowrap">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-muted/90">
                              {block.rows?.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="hover:bg-surface/30 transition-colors"
                                >
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3.5 sm:p-4">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </section>

              {/* Mobile Share Buttons (Visible at bottom of article only on mobile/tablet) */}
              <div className="lg:hidden mt-10 pt-6 border-t border-border flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Share this article
                </span>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </article>

            {/* Related Articles Section */}
            <section className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-secondary inline-block" />
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group card overflow-hidden flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-200"
                  >
                    <MiniCardThumbnail category={rPost.category} />
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
                        {rPost.category}
                      </span>
                      <h4 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {rPost.title}
                      </h4>
                      <span className="text-[10px] text-muted mt-auto flex items-center gap-1">
                        <HiClock className="w-3 h-3" />
                        {rPost.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
