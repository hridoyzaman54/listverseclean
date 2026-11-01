import React from 'react';
import { PollOption } from '../data/articles';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'movies' | 'games';
  onTabChange: (tab: 'movies' | 'games') => void;
  options: PollOption[];
  votedId: string | null;
  onVote: (id: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  options,
  votedId,
  onVote,
}) => {
  if (!isOpen) return null;

  const totalVotes = options.reduce((acc, item) => acc + item.votes, 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-canvas-base rounded-xl border border-surface-border shadow-xl max-w-xl w-full p-space-lg flex flex-col gap-space-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-border pb-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">how_to_vote</span>
            <div>
              <span className="font-label-tag text-label-tag uppercase text-secondary block">
                Live Community Poll Leaderboard
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                People&apos;s Choice: 90s Mind-Benders
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close leaderboard"
            className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-surface-border">
          <button
            onClick={() => onTabChange('movies')}
            className={`flex-1 py-1.5 rounded-md font-button-text text-button-text transition-all cursor-pointer ${
              activeTab === 'movies'
                ? 'bg-canvas-base text-primary font-bold shadow-sm'
                : 'text-slate-muted hover:text-on-surface'
            }`}
          >
            90s Movies Division
          </button>
          <button
            onClick={() => onTabChange('games')}
            className={`flex-1 py-1.5 rounded-md font-button-text text-button-text transition-all cursor-pointer ${
              activeTab === 'games'
                ? 'bg-canvas-base text-primary font-bold shadow-sm'
                : 'text-slate-muted hover:text-on-surface'
            }`}
          >
            90s Games Division
          </button>
        </div>

        <div className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {options.map((item, idx) => {
            const share = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;
            const isVoted = votedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-canvas-subtle rounded-lg p-3 border border-surface-border flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded text-[12px] font-bold flex items-center justify-center shrink-0 ${
                        idx === 0
                          ? 'bg-primary/15 text-primary'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-headline-sm text-[14px] font-bold text-slate-charcoal truncate">
                        {item.title}
                      </p>
                      <p className="font-label-meta text-[11px] text-slate-muted">
                        {item.directorOrStudio}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onVote(item.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded text-[12px] font-button-text transition-colors shrink-0 cursor-pointer ${
                      isVoted
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container-lowest border border-surface-border hover:bg-primary hover:text-on-primary text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                    {isVoted ? 'Voted' : 'Vote'}
                  </button>
                </div>
                <div className="w-full bg-surface-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`${item.barColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${share}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-label-meta text-slate-muted font-semibold">
                  <span>{share}% share</span>
                  <span>{item.votes.toLocaleString()} votes</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-border text-[12px] font-label-meta text-slate-muted">
          <span>Total Division Votes: {totalVotes.toLocaleString()}</span>
          <span className="text-secondary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            Poll closes in 2 days
          </span>
        </div>
      </div>
    </div>
  );
};
