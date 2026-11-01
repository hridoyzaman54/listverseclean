import React, { useState } from 'react';
import { Article, ARTICLES, EDITOR_AVATAR_URL, getArticleEntries, TagStyle } from '../data/articles';

interface ArticleReaderViewProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShare: (title: string) => void;
  onSelectArticle: (article: Article) => void;
  onBackHome: () => void;
  onOpenSubmitList: () => void;
}

function getTagBadgeClasses(style: TagStyle): string {
  switch (style) {
    case 'weird':
      return 'bg-tag-weird-bg text-tag-weird-text';
    case 'history':
      return 'bg-tag-history-bg text-tag-history-text';
    case 'nature':
      return 'bg-tag-nature-bg text-tag-nature-text';
    case 'creepy':
      return 'bg-tag-creepy-bg text-tag-creepy-text';
    case 'secondary':
      return 'bg-secondary text-on-secondary';
  }
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onSelectArticle,
  onBackHome,
  onOpenSubmitList,
}) => {
  const entries = getArticleEntries(article);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [readerVote, setReaderVote] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Dr. Julian Vance',
      time: '3 hours ago',
      favoriteRank: 1,
      text: 'Entry #1 completely floored me. I had read tangentially about this in university archives, but seeing the full chronological context laid out here is brilliant.',
      likes: 42,
    },
    {
      id: 'c2',
      author: 'Clara M.',
      time: '5 hours ago',
      favoriteRank: 7,
      text: 'Number 7 sounds like something straight out of a gothic novel. Easily one of the best countdowns on AZVerse this month!',
      likes: 19,
    },
  ]);

  const displayedEntries = reverseOrder ? [...entries].reverse() : entries;
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 4);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        author: 'Curious Reader',
        time: 'Just now',
        favoriteRank: readerVote || 1,
        text: commentText.trim(),
        likes: 1,
      },
      ...comments,
    ]);
    setCommentText('');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-gutter py-space-lg w-full">
      {/* Breadcrumb & Reader Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-lg border-b border-surface-border">
        <div className="flex items-center gap-2 font-label-meta text-label-meta text-slate-muted">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-1 text-primary hover:underline font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Front Page
          </button>
          <span>•</span>
          <span className="uppercase tracking-wider">{article.channel}</span>
          <span>•</span>
          <span className="text-on-surface truncate max-w-xs sm:max-w-md">{article.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReverseOrder(!reverseOrder)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-border font-button-text text-[12px] text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">swap_vert</span>
            {reverseOrder ? 'Order: #1 to #10' : 'Countdown: #10 to #1'}
          </button>
          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border font-button-text text-[12px] transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-lowest text-on-surface border-surface-border hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            {isBookmarked ? 'Saved' : 'Save List'}
          </button>
          <button
            onClick={() => onShare(article.title)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-border font-button-text text-[12px] text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">share</span>
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Main 8-Column Article Countdown */}
        <article className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Article Hero Header */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-surface-border-subtle">
            <div className="relative w-full aspect-[16/9] bg-surface-container overflow-hidden">
              <img
                src={article.image}
                alt={article.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md font-label-tag text-label-tag uppercase tracking-wider shadow-sm ${getTagBadgeClasses(
                    article.tagStyle
                  )}`}
                >
                  {article.tagLabel}
                </span>
                {article.badgeSecondary && (
                  <span className="px-2 py-0.5 rounded font-label-tag text-label-tag bg-slate-charcoal/80 text-surface-bright backdrop-blur-sm">
                    {article.badgeSecondary}
                  </span>
                )}
              </div>
            </div>

            <div className="p-space-lg sm:p-8 flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-2 font-label-meta text-label-meta text-slate-muted">
                <span className="font-semibold text-on-surface">By {article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                {article.readsCount && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      {article.readsCount}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display-hero text-display-hero-mobile sm:text-display-hero text-on-surface">
                {article.title}
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {article.excerpt}
              </p>

              {/* Quick Jump Numbered Bar */}
              <div className="pt-2 border-t border-surface-border flex flex-wrap items-center gap-1.5">
                <span className="font-label-tag text-label-tag uppercase text-slate-muted mr-2">
                  Jump to Entry:
                </span>
                {entries.map((entry) => (
                  <a
                    key={entry.rank}
                    href={`#entry-${entry.rank}`}
                    className="w-8 h-8 rounded-md bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface font-button-text text-[13px] flex items-center justify-center transition-colors"
                  >
                    #{entry.rank}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 10 Countdown Entries */}
          <div className="flex flex-col gap-space-lg">
            {displayedEntries.map((entry) => (
              <section
                id={`entry-${entry.rank}`}
                key={entry.rank}
                className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-8 shadow-sm border border-surface-border-subtle flex flex-col gap-space-md scroll-mt-24"
              >
                <div className="flex items-start gap-space-md border-b border-surface-border pb-space-md">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-list-rank-number text-list-rank-number ${
                      entry.rank === 1
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-low text-primary'
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-label-tag text-label-tag uppercase text-slate-muted">
                      {entry.subtitle}
                    </span>
                    <h2 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface">
                      {entry.title}
                    </h2>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {entry.body}
                </p>

                {/* Verified Factoid Callout */}
                <div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm border border-surface-border">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-tag text-label-tag uppercase text-primary">
                      Curious Factoid #{entry.rank}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {entry.factoid}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setReaderVote(entry.rank)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-button-text text-[12px] transition-colors cursor-pointer ${
                      readerVote === entry.rank
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                    {readerVote === entry.rank
                      ? `Voted Most Fascinating (#${entry.rank})`
                      : `Vote #${entry.rank} Most Fascinating`}
                  </button>
                  <span className="font-label-meta text-label-meta text-slate-muted">
                    Entry {11 - entry.rank} of 10
                  </span>
                </div>
              </section>
            ))}
          </div>

          {/* Reader Discussion & Comments */}
          <section className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-8 shadow-sm border border-surface-border-subtle flex flex-col gap-space-md">
            <div className="flex items-center justify-between border-b border-surface-border pb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">forum</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Reader Discussion ({comments.length})
                </h3>
              </div>
              <span className="font-label-meta text-label-meta text-slate-muted">
                Moderated by AZVerse Editorial
              </span>
            </div>

            <form onSubmit={handleAddComment} className="flex flex-col gap-space-sm">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="Which entry on this list surprised you the most? Share a historical detail or thought..."
                className="w-full p-space-md bg-surface-container-low rounded-lg border border-surface-border font-body-sm text-body-sm text-on-surface placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex items-center justify-between">
                <span className="font-label-meta text-label-meta text-slate-muted">
                  {readerVote
                    ? `Attaching your vote for Entry #${readerVote}`
                    : 'Tip: Click "Vote Most Fascinating" on any entry above'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Post Comment
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-space-md pt-space-sm">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-space-md rounded-lg bg-canvas-subtle border border-surface-border flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-[14px] text-on-surface">
                        {c.author}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-tag-history-bg text-tag-history-text font-label-tag text-[10px] uppercase">
                        Picked #{c.favoriteRank}
                      </span>
                    </div>
                    <span className="font-label-meta text-label-meta text-slate-muted">
                      {c.time}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{c.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Right 4-Column Sticky Rail */}
        <aside className="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-24">
          {/* Author Card */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-border-subtle flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-tag text-label-tag uppercase text-secondary">
                About The Author
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            </div>
            <div className="flex items-center gap-space-sm">
              <img
                src={EDITOR_AVATAR_URL}
                alt={article.author}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover bg-surface-container"
              />
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {article.author}
                </h3>
                <p className="font-label-meta text-label-meta text-primary font-semibold">
                  {article.authorRole || 'AZVerse Contributing Writer'}
                </p>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Every AZVerse countdown is fact-checked against primary archival sources and peer-reviewed historical records.
            </p>
            <button
              onClick={onOpenSubmitList}
              className="w-full py-2 px-3 bg-secondary text-on-secondary rounded-lg font-button-text text-button-text hover:bg-secondary-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              Have a Curious List? Earn $100
            </button>
          </div>

          {/* Related Lists */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-border-subtle flex flex-col gap-space-sm">
            <div className="flex items-center gap-2 pb-1 border-b border-surface-border">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                More Curious Countdowns
              </h3>
            </div>
            <div className="flex flex-col gap-space-sm">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="flex items-center gap-space-sm p-1.5 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group"
                >
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-md object-cover shrink-0 bg-surface-container"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-label-tag text-[10px] text-primary uppercase block">
                      {rel.tagLabel}
                    </span>
                    <h4 className="font-headline-sm text-[14px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="font-label-meta text-[11px] text-slate-muted">
                      {rel.author} • {rel.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
