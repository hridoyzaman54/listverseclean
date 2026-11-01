import React, { useState } from 'react';
import { EDITOR_AVATAR_URL } from '../data/articles';

interface SubmitListViewProps {
  initialTab?: 'submit' | 'guidelines' | 'about';
  onBackHome: () => void;
}

export const SubmitListView: React.FC<SubmitListViewProps> = ({
  initialTab = 'submit',
  onBackHome,
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'guidelines' | 'about'>(initialTab);
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [category, setCategory] = useState('Weird Stuff');
  const [introSummary, setIntroSummary] = useState('');
  const [sampleEntryTitle, setSampleEntryTitle] = useState('');
  const [sampleEntryBody, setSampleEntryBody] = useState('');
  const [sourcesUrl, setSourcesUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-gutter py-space-lg w-full">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-lg border-b border-surface-border">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1 font-button-text text-button-text text-primary hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to AZVerse Front Page
        </button>

        <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-surface-border">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-3 py-1.5 rounded-md font-button-text text-button-text transition-colors cursor-pointer ${
              activeTab === 'submit'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Submit a List ($100)
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3 py-1.5 rounded-md font-button-text text-button-text transition-colors cursor-pointer ${
              activeTab === 'guidelines'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Writer Guidelines
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-md font-button-text text-button-text transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            About Jamie Frater & Editorial
          </button>
        </div>
      </div>

      {activeTab === 'submit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg sm:p-8 shadow-sm border border-surface-border-subtle">
            {submitted ? (
              <div className="py-space-xl flex flex-col items-center text-center gap-space-md">
                <div className="w-16 h-16 rounded-full bg-tag-nature-bg text-tag-nature-text flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Submission Received by Editorial Desk!
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                  Thank you, <strong className="text-on-surface">{authorName}</strong>. Your pitch{' '}
                  <strong className="text-primary">“{listTitle}”</strong> has been queued for review by Jamie Frater and our senior fact-checking team. We respond within 72 hours.
                </p>
                <div className="flex items-center gap-space-sm pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setListTitle('');
                      setIntroSummary('');
                      setSampleEntryTitle('');
                      setSampleEntryBody('');
                    }}
                    className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface font-button-text text-button-text hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Submit Another List
                  </button>
                  <button
                    onClick={onBackHome}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-button-text text-button-text hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Return to Front Page
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1 border-b border-surface-border pb-space-md">
                  <span className="font-label-tag text-label-tag uppercase text-secondary">
                    Contributor Portal • $100 Per Accepted List
                  </span>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">
                    Submit an Original Top 10 List
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Have a knack for uncovering obscure historical twists, scientific anomalies, or hidden pop-culture lore? Pitch your 10-point countdown below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-button-text text-button-text text-on-surface">
                      Your Byline Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g., Jana Louise Smit"
                      className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-button-text text-button-text text-on-surface">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="writer@example.com"
                      className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-button-text text-button-text text-on-surface">
                      Category Channel *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Weird Stuff</option>
                      <option>History</option>
                      <option>Humans & Science</option>
                      <option>Animals & Nature</option>
                      <option>Movies & TV</option>
                      <option>Gaming Lore</option>
                      <option>Creepy & Unexplained</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-button-text text-button-text text-on-surface">
                      PayPal / Payout Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="payouts@example.com"
                      className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-button-text text-button-text text-on-surface">
                    Proposed List Title (Must begin with “10...”) *
                  </label>
                  <input
                    type="text"
                    required
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    placeholder="e.g., 10 Forgotten Inventions That Nearly Changed Victorian London"
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-button-text text-button-text text-on-surface">
                    Editorial Hook / Introduction (2–3 Sentences) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={introSummary}
                    onChange={(e) => setIntroSummary(e.target.value)}
                    placeholder="Summarize the angle that makes your 10-point countdown unforgettable..."
                    className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="p-space-md rounded-lg bg-canvas-subtle border border-surface-border flex flex-col gap-space-sm">
                  <span className="font-label-tag text-label-tag uppercase text-primary">
                    Entry #1 Sample Showcase
                  </span>
                  <input
                    type="text"
                    required
                    value={sampleEntryTitle}
                    onChange={(e) => setSampleEntryTitle(e.target.value)}
                    placeholder="Entry #1 Headline (Your strongest factoid)"
                    className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    rows={4}
                    required
                    value={sampleEntryBody}
                    onChange={(e) => setSampleEntryBody(e.target.value)}
                    placeholder="Write 150–250 words detailing the historical context, twist, and verifiable proof..."
                    className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="url"
                    value={sourcesUrl}
                    onChange={(e) => setSourcesUrl(e.target.value)}
                    placeholder="Primary source link (Smithsonian, JSTOR, National Archives, etc.)"
                    className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-surface-border font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-end gap-space-sm pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-button-text text-button-text hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit List for $100 Review
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-border-subtle flex flex-col gap-space-sm">
              <span className="font-label-tag text-label-tag uppercase text-secondary">
                What Makes an AZVerse Hit?
              </span>
              <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong className="text-on-surface">Uncommon Angles:</strong> Don’t just list famous events—uncover the bizarre human detail behind them.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong className="text-on-surface">Primary Sources:</strong> Every entry must cite reputable books, academic journals, or major news archives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong className="text-on-surface">Countdown Pacing:</strong> Save your most jaw-dropping entry for the #1 spot.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-8 shadow-sm border border-surface-border-subtle max-w-3xl flex flex-col gap-space-md">
          <span className="font-label-tag text-label-tag uppercase text-primary">
            Editorial Standards & Style Guide
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            AZVerse Writer Guidelines
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Since 2007, AZVerse has paid writers $100 for every accepted 10-item countdown. Our readers expect a blend of journalistic rigor and irresistible curiosity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
            <div className="p-space-md rounded-lg bg-canvas-subtle border border-surface-border">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                1. Word Count & Structure
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Full lists should span 1,500 to 2,200 words total (roughly 150–200 words per entry), numbered in reverse order from #10 down to #1.
              </p>
            </div>
            <div className="p-space-md rounded-lg bg-canvas-subtle border border-surface-border">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                2. Fact-Checking Protocol
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Every factual claim must be backed by a verifiable link to peer-reviewed journals, university presses, or established newspapers of record.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-8 shadow-sm border border-surface-border-subtle max-w-3xl flex flex-col gap-space-md">
          <div className="flex items-center gap-space-md">
            <img
              src={EDITOR_AVATAR_URL}
              alt="Jamie Frater"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover bg-surface-container"
            />
            <div>
              <span className="font-label-tag text-label-tag uppercase text-secondary">
                Editorial Desk
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Jamie Frater</h1>
              <p className="font-label-meta text-label-meta text-primary font-semibold">
                Founder & Head Editor of AZVerse
              </p>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            Jamie Frater founded AZVerse in 2007 out of a lifelong fascination with obscure historical footnotes, lexicography, classical music, and the wonderfully weird corners of human endeavor. Over nearly two decades, AZVerse has published more than 14,280 curated lists read by millions of curious minds each month.
          </p>
        </div>
      )}
    </div>
  );
};
