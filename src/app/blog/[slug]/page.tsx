import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HiArrowLeft, HiCalendar, HiClock, HiUser } from 'react-icons/hi2';

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="pt-6 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors group"
        >
          <HiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Main Container Card */}
      <div className="card-elevated p-6 sm:p-10">
        {/* Post Metadata Header */}
        <header className="mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-3 text-xs text-muted mb-4 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <HiCalendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <HiClock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <HiUser className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Structured Body Renderer */}
        <section className="space-y-6">
          {post.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-muted leading-relaxed"
                  >
                    {block.text}
                  </p>
                );

              case 'heading2':
                return (
                  <h2
                    key={index}
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground pt-4 mb-2 flex items-center gap-2"
                  >
                    <span className="w-1 h-6 rounded-full bg-primary inline-block" />
                    {block.text}
                  </h2>
                );

              case 'heading3':
                return (
                  <h3
                    key={index}
                    className="text-base sm:text-lg font-bold text-foreground pt-2 mb-2"
                  >
                    {block.text}
                  </h3>
                );

              case 'list':
                return (
                  <ul
                    key={index}
                    className="list-disc pl-5 sm:pl-6 space-y-2.5 my-4 text-sm sm:text-base text-muted"
                  >
                    {block.items?.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
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
                            <th key={idx} className="p-3 sm:p-4 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted">
                        {block.rows?.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-surface/50 transition-colors"
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 sm:p-4">
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
      </div>
    </article>
  );
}
