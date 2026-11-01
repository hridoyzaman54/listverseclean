import React, { useEffect, useMemo, useState } from 'react';
import {
  Article,
  ARTICLES,
  EDITOR_AVATAR_URL,
  INITIAL_POLL_GAMES,
  INITIAL_POLL_MOVIES,
  PollOption,
  TagStyle,
} from './data/articles';
import { ArticleReaderView } from './components/ArticleReaderView';
import { SubmitListView } from './components/SubmitListView';
import { LeaderboardModal } from './components/LeaderboardModal';

type ActiveScreen =
  | { type: 'home' }
  | { type: 'article'; articleId: string }
  | { type: 'submit'; tab: 'submit' | 'guidelines' | 'about' };

type TaxonomyFilter =
  | 'ALL CATEGORIES'
  | 'GAMING'
  | 'FILM & MOVIES'
  | 'BIZARRE'
  | 'SCIENCE & NATURE'
  | 'SOCIETY & WEIRD';

function getTagClasses(style: TagStyle): string {
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

export default function App() {
  const [screen, setScreen] = useState<ActiveScreen>({ type: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<TaxonomyFilter>('ALL CATEGORIES');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [feedSort, setFeedSort] = useState<'popular' | 'recent'>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Poll states
  const [pollTab, setPollTab] = useState<'movies' | 'games'>('movies');
  const [moviePoll, setMoviePoll] = useState<PollOption[]>(INITIAL_POLL_MOVIES);
  const [gamePoll, setGamePoll] = useState<PollOption[]>(INITIAL_POLL_GAMES);
  const [votedMovieId, setVotedMovieId] = useState<string | null>('matrix-1999');
  const [votedGameId, setVotedGameId] = useState<string | null>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  // Bookmarks, Newsletter & Toast
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['mathematical-geniuses']);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const target = ARTICLES.find((a) => a.id === id);
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed "${target?.title || 'list'}" from saved bookmarks`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved "${target?.title || 'list'}" to your reading list`);
        return [...prev, id];
      }
    });
  };

  const handleShare = (title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    showToast(`Link copied for "${title}"`);
  };

  const handleOpenArticle = (article: Article, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setScreen({ type: 'article', articleId: article.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomArticle = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const randomIndex = Math.floor(Math.random() * ARTICLES.length);
    const chosen = ARTICLES[randomIndex];
    setScreen({ type: 'article', articleId: chosen.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Surprise List: ${chosen.title}`);
  };

  const handleGoHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setScreen({ type: 'home' });
    setSelectedCategory('ALL CATEGORIES');
    setSelectedChannel(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVote = (optionId: string) => {
    if (pollTab === 'movies') {
      if (votedMovieId === optionId) return;
      setMoviePoll((prev) =>
        prev.map((opt) => {
          if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
          if (opt.id === votedMovieId) return { ...opt, votes: Math.max(0, opt.votes - 1) };
          return opt;
        })
      );
      setVotedMovieId(optionId);
      const picked = moviePoll.find((o) => o.id === optionId);
      if (picked) showToast(`Voted for ${picked.title} in People's Choice Poll!`);
    } else {
      if (votedGameId === optionId) return;
      setGamePoll((prev) =>
        prev.map((opt) => {
          if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
          if (opt.id === votedGameId) return { ...opt, votes: Math.max(0, opt.votes - 1) };
          return opt;
        })
      );
      setVotedGameId(optionId);
      const picked = gamePoll.find((o) => o.id === optionId);
      if (picked) showToast(`Voted for ${picked.title} in People's Choice Poll!`);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    showToast(`Subscribed ${newsletterEmail} to AZVerse Daily Factoids!`);
    setNewsletterEmail('');
  };

  const activePollOptions = pollTab === 'movies' ? moviePoll : gamePoll;
  const activeVotedId = pollTab === 'movies' ? votedMovieId : votedGameId;
  const totalPollVotes = activePollOptions.reduce((sum, item) => sum + item.votes, 0);

  // Sections for the default Front Page
  const mainLead = ARTICLES.find((a) => a.section === 'main-lead')!;
  const secondaryLeads = ARTICLES.filter((a) => a.section === 'secondary-lead');
  const quickReads = useMemo(() => {
    const base = ARTICLES.filter((a) => a.section === 'quick-read');
    return feedSort === 'recent' ? [...base].reverse() : base;
  }, [feedSort]);

  const featureFeedArticles = useMemo(() => {
    const base = ARTICLES.filter((a) => a.section === 'feature-feed');
    if (currentPage === 2) {
      return ARTICLES.filter((a) => a.section === 'gaming-showcase');
    }
    if (currentPage === 3) {
      return ARTICLES.filter((a) => a.section === 'film-showcase');
    }
    if (currentPage > 3) {
      return [...base].reverse();
    }
    return feedSort === 'recent' ? [...base].reverse() : base;
  }, [feedSort, currentPage]);

  const editorPicks = ARTICLES.filter((a) => a.section === 'editor-pick');
  const gamingShowcase = ARTICLES.filter((a) => a.section === 'gaming-showcase');
  const filmShowcase = ARTICLES.filter((a) => a.section === 'film-showcase');

  // Filtered articles when a category pill, nav channel, or search query is active
  const isFilteredView =
    selectedCategory !== 'ALL CATEGORIES' ||
    selectedChannel !== null ||
    searchQuery.trim().length > 0;

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      if (selectedCategory !== 'ALL CATEGORIES' && article.filterTag !== selectedCategory) {
        return false;
      }
      if (selectedChannel && article.channel.toLowerCase() !== selectedChannel.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.author.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedChannel, searchQuery]);

  const activeArticle =
    screen.type === 'article'
      ? ARTICLES.find((a) => a.id === screen.articleId) || mainLead
      : null;

  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-charcoal text-surface-bright px-4 py-2.5 rounded-lg shadow-lg border border-outline-variant/20 flex items-center gap-2 font-button-text text-button-text animate-fade-in">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Saved Bookmarks Drawer */}
      {bookmarksDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
          onClick={() => setBookmarksDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-surface-container-lowest h-full shadow-xl border-l border-surface-border p-space-lg flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-space-md overflow-y-auto">
              <div className="flex items-center justify-between border-b border-surface-border pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">bookmark</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Saved Reading List ({bookmarkedArticles.length})
                  </h2>
                </div>
                <button
                  onClick={() => setBookmarksDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {bookmarkedArticles.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center gap-2 text-slate-muted">
                  <span className="material-symbols-outlined text-[36px]">bookmark_border</span>
                  <p className="font-body-sm text-body-sm">
                    No lists bookmarked yet. Click the bookmark icon on any countdown to save it for offline reading.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-space-sm">
                  {bookmarkedArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        setBookmarksDrawerOpen(false);
                        handleOpenArticle(art);
                      }}
                      className="p-space-sm rounded-lg bg-canvas-subtle hover:bg-surface-container-low border border-surface-border flex items-center gap-space-sm cursor-pointer group"
                    >
                      <img
                        src={art.image}
                        alt={art.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-md object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-label-tag text-[10px] text-primary uppercase block">
                          {art.tagLabel}
                        </span>
                        <h3 className="font-headline-sm text-[14px] text-on-surface group-hover:text-primary line-clamp-2">
                          {art.title}
                        </h3>
                        <span className="font-label-meta text-[11px] text-slate-muted">
                          {art.author} • {art.readTime}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleToggleBookmark(art.id, e)}
                        aria-label="Remove bookmark"
                        className="p-1.5 text-slate-muted hover:text-error cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setBookmarksDrawerOpen(false)}
              className="w-full py-2 bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary-container transition-colors cursor-pointer"
            >
              Continue Reading
            </button>
          </div>
        </div>
      )}

      {/* Full Leaderboard Modal */}
      <LeaderboardModal
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        activeTab={pollTab}
        onTabChange={setPollTab}
        options={activePollOptions}
        votedId={activeVotedId}
        onVote={handleVote}
      />

      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1280px] mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <a
              className="flex items-center"
              href="#home"
              onClick={handleGoHome}
            >
              <span className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                AZ<span className="bg-gradient-to-tr from-[#D24D33] via-[#39ADC6] to-[#7BB352] bg-clip-text text-transparent font-extrabold">V</span>erse
              </span>
            </a>
            <span className="hidden xl:inline-block font-label-tag text-label-tag uppercase text-slate-muted bg-surface-container-low px-space-xs py-0.5 rounded-DEFAULT">
              Curious Lists
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-space-md">
            {(
              [
                'Bizarre',
                'Entertainment',
                'General Knowledge',
                'Lifestyle',
                'Science',
                'Society',
              ] as const
            ).map((channel) => {
              const isActive = selectedChannel === channel && screen.type === 'home';
              return (
                <a
                  key={channel}
                  href={`#${channel.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen({ type: 'home' });
                    setSelectedCategory('ALL CATEGORIES');
                    setSelectedChannel(isActive ? null : channel);
                  }}
                  className={`font-button-text text-button-text transition-colors ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {channel}
                </a>
              );
            })}
            <a
              className="font-button-text text-button-text text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-xs"
              href="#submit"
              onClick={(e) => {
                e.preventDefault();
                setScreen({ type: 'submit', tab: 'submit' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              More
            </a>
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            <div className="relative hidden md:block w-48 xl:w-60">
              <div className="absolute inset-y-0 left-0 pl-space-sm flex items-center pointer-events-none text-slate-muted">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </div>
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (screen.type !== 'home') setScreen({ type: 'home' });
                }}
                className="w-full pl-9 pr-space-sm py-1.5 bg-canvas-subtle rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-slate-muted focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Search 10,000+ lists..."
                type="search"
              />
            </div>

            <a
              className="hidden sm:inline-flex items-center gap-space-xs px-space-sm py-1.5 bg-secondary text-on-secondary rounded-lg font-button-text text-button-text hover:bg-secondary-container hover:text-on-secondary transition-colors"
              href="#random-list"
              onClick={handleRandomArticle}
            >
              <span className="material-symbols-outlined text-[16px]">casino</span>
              <span className="hidden xl:inline">Random</span>
            </a>

            <a
              className="hidden sm:inline-flex items-center px-space-sm py-1.5 bg-primary-container text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary transition-colors"
              href="#newsletter-box"
              onClick={(e) => {
                e.preventDefault();
                if (screen.type !== 'home') {
                  setScreen({ type: 'home' });
                  setTimeout(() => {
                    document
                      .getElementById('newsletter-box')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('newsletter-box')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Subscribe
            </a>

            <button
              aria-label="Search lists"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              aria-label="Saved Reading List"
              onClick={() => setBookmarksDrawerOpen(true)}
              className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              {bookmarkedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-on-secondary font-label-tag text-[10px] flex items-center justify-center">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-gutter pb-space-sm bg-surface-container-lowest border-t border-surface-border">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (screen.type !== 'home') setScreen({ type: 'home' });
              }}
              className="w-full px-3 py-2 bg-canvas-subtle rounded-lg border border-surface-border font-body-sm text-body-sm text-on-surface placeholder:text-slate-muted focus:outline-none"
              placeholder="Search 10,000+ lists..."
              type="search"
            />
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        {screen.type === 'article' && activeArticle ? (
          <ArticleReaderView
            article={activeArticle}
            isBookmarked={bookmarkedIds.includes(activeArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onShare={handleShare}
            onSelectArticle={handleOpenArticle}
            onBackHome={() => setScreen({ type: 'home' })}
            onOpenSubmitList={() => {
              setScreen({ type: 'submit', tab: 'submit' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : screen.type === 'submit' ? (
          <SubmitListView
            initialTab={screen.tab}
            onBackHome={() => setScreen({ type: 'home' })}
          />
        ) : (
          <div className="flex flex-col w-full">
            {/* Topic Sub-Bar & Filter Controls */}
            <section className="w-full bg-surface-container-lowest shadow-sm">
              <div className="max-w-[1280px] mx-auto px-gutter py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
                {/* Taxonomy Filters */}
                <div className="flex items-center gap-space-xs overflow-x-auto py-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL CATEGORIES');
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-all cursor-pointer ${
                      selectedCategory === 'ALL CATEGORIES'
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    ALL CATEGORIES
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === 'GAMING' ? 'ALL CATEGORIES' : 'GAMING'
                      );
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-colors cursor-pointer ${
                      selectedCategory === 'GAMING'
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-tag-weird-bg text-tag-weird-text hover:bg-secondary-fixed'
                    }`}
                  >
                    GAMING
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === 'FILM & MOVIES' ? 'ALL CATEGORIES' : 'FILM & MOVIES'
                      );
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-colors cursor-pointer ${
                      selectedCategory === 'FILM & MOVIES'
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-tag-history-bg text-tag-history-text hover:bg-primary-fixed'
                    }`}
                  >
                    FILM &amp; MOVIES
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === 'BIZARRE' ? 'ALL CATEGORIES' : 'BIZARRE'
                      );
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-colors cursor-pointer ${
                      selectedCategory === 'BIZARRE'
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    BIZARRE
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === 'SCIENCE & NATURE'
                          ? 'ALL CATEGORIES'
                          : 'SCIENCE & NATURE'
                      );
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-colors cursor-pointer ${
                      selectedCategory === 'SCIENCE & NATURE'
                        ? 'bg-tertiary text-on-tertiary shadow-sm'
                        : 'bg-tag-nature-bg text-tag-nature-text hover:bg-tertiary-fixed'
                    }`}
                  >
                    SCIENCE &amp; NATURE
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === 'SOCIETY & WEIRD'
                          ? 'ALL CATEGORIES'
                          : 'SOCIETY & WEIRD'
                      );
                      setSelectedChannel(null);
                    }}
                    className={`px-3 py-1 rounded-full font-label-tag text-label-tag transition-colors cursor-pointer ${
                      selectedCategory === 'SOCIETY & WEIRD'
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-tag-creepy-bg text-tag-creepy-text hover:bg-surface-container-high'
                    }`}
                  >
                    SOCIETY &amp; WEIRD
                  </button>
                </div>

                {/* Quick Toggles */}
                <div className="flex items-center gap-space-sm">
                  <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg text-on-surface-variant">
                    <button
                      id="filter-popular"
                      onClick={() => setFeedSort('popular')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-button-text text-button-text transition-colors cursor-pointer ${
                        feedSort === 'popular'
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'hover:text-on-surface'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                      Popular
                    </button>
                    <button
                      id="filter-recent"
                      onClick={() => setFeedSort('recent')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-button-text text-button-text transition-colors cursor-pointer ${
                        feedSort === 'recent'
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      Recent
                    </button>
                  </div>
                  <a
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-button-text text-button-text hover:bg-secondary-container transition-all shadow-sm"
                    href="#random"
                    onClick={handleRandomArticle}
                  >
                    <span className="material-symbols-outlined text-[16px]">casino</span>
                    <span>Surprise Me</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Filtered Channel / Search Banner if active */}
            {isFilteredView && (
              <section className="max-w-[1280px] mx-auto px-gutter pt-space-lg pb-space-sm w-full">
                <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-border flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Showing {filteredArticles.length} Curated Lists
                      {selectedCategory !== 'ALL CATEGORIES' ? ` in ${selectedCategory}` : ''}
                      {selectedChannel ? ` • Channel: ${selectedChannel}` : ''}
                      {searchQuery.trim() ? ` matching "${searchQuery}"` : ''}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL CATEGORIES');
                      setSelectedChannel(null);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-surface-container-low hover:bg-surface-container-high font-button-text text-[12px] text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                    Reset to Full Front Page
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md mt-space-md">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      onClick={(e) => handleOpenArticle(art, e)}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-surface-container">
                        <img
                          alt={art.imageAlt}
                          src={art.image}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-tag text-label-tag uppercase ${getTagClasses(
                            art.tagStyle
                          )}`}
                        >
                          {art.tagLabel}
                        </span>
                      </div>
                      <div className="p-space-md flex flex-col gap-1 flex-1 justify-between">
                        <div>
                          <div className="font-label-meta text-label-meta text-slate-muted flex items-center gap-1">
                            <span>{art.author}</span>
                            <span>•</span>
                            <span>{art.readTime}</span>
                          </div>
                          <h3 className="font-headline-sm text-[16px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2 mt-1">
                            <a href={`#${art.id}`} onClick={(e) => handleOpenArticle(art, e)}>
                              {art.title}
                            </a>
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center justify-between text-primary font-button-text text-[12px]">
                          <span className="inline-flex items-center gap-1">
                            Read countdown{' '}
                            <span className="material-symbols-outlined text-[14px]">
                              arrow_forward
                            </span>
                          </span>
                          <span className="text-slate-muted font-label-tag text-[10px]">
                            10 ENTRIES
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Editorial Spotlight Banner / Lead Stories Grid */}
            {!isFilteredView && (
              <section className="max-w-[1280px] mx-auto px-gutter pt-space-lg pb-space-md w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                  {/* Main Lead Banner (7 Cols) */}
                  <article
                    onClick={(e) => handleOpenArticle(mainLead, e)}
                    className="lg:col-span-7 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between cursor-pointer"
                  >
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
                      <img
                        alt="Halloween Facts with a Dark Side"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        src={mainLead.image}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md font-label-tag text-label-tag uppercase tracking-wider bg-secondary text-on-secondary shadow-sm">
                          {mainLead.tagLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded font-label-tag text-label-tag bg-slate-charcoal/80 text-surface-bright backdrop-blur-sm">
                          {mainLead.badgeSecondary}
                        </span>
                      </div>
                    </div>
                    <div className="p-space-lg flex flex-col gap-space-xs">
                      <div className="flex items-center gap-2 font-label-meta text-label-meta text-slate-muted">
                        <span>By {mainLead.author}</span>
                        <span>•</span>
                        <span>{mainLead.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          {mainLead.readsCount}
                        </span>
                      </div>
                      <h1 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
                        <a href={`#${mainLead.id}`} onClick={(e) => handleOpenArticle(mainLead, e)}>
                          {mainLead.title}
                        </a>
                      </h1>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                        {mainLead.excerpt}
                      </p>
                    </div>
                  </article>

                  {/* Twin Secondary Lead Grid (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-space-md justify-between">
                    {secondaryLeads.map((sec) => (
                      <article
                        key={sec.id}
                        onClick={(e) => handleOpenArticle(sec, e)}
                        className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row lg:flex-row h-full cursor-pointer"
                      >
                        <div className="sm:w-2/5 lg:w-5/12 relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-surface-container">
                          <img
                            alt={sec.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            src={sec.image}
                          />
                          <span
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-tag text-label-tag uppercase ${getTagClasses(
                              sec.tagStyle
                            )}`}
                          >
                            {sec.tagLabel}
                          </span>
                        </div>
                        <div className="p-space-md sm:w-3/5 lg:w-7/12 flex flex-col justify-center gap-1">
                          <div className="font-label-meta text-label-meta text-slate-muted flex items-center gap-1">
                            <span>{sec.author}</span>
                            <span>•</span>
                            <span>{sec.shortDate}</span>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            <a href={`#${sec.id}`} onClick={(e) => handleOpenArticle(sec, e)}>
                              {sec.title}
                            </a>
                          </h2>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                            {sec.excerpt}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 3-Column Magazine Core Grid */}
            <section
              id="core-magazine-grid"
              className="max-w-[1280px] mx-auto px-gutter py-space-md w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                {/* LEFT COLUMN: Trending & Fast Bites (3 Cols / 25%) */}
                <aside className="lg:col-span-3 flex flex-col gap-space-md">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 bg-transparent">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Trending Quick-Reads
                      </h2>
                    </div>
                    <span className="font-label-meta text-label-meta text-slate-muted">
                      TOP 10s
                    </span>
                  </div>

                  {/* Quick Reads Stack */}
                  <div className="flex flex-col gap-space-sm">
                    {quickReads.map((item) => (
                      <article
                        key={item.id}
                        onClick={(e) => handleOpenArticle(item, e)}
                        className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-space-sm group cursor-pointer"
                      >
                        <span className="font-list-rank-number text-list-rank-number text-secondary/30 group-hover:text-secondary shrink-0 transition-colors w-7 text-center">
                          {item.quickRank}
                        </span>
                        <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 bg-surface-container">
                          <img
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            referrerPolicy="no-referrer"
                            src={item.image}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`font-label-tag text-label-tag uppercase block truncate ${
                              item.tagStyle === 'weird'
                                ? 'text-tag-weird-text'
                                : item.tagStyle === 'history'
                                ? 'text-tag-history-text'
                                : 'text-tag-creepy-text'
                            }`}
                          >
                            {item.tagLabel}
                          </span>
                          <h3 className="font-headline-sm text-[15px] leading-tight text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            <a href={`#${item.id}`} onClick={(e) => handleOpenArticle(item, e)}>
                              {item.title}
                            </a>
                          </h3>
                          <p className="font-label-meta text-[11px] text-slate-muted mt-0.5">
                            {item.shortDate} • {item.readTime}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Curated List Statistics Widget */}
                  <div className="bg-surface-container-low p-space-md rounded-xl mt-space-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-tag text-label-tag uppercase text-slate-muted">
                        Weekly Trivia Pulse
                      </span>
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        insights
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display-hero text-[32px] leading-none font-extrabold text-on-surface">
                          14,280
                        </p>
                        <p className="font-label-meta text-label-meta text-slate-muted mt-1">
                          Curated Factoids Published
                        </p>
                      </div>
                      <div className="w-16 h-8 text-primary">
                        <svg
                          className="w-full h-full stroke-current fill-none stroke-2"
                          viewBox="0 0 64 32"
                        >
                          <path d="M 0 24 Q 16 28, 24 14 T 44 18 T 64 6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* People's Choice Poll Box */}
                  <div className="bg-canvas-base p-space-md rounded-xl border border-surface-border flex flex-col gap-space-sm shadow-sm antialiased">
                    <div className="flex items-center justify-between pb-1 border-b border-surface-border">
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        <span className="font-label-tag text-label-tag uppercase tracking-wider text-secondary font-bold">
                          Community Vote
                        </span>
                      </div>
                      <span className="font-label-meta text-[11px] text-slate-muted flex items-center gap-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          how_to_vote
                        </span>{' '}
                        Live
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-headline-sm text-[16px] font-bold text-slate-charcoal leading-tight">
                        People&apos;s Choice Poll
                      </h3>
                      <p className="font-body-sm text-[13px] text-on-surface-variant font-medium leading-snug">
                        Which 90s mind-bender deserves the #1 legacy spot?
                      </p>
                    </div>

                    <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg text-on-surface-variant text-[12px] font-button-text border border-surface-border">
                      <button
                        id="poll-tab-movies"
                        onClick={() => setPollTab('movies')}
                        className={`flex-1 py-1 text-center rounded-md transition-all cursor-pointer ${
                          pollTab === 'movies'
                            ? 'bg-canvas-base text-primary font-bold shadow-sm'
                            : 'hover:text-on-surface text-slate-muted font-semibold'
                        }`}
                      >
                        Movies
                      </button>
                      <button
                        id="poll-tab-games"
                        onClick={() => setPollTab('games')}
                        className={`flex-1 py-1 text-center rounded-md transition-all cursor-pointer ${
                          pollTab === 'games'
                            ? 'bg-canvas-base text-primary font-bold shadow-sm'
                            : 'hover:text-on-surface text-slate-muted font-semibold'
                        }`}
                      >
                        Games
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      {activePollOptions.map((option, idx) => {
                        const share =
                          totalPollVotes > 0
                            ? Math.round((option.votes / totalPollVotes) * 100)
                            : 0;
                        const isSelected = activeVotedId === option.id;
                        return (
                          <div
                            key={option.id}
                            className="relative bg-canvas-subtle hover:bg-surface-container-low rounded-lg p-2.5 transition-colors border border-surface-border flex flex-col gap-1.5"
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  className={`w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${
                                    idx === 0
                                      ? 'bg-primary/10 text-primary'
                                      : 'bg-surface-container-high text-on-surface-variant'
                                  }`}
                                >
                                  #{idx + 1}
                                </span>
                                <span className="font-headline-sm text-[13px] font-bold text-slate-charcoal truncate">
                                  {option.title}
                                </span>
                              </div>
                              <button
                                onClick={() => handleVote(option.id)}
                                className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded text-[11px] font-button-text transition-colors shrink-0 cursor-pointer ${
                                  isSelected
                                    ? 'bg-primary text-on-primary font-bold hover:bg-primary-container shadow-sm'
                                    : 'bg-surface-container-lowest border border-surface-border hover:bg-primary hover:text-on-primary text-on-surface font-semibold'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  thumb_up
                                </span>{' '}
                                {isSelected ? 'Vote' : 'Vote'}
                              </button>
                            </div>
                            <div className="w-full bg-surface-border rounded-full h-2 overflow-hidden">
                              <div
                                className={`${option.barColor} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${share}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-label-meta text-slate-muted font-semibold">
                              <span>{share}% share</span>
                              <span>{option.votes.toLocaleString()} votes</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-surface-border flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-label-meta text-slate-muted font-semibold">
                        <span>Total: {totalPollVotes.toLocaleString()} votes</span>
                        <span className="flex items-center gap-0.5 text-secondary font-bold">
                          <span className="material-symbols-outlined text-[12px]">timer</span> 2
                          days left
                        </span>
                      </div>
                      <a
                        className="w-full py-2 px-2 bg-surface-container-low hover:bg-surface-container-high text-slate-charcoal text-center rounded-lg font-button-text text-[12px] font-bold border border-surface-border flex items-center justify-center gap-1 transition-colors shadow-sm"
                        href="#leaderboard"
                        onClick={(e) => {
                          e.preventDefault();
                          setLeaderboardOpen(true);
                        }}
                      >
                        <span>View Full Leaderboard</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </aside>

                {/* CENTER COLUMN: Main Editorial Feed (6 Cols / 50%) */}
                <div className="lg:col-span-6 flex flex-col gap-space-lg">
                  {/* Feed Section Header */}
                  <div className="flex items-center justify-between pb-2 bg-transparent">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Top 10 Feature Feed
                      </h2>
                    </div>
                    <span className="font-label-meta text-label-meta text-slate-muted">
                      Showing recent 10-point lists
                    </span>
                  </div>

                  {/* Feed List Articles */}
                  <div className="flex flex-col gap-space-lg">
                    {featureFeedArticles.map((card) => {
                      const isSaved = bookmarkedIds.includes(card.id);
                      return (
                        <article
                          key={card.id}
                          onClick={(e) => handleOpenArticle(card, e)}
                          className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                        >
                          <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
                            <img
                              alt={card.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              src={card.image}
                            />
                            <span
                              className={`absolute top-3 left-3 px-2.5 py-1 rounded-md font-label-tag text-label-tag uppercase tracking-wider shadow-sm ${getTagClasses(
                                card.tagStyle
                              )}`}
                            >
                              {card.tagLabel}
                            </span>
                          </div>
                          <div className="p-space-lg flex flex-col gap-space-xs">
                            <div className="flex items-center justify-between font-label-meta text-label-meta text-slate-muted">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-on-surface">{card.author}</span>
                                <span>•</span>
                                <span>{card.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-slate-muted">
                                <button
                                  type="button"
                                  aria-label="Bookmark list"
                                  onClick={(e) => handleToggleBookmark(card.id, e)}
                                  className={`p-1 rounded hover:bg-surface-container-low transition-colors cursor-pointer ${
                                    isSaved ? 'text-primary' : 'text-slate-muted'
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    {isSaved ? 'bookmark' : 'bookmark_border'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  aria-label="Share list"
                                  onClick={(e) => handleShare(card.title, e)}
                                  className="p-1 rounded hover:bg-surface-container-low transition-colors text-slate-muted cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    share
                                  </span>
                                </button>
                              </div>
                            </div>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
                              <a
                                href={`#${card.id}`}
                                onClick={(e) => handleOpenArticle(card, e)}
                              >
                                {card.title}
                              </a>
                            </h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                              {card.excerpt}
                            </p>
                            <div className="pt-space-xs flex items-center justify-between">
                              <a
                                className="inline-flex items-center gap-1 font-button-text text-button-text text-primary hover:text-on-primary-fixed-variant"
                                href={`#${card.id}`}
                                onClick={(e) => handleOpenArticle(card, e)}
                              >
                                Read full countdown{' '}
                                <span className="material-symbols-outlined text-[16px]">
                                  arrow_forward
                                </span>
                              </a>
                              <span className="font-label-tag text-label-tag text-slate-muted uppercase">
                                10 ENTRIES • {card.readTime.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Clean Pagination */}
                  <div className="flex items-center justify-between pt-space-md border-t-0">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            document
                              .getElementById('core-magazine-grid')
                              ?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-md flex items-center justify-center font-button-text text-button-text transition-colors cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-secondary text-on-secondary shadow-sm'
                              : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      <span className="w-9 h-9 flex items-center justify-center text-slate-muted font-button-text text-button-text">
                        ...
                      </span>
                      <button
                        onClick={() => {
                          setCurrentPage(1184);
                          document
                            .getElementById('core-magazine-grid')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-2 h-9 rounded-md flex items-center justify-center font-button-text text-button-text transition-colors cursor-pointer ${
                          currentPage === 1184
                            ? 'bg-secondary text-on-secondary shadow-sm'
                            : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        1,184
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => (prev >= 3 ? 1 : prev + 1));
                        document
                          .getElementById('core-magazine-grid')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-surface-container-lowest hover:bg-surface-container rounded-md font-button-text text-button-text text-on-surface shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Next Page</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Editor's Picks & Community Box (3 Cols / 25%) */}
                <aside className="lg:col-span-3 flex flex-col gap-space-md">
                  {/* Author / Editorial Spotlight */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-label-tag text-label-tag uppercase text-secondary">
                        Editorial Desk
                      </span>
                      <span className="material-symbols-outlined text-slate-muted text-[18px]">
                        verified
                      </span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-surface-container">
                        <img
                          alt="Jamie Frater - Head Editor"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          src={EDITOR_AVATAR_URL}
                        />
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                          Jamie Frater
                        </h3>
                        <p className="font-label-meta text-label-meta text-primary font-semibold">
                          Founder &amp; Head Editor
                        </p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Jamie founded AZVerse out of an insatiable curiosity for obscure lore,
                      unexplained mysteries, and bizarre trivia. A 5-time published author.
                    </p>
                    <a
                      className="inline-flex items-center gap-1 font-button-text text-button-text text-primary hover:text-on-primary-fixed-variant pt-1"
                      href="#about"
                      onClick={(e) => {
                        e.preventDefault();
                        setScreen({ type: 'submit', tab: 'about' });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span>More About Us</span>
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </a>
                  </div>

                  {/* Editor's Picks Curated Cards */}
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          Editor&apos;s Picks
                        </h2>
                      </div>
                      <span className="material-symbols-outlined text-tertiary text-[18px]">
                        recommend
                      </span>
                    </div>

                    {editorPicks.map((pick) => (
                      <article
                        key={pick.id}
                        onClick={(e) => handleOpenArticle(pick, e)}
                        className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                      >
                        <div className="relative aspect-video overflow-hidden bg-surface-container">
                          <img
                            alt={pick.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            src={pick.image}
                          />
                          <span
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-tag text-label-tag uppercase ${getTagClasses(
                              pick.tagStyle
                            )}`}
                          >
                            {pick.tagLabel}
                          </span>
                        </div>
                        <div className="p-space-sm flex flex-col gap-1">
                          <span className="font-label-meta text-label-meta text-slate-muted">
                            {pick.author}
                          </span>
                          <h3 className="font-headline-sm text-[16px] leading-snug text-on-surface group-hover:text-primary transition-colors">
                            <a href={`#${pick.id}`} onClick={(e) => handleOpenArticle(pick, e)}>
                              {pick.title}
                            </a>
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Sleek Daily Newsletter Box */}
                  <div
                    id="newsletter-box"
                    className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-border-subtle flex flex-col gap-space-sm relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-surface-border-subtle">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          mark_email_unread
                        </span>
                        <span className="font-label-tag text-label-tag text-primary uppercase tracking-wider">
                          Daily Newsletter
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded font-label-tag text-[11px] bg-tag-history-bg text-tag-history-text">
                        Free
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Get Daily Curated Factoids
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        Join 85,000+ curious readers receiving our handpicked top 10 countdowns
                        every morning.
                      </p>
                    </div>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-space-sm flex items-center pointer-events-none text-slate-muted">
                          <span className="material-symbols-outlined text-[16px]">mail</span>
                        </div>
                        <input
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="w-full pl-9 pr-space-sm py-2 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-slate-muted focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          placeholder={
                            newsletterSubscribed
                              ? 'You are subscribed!'
                              : 'Enter your email...'
                          }
                          required
                          type="email"
                        />
                      </div>
                      <button
                        className="w-full py-2 bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                        <span>{newsletterSubscribed ? 'Subscribed!' : 'Subscribe Free'}</span>
                      </button>
                    </form>
                    <div className="flex items-center justify-between text-[11px] font-label-meta text-slate-muted pt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-tertiary">
                          check_circle
                        </span>
                        No spam
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-tertiary">
                          lock
                        </span>
                        Unsubscribe anytime
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            {/* Bottom Showcase Sections: Gaming & Film */}
            <section className="max-w-[1280px] mx-auto px-gutter py-space-md w-full flex flex-col gap-space-xl">
              {/* Top 10 Gaming Showcase */}
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-2 border-b-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Top 10 Gaming Showcase
                    </h2>
                  </div>
                  <a
                    className="font-button-text text-button-text text-primary hover:text-on-primary-fixed-variant flex items-center gap-1"
                    href="#gaming"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('GAMING');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Explore All Gaming Lists{' '}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {gamingShowcase.map((game) => (
                    <article
                      key={game.id}
                      onClick={(e) => handleOpenArticle(game, e)}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-surface-container">
                        <img
                          alt={game.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          src={game.image}
                        />
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-tag text-label-tag uppercase ${getTagClasses(
                            game.tagStyle
                          )}`}
                        >
                          {game.tagLabel}
                        </span>
                      </div>
                      <div className="p-space-md flex flex-col gap-1">
                        <div className="font-label-meta text-label-meta text-slate-muted flex items-center gap-1">
                          <span>{game.author}</span>
                          <span>•</span>
                          <span>{game.readTime}</span>
                        </div>
                        <h3 className="font-headline-sm text-[16px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                          <a href={`#${game.id}`} onClick={(e) => handleOpenArticle(game, e)}>
                            {game.title}
                          </a>
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                          {game.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Top 10 Film & Cinema */}
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-2 border-b-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Top 10 Film &amp; Cinema
                    </h2>
                  </div>
                  <a
                    className="font-button-text text-button-text text-primary hover:text-on-primary-fixed-variant flex items-center gap-1"
                    href="#film"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('FILM & MOVIES');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    View All Film Lists{' '}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {filmShowcase.map((film) => (
                    <article
                      key={film.id}
                      onClick={(e) => handleOpenArticle(film, e)}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-surface-container">
                        <img
                          alt={film.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          src={film.image}
                        />
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-tag text-label-tag uppercase ${getTagClasses(
                            film.tagStyle
                          )}`}
                        >
                          {film.tagLabel}
                        </span>
                      </div>
                      <div className="p-space-md flex flex-col gap-1">
                        <div className="font-label-meta text-label-meta text-slate-muted flex items-center gap-1">
                          <span>{film.author}</span>
                          <span>•</span>
                          <span>{film.readTime}</span>
                        </div>
                        <h3 className="font-headline-sm text-[16px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                          <a href={`#${film.id}`} onClick={(e) => handleOpenArticle(film, e)}>
                            {film.title}
                          </a>
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                          {film.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] mt-space-xl">
        <div className="max-w-[1280px] mx-auto px-gutter py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none">
                    AZ<span className="bg-gradient-to-tr from-[#D24D33] via-[#39ADC6] to-[#7BB352] bg-clip-text text-transparent font-extrabold">V</span>erse
                  </span>
                  <span className="font-label-meta text-[11px] text-slate-muted uppercase tracking-wider mt-1">
                    Curious Top 10s
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
                Founded in 2007 by Jamie Frater, AZVerse is the original premier destination for
                fascinating, bizarre, and thought-provoking top 10 lists curated for curious minds.
              </p>
              <div className="flex items-center gap-space-sm">
                <a
                  className="inline-flex items-center gap-space-xs px-space-md py-2 bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary-container transition-colors"
                  href="#submit-a-list"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen({ type: 'submit', tab: 'submit' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Submit a List &amp; Earn $100
                </a>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant pt-space-xs">
                <span className="font-label-meta text-label-meta uppercase tracking-wider text-slate-muted">
                  Follow us:
                </span>
                <div className="flex items-center gap-space-xs">
                  <button
                    aria-label="RSS Feed"
                    onClick={() => showToast('AZVerse RSS Feed URL copied to clipboard')}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">rss_feed</span>
                  </button>
                  <button
                    aria-label="Newsletter Updates"
                    onClick={() => {
                      setScreen({ type: 'home' });
                      setTimeout(() => {
                        document
                          .getElementById('newsletter-box')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </button>
                  <button
                    aria-label="Community Discussions"
                    onClick={() => setLeaderboardOpen(true)}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                  </button>
                  <button
                    aria-label="Top Bookmarks"
                    onClick={() => setBookmarksDrawerOpen(true)}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface mb-space-md">
                Channels
              </h3>
              <ul className="flex flex-col gap-space-sm font-button-text text-button-text">
                {[
                  { label: 'Bizarre & Unexplained', filter: 'BIZARRE' as TaxonomyFilter },
                  { label: 'Entertainment & Media', filter: 'FILM & MOVIES' as TaxonomyFilter },
                  { label: 'General Knowledge', filter: 'ALL CATEGORIES' as TaxonomyFilter },
                  { label: 'Lifestyle & Culture', filter: 'SOCIETY & WEIRD' as TaxonomyFilter },
                  { label: 'Science & Nature', filter: 'SCIENCE & NATURE' as TaxonomyFilter },
                  { label: 'Society & History', filter: 'SOCIETY & WEIRD' as TaxonomyFilter },
                ].map((item) => (
                  <li key={item.label} className="flex items-center">
                    <a
                      className="text-on-surface-variant hover:text-on-surface transition-colors"
                      href={`#${item.label.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setScreen({ type: 'home' });
                        setSelectedCategory(item.filter);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface mb-space-md">
                Community
              </h3>
              <ul className="flex flex-col gap-space-sm font-button-text text-button-text">
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#submit-a-list"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'submit' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Submit a List ($100)
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#writer-guidelines"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'guidelines' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Writer Guidelines
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#comment-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'guidelines' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Comment Policy
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#hall-of-fame"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'about' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Hall of Fame Authors
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#newsletter"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'home' });
                      setTimeout(() => {
                        document
                          .getElementById('newsletter-box')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                  >
                    Daily Newsletter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface mb-space-md">
                About &amp; Legal
              </h3>
              <ul className="flex flex-col gap-space-sm font-button-text text-button-text">
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#about-jamie"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'about' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    About Jamie Frater
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#editorial-standards"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'guidelines' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Editorial Standards
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Privacy Policy: AZVerse never sells reader data.');
                    }}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Terms of Service: © 2007–2026 AZVerse Media Group Ltd.');
                    }}
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setScreen({ type: 'submit', tab: 'submit' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Contact &amp; Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-space-lg border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md font-label-meta text-label-meta text-slate-muted">
            <p>
              © 2007–2026 AZVerse Media Group Ltd. All rights reserved. AZVerse® is a registered
              trademark.
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              <a
                className="hover:text-primary transition-colors"
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Privacy Policy viewed');
                }}
              >
                Privacy Policy
              </a>
              <span className="text-slate-muted/50">•</span>
              <a
                className="hover:text-primary transition-colors"
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Terms of Service viewed');
                }}
              >
                Terms of Service
              </a>
              <span className="text-slate-muted/50">•</span>
              <a
                className="hover:text-primary transition-colors"
                href="#advertise"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Advertising inquiries: partnerships@azverse.com');
                }}
              >
                Advertise
              </a>
              <span className="text-slate-muted/50">•</span>
              <a
                className="hover:text-primary transition-colors"
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Cookie preferences saved');
                }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
