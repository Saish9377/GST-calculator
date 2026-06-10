'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { HiBookOpen, HiCalendar, HiClock, HiArrowRight, HiMagnifyingGlass } from 'react-icons/hi2';

const categories = ['All', 'Guides', 'Updates', 'Compliance', 'Education', 'Tax Rates'];

function CardThumbnail({ category }: { category: string }) {
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
    <div className={`relative h-48 w-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
      {/* Abstract Design Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_70%)]" />
      <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full border border-white/10" />
      <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full border border-white/5" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {/* Category Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
        <span className="text-4xl filter drop-shadow-md select-none">{icon}</span>
      </div>
    </div>
  );
}

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Blog Hero Header with Premium Grid & Mesh Gradients */}
      <section className="relative overflow-hidden border-b border-border py-12 md:py-16">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
        
        {/* Custom CSS Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 animate-float">
              <HiBookOpen className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              Tax Compliance & <span className="gradient-text">GST Blog</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Read the latest updates, compliance guides, HSN rate directories, and expert tax articles to help you navigate calculations and filings.
            </p>
          </div>
        </div>
      </section>

      {/* Main Search, Filter & Grid Area */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search Bar & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                      : 'bg-surface border border-border text-muted hover:text-foreground hover:bg-surface-elevated'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 card p-8 border-dashed border-2">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-foreground mb-1">No articles found</h3>
              <p className="text-sm text-muted max-w-xs mx-auto">
                We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; under Category &quot;{selectedCategory}&quot;.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="group card overflow-hidden flex flex-col h-full hover:translate-y-[-6px] hover:border-primary/30 hover:shadow-glow transition-all duration-300"
                >
                  {/* Thumbnail / Cover Image */}
                  <div className="relative overflow-hidden">
                    <CardThumbnail category={post.category} />
                    {/* Floating prominent badges */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-background/80 dark:bg-surface/90 text-foreground backdrop-blur-sm shadow-sm border border-border">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-primary text-white shadow-md">
                        <HiClock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-muted mb-3">
                      <HiCalendar className="w-4 h-4 text-primary" />
                      <span>{post.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                      <span>By {post.author}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-6 flex-1">
                      {post.description}
                    </p>

                    {/* Footer / Read More */}
                    <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors group/link"
                      >
                        Read Article
                        <HiArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
