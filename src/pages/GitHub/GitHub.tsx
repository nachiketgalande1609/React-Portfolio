import React, { useEffect, useRef, useState } from "react";
import "./GitHub.css";

interface GitHubProfile {
    login: string;
    name: string;
    bio: string;
    location: string;
    company: string | null;
    blog: string | null;
    twitter_username: string | null;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    created_at: string;
}

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    fork: boolean;
}

interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: { name: string; url: string };
    payload: {
        ref?: string;
        ref_type?: string;
        forkee?: { full_name: string };
        action?: string;
        issue?: { title: string };
        pull_request?: { title: string };
        commits?: { message: string }[];
    };
}

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionsData {
    contributions: ContributionDay[];
    total: Record<string, number>;
}

const LANG_COLORS: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#2b7489",
    JavaScript: "#f1e05a",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Shell: "#89e051",
    Ruby: "#701516",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Dart: "#00B4AB",
    Vue: "#41b883",
    SCSS: "#c6538c",
};

function getLangColor(lang: string): string {
    return LANG_COLORS[lang] ?? "#8b949e";
}

function relativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
}

function formatMemberSince(dateStr: string): string {
    const d = new Date(dateStr);
    return `Member since ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
}

function buildWeekGrid(contributions: ContributionDay[]): ContributionDay[][] {
    const byDate: Record<string, ContributionDay> = {};
    contributions.forEach((c) => { byDate[c.date] = c; });

    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = new Date(end);
    start.setDate(start.getDate() - 52 * 7 - end.getDay());

    const weeks: ContributionDay[][] = [];
    let week: ContributionDay[] = [];
    const cur = new Date(start);

    while (cur <= end) {
        const ds = cur.toISOString().slice(0, 10);
        week.push(byDate[ds] ?? { date: ds, count: 0, level: 0 });
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
        cur.setDate(cur.getDate() + 1);
    }
    if (week.length > 0) {
        while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
        weeks.push(week);
    }
    return weeks;
}


function describeEvent(event: GitHubEvent): string | null {
    const repo = event.repo.name;
    switch (event.type) {
        case "PushEvent":
            return `Pushed to ${repo}`;
        case "CreateEvent":
            return `Created ${event.payload.ref_type ?? "repository"} ${event.payload.ref ? `"${event.payload.ref}" in ` : ""}${repo}`;
        case "WatchEvent":
            return `Starred ${repo}`;
        case "ForkEvent":
            return `Forked ${repo}`;
        case "IssuesEvent":
            return `Opened issue on ${repo}`;
        case "PullRequestEvent":
            return `PR on ${repo}`;
        default:
            return null;
    }
}

function eventIcon(type: string): string {
    switch (type) {
        case "PushEvent": return "⬆️";
        case "CreateEvent": return "✨";
        case "WatchEvent": return "⭐";
        case "ForkEvent": return "🍴";
        case "IssuesEvent": return "🐛";
        case "PullRequestEvent": return "🔀";
        default: return "📌";
    }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ContributionHeatmap({ contributions, total, selectedYear }: { contributions: ContributionDay[]; total: number; selectedYear: string }) {
    const weeks = buildWeekGrid(contributions);

    return (
        <div className="heatmap-wrap">
            <div className="heatmap-month-row">
                {weeks.map((week, wi) => {
                    const firstDay = week.find((d) => d.date);
                    const m = firstDay ? new Date(firstDay.date).getMonth() : -1;
                    const prevFirst = wi > 0 ? weeks[wi - 1].find((d) => d.date) : null;
                    const prevM = prevFirst ? new Date(prevFirst.date).getMonth() : -1;
                    return (
                        <div key={wi} className="heatmap-month-cell">
                            {m !== -1 && m !== prevM ? MONTHS[m] : ""}
                        </div>
                    );
                })}
            </div>
            <div className="heatmap-grid">
                {weeks.map((week, wi) => (
                    <div key={wi} className="heatmap-week">
                        {week.map((day, di) => (
                            <div
                                key={di}
                                className="heatmap-day"
                                data-level={day.level}
                                title={day.date ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : ""}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="heatmap-footer">
                {total.toLocaleString()} contributions {selectedYear === "last" ? "in the last year" : `in ${selectedYear}`}
            </div>
            <div className="heatmap-legend">
                <span className="legend-label">Less</span>
                <div className="legend-squares">
                    {[0, 1, 2, 3, 4].map((l) => (
                        <div key={l} className="legend-square" data-level={l} />
                    ))}
                </div>
                <span className="legend-label">More</span>
            </div>
        </div>
    );
}

function LanguageBar({ repos }: { repos: GitHubRepo[] }) {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
        if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const totalCount = sorted.reduce((s, [, c]) => s + c, 0);

    return (
        <div className="lang-bar-wrap">
            <div className="lang-bar">
                {sorted.map(([lang, count]) => (
                    <div
                        key={lang}
                        className="lang-segment"
                        style={{ width: `${(count / totalCount) * 100}%`, background: getLangColor(lang) }}
                        title={`${lang}: ${Math.round((count / totalCount) * 100)}%`}
                    />
                ))}
            </div>
            <div className="lang-legend">
                {sorted.map(([lang, count]) => (
                    <div key={lang} className="lang-legend-item">
                        <div className="lang-legend-dot" style={{ background: getLangColor(lang) }} />
                        <span>{lang}</span>
                        <span className="lang-pct">{Math.round((count / totalCount) * 100)}%</span>
                        <span className="lang-count">{count} repo{count !== 1 ? "s" : ""}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AvatarWithFallback({ src, alt }: { src: string; alt: string }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return <div className="profile-avatar profile-avatar-fallback">NG</div>;
    }

    return (
        <img
            src={src}
            alt={alt}
            className="profile-avatar"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
        />
    );
}

function SkeletonLoader() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="github-section">
                <div className="profile-hero">
                    <div className="skeleton skeleton-avatar" />
                    <div style={{ flex: 1 }}>
                        <div className="skeleton skeleton-text" style={{ width: "40%" }} />
                        <div className="skeleton skeleton-text" style={{ width: "25%" }} />
                        <div className="skeleton skeleton-text" style={{ width: "60%" }} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="skeleton skeleton-block" style={{ width: 120, height: 60, borderRadius: 12 }} />
                    ))}
                </div>
            </div>
            <div className="github-section">
                <div className="skeleton skeleton-text" style={{ width: "30%", marginBottom: 16 }} />
                <div className="skeleton skeleton-heatmap" />
            </div>
            <div className="github-section">
                <div className="skeleton skeleton-text" style={{ width: "25%", marginBottom: 16 }} />
                <div className="repos-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="skeleton skeleton-block" />
                    ))}
                </div>
            </div>
        </div>
    );
}

const GitHub: React.FC = () => {
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [repoSearch, setRepoSearch] = useState("");
    const [selectedYear, setSelectedYear] = useState("last");
    const [contribLoading, setContribLoading] = useState(false);
    const skipFirstContribFetch = useRef(true);

    const USERNAME = "nachiketgalande1609";
    const GH_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
    const ghHeaders: HeadersInit = GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {};
    const currentYear = new Date().getFullYear();
    const yearOptions = [
        { value: "last", label: "Last year" },
        ...Array.from({ length: currentYear - 2020 + 1 }, (_, i) => ({
            value: String(currentYear - i),
            label: String(currentYear - i),
        })),
    ];

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [profileRes, reposRes, contribRes, eventsRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${USERNAME}`, { headers: ghHeaders }),
                    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100&type=owner`, { headers: ghHeaders }),
                    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
                    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=15`, { headers: ghHeaders }),
                ]);

                if (!profileRes.ok || !reposRes.ok || !contribRes.ok) {
                    throw new Error("Fetch failed");
                }

                const [profileData, reposData, contribData, eventsData]: [GitHubProfile, GitHubRepo[], ContributionsData, GitHubEvent[]] =
                    await Promise.all([
                        profileRes.json(),
                        reposRes.json(),
                        contribRes.json(),
                        eventsRes.ok ? eventsRes.json() : Promise.resolve([]),
                    ]);

                setProfile(profileData);
                setRepos(reposData);
                setContributions(contribData.contributions);
                setTotalContributions(Object.values(contribData.total)[0] ?? 0);

                const allowedTypes = new Set(["PushEvent", "CreateEvent", "WatchEvent", "ForkEvent", "IssuesEvent", "PullRequestEvent"]);
                const filtered = (eventsData as GitHubEvent[]).filter((e) => allowedTypes.has(e.type)).slice(0, 10);
                setEvents(filtered);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (loading) return;
        if (skipFirstContribFetch.current) {
            skipFirstContribFetch.current = false;
            return;
        }
        const fetchContribs = async () => {
            setContribLoading(true);
            try {
                const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${selectedYear}`); // third-party API, no auth needed
                if (!res.ok) return;
                const data: ContributionsData = await res.json();
                setContributions(data.contributions);
                setTotalContributions(Object.values(data.total)[0] ?? 0);
            } finally {
                setContribLoading(false);
            }
        };
        fetchContribs();
    }, [selectedYear, loading]);

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

    const topRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

    const allReposSorted = [...repos].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    const filteredRepos = repoSearch.trim()
        ? allReposSorted.filter((r) => r.name.toLowerCase().includes(repoSearch.toLowerCase()))
        : allReposSorted;

    if (loading) {
        return (
            <div className="github-page">
                <div className="github-inner">
                    <SkeletonLoader />
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="github-page">
                <div className="github-inner">
                    <div className="github-section">
                        <div className="github-error">Failed to load GitHub data. Please try again later.</div>
                    </div>
                </div>
            </div>
        );
    }

    const blogUrl = profile.blog
        ? profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`
        : null;

    const metrics = [
        { label: "Public repos", value: profile.public_repos.toLocaleString() },
        { label: "Public gists", value: profile.public_gists.toLocaleString() },
        { label: "Followers", value: profile.followers.toLocaleString() },
        { label: "Following", value: profile.following.toLocaleString() },
        { label: "Total ⭐", value: totalStars.toLocaleString() },
        { label: "Total ⎇", value: totalForks.toLocaleString() },
    ];

    return (
        <div className="github-page">
            <div className="github-inner">
                <div className="github-section">
                    <div className="profile-top-row">
                        <div className="profile-hero">
                        <AvatarWithFallback src={profile.avatar_url} alt={profile.login} />
                        <div className="profile-info">
                            <div className="profile-name">{profile.name || profile.login}</div>
                            <div className="profile-login">@{profile.login}</div>
                            {profile.bio && <div className="profile-bio">{profile.bio}</div>}
                            <div className="profile-meta-row">
                                {profile.location && (
                                    <span className="profile-meta-item">📍 {profile.location}</span>
                                )}
                                {profile.company && (
                                    <span className="profile-meta-item">🏢 {profile.company}</span>
                                )}
                                {blogUrl && (
                                    <a href={blogUrl} target="_blank" rel="noopener noreferrer" className="profile-meta-item profile-link">
                                        🔗 {profile.blog}
                                    </a>
                                )}
                                {profile.twitter_username && (
                                    <a
                                        href={`https://twitter.com/${profile.twitter_username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="profile-meta-item profile-link"
                                    >
                                        𝕏 @{profile.twitter_username}
                                    </a>
                                )}
                            </div>
                        </div>
                        </div>
                        <a
                            href={`https://github.com/${USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                            View on GitHub
                        </a>
                    </div>

                    <div className="metrics-grid">
                        {metrics.map((m) => (
                            <div key={m.label} className="metric-card">
                                <div className="metric-label">{m.label}</div>
                                <div className="metric-value">{m.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="profile-member-since">{formatMemberSince(profile.created_at)}</div>
                </div>

                <div className="github-section">
                    <div className="section-header">
                        <div className="github-section-title">Contribution activity</div>
                        <select
                            className="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {yearOptions.map((y) => (
                                <option key={y.value} value={y.value}>{y.label}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ opacity: contribLoading ? 0.5 : 1, transition: "opacity 0.2s" }}>
                        <ContributionHeatmap contributions={contributions} total={totalContributions} selectedYear={selectedYear} />
                    </div>
                </div>

                <div className="github-section">
                    <div className="github-section-title">Featured repositories</div>
                    <div className="repos-grid">
                        {topRepos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="repo-card repo-card-link"
                            >
                                <span className="repo-name-link">{repo.name}</span>
                                {repo.description && (
                                    <div className="repo-description">
                                        {repo.description.length > 100
                                            ? repo.description.slice(0, 100) + "…"
                                            : repo.description}
                                    </div>
                                )}
                                <div className="repo-meta">
                                    {repo.language && (
                                        <div className="lang-badge">
                                            <div className="lang-dot" style={{ background: getLangColor(repo.language) }} />
                                            {repo.language}
                                        </div>
                                    )}
                                    <div className="repo-stat">⭐ {repo.stargazers_count}</div>
                                    <div className="repo-stat">⎇ {repo.forks_count}</div>
                                    <div className="repo-updated">{relativeTime(repo.updated_at)}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {repos.length > 0 && (
                    <div className="github-section">
                        <div className="github-section-title">Language distribution</div>
                        <LanguageBar repos={repos} />
                    </div>
                )}

                <div className="github-section">
                    <div className="github-section-title">All repositories ({repos.length})</div>
                    <input
                        type="text"
                        className="repo-search"
                        placeholder="Search repositories…"
                        value={repoSearch}
                        onChange={(e) => setRepoSearch(e.target.value)}
                    />
                    <div className="all-repos-list">
                        <div className="all-repos-header">
                            <span>Repository</span>
                            <span>Language</span>
                            <span>Stars</span>
                            <span>Forks</span>
                            <span>Updated</span>
                        </div>
                        {filteredRepos.map((repo) => (
                            <div key={repo.id} className="all-repos-row">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="all-repo-name"
                                >
                                    {repo.name}
                                </a>
                                <div className="all-repo-lang">
                                    {repo.language ? (
                                        <>
                                            <div className="lang-dot" style={{ background: getLangColor(repo.language) }} />
                                            {repo.language}
                                        </>
                                    ) : (
                                        <span className="muted">—</span>
                                    )}
                                </div>
                                <div className="all-repo-stat muted">⭐ {repo.stargazers_count}</div>
                                <div className="all-repo-stat muted">⎇ {repo.forks_count}</div>
                                <div className="all-repo-updated muted">{relativeTime(repo.updated_at)}</div>
                            </div>
                        ))}
                        {filteredRepos.length === 0 && (
                            <div className="no-results">No repositories match your search.</div>
                        )}
                    </div>
                </div>

                {events.length > 0 && (
                    <div className="github-section">
                        <div className="github-section-title">Recent activity</div>
                        <div className="activity-feed">
                            {events.map((event) => {
                                const desc = describeEvent(event);
                                if (!desc) return null;
                                return (
                                    <div key={event.id} className="activity-item">
                                        <span className="activity-icon">{eventIcon(event.type)}</span>
                                        <div className="activity-body">
                                            <span className="activity-desc">{desc}</span>
                                            <span className="activity-time muted">{relativeTime(event.created_at)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHub;
