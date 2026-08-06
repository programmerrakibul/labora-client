const SITE_NAME = "Labora";
const TAGLINE = "Where talent meets opportunity";
const DEFAULT_TITLE = `${SITE_NAME} — ${TAGLINE}`;
const DEFAULT_DESCRIPTION =
  "Labora is a freelance job marketplace where talent meets opportunity. Browse and apply to jobs as a job seeker, or post and manage listings as a recruiter.";
const DEFAULT_ROBOTS = "index, follow";

const formatTitle = (title) => {
  if (!title) return DEFAULT_TITLE;
  const trimmed = title.trim();
  if (trimmed.toLowerCase().includes(SITE_NAME.toLowerCase())) {
    return trimmed;
  }
  return `${trimmed} | ${SITE_NAME}`;
};

const truncate = (text, maxLength = 160) => {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
};

const seo = {
  SITE_NAME,
  TAGLINE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_ROBOTS,
  formatTitle,
  truncate,
};

export default seo;
