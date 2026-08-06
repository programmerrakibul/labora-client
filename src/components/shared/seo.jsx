import seo from "@/lib/seo";
import urlUtils from "@/lib/url";
import { useEffect } from "react";

const getMeta = (attr, key) => {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  return el?.getAttribute("content") ?? null;
};

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const restoreMeta = (attr, key, previous) => {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) return;
  if (previous == null) {
    el.remove();
  } else {
    el.setAttribute("content", previous);
  }
};

const getCanonical = () =>
  document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
  null;

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const restoreCanonical = (previous) => {
  const el = document.head.querySelector('link[rel="canonical"]');
  if (!el) return;
  if (previous == null) {
    el.remove();
  } else {
    el.setAttribute("href", previous);
  }
};

const Seo = ({
  title,
  description,
  canonical,
  robots,
  noindex = false,
  image,
  ogType,
}) => {
  useEffect(() => {
    const pageTitle = seo.formatTitle(title);
    const pageDescription = description || seo.DEFAULT_DESCRIPTION;
    const pageCanonical = canonical || urlUtils.getFullUrl();
    const pageRobots = noindex
      ? "noindex, nofollow"
      : robots || seo.DEFAULT_ROBOTS;

    const previous = {
      title: document.title,
      description: getMeta("name", "description"),
      robots: getMeta("name", "robots"),
      canonical: getCanonical(),
      ogTitle: getMeta("property", "og:title"),
      ogDescription: getMeta("property", "og:description"),
      ogType: getMeta("property", "og:type"),
      ogUrl: getMeta("property", "og:url"),
      ogSiteName: getMeta("property", "og:site_name"),
      ogImage: getMeta("property", "og:image"),
      twitterCard: getMeta("name", "twitter:card"),
      twitterTitle: getMeta("name", "twitter:title"),
      twitterDescription: getMeta("name", "twitter:description"),
      twitterImage: getMeta("name", "twitter:image"),
    };

    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", pageRobots);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:type", ogType || "website");
    setMeta("property", "og:url", pageCanonical);
    setMeta("property", "og:site_name", seo.SITE_NAME);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setCanonical(pageCanonical);

    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    return () => {
      document.title = previous.title;
      restoreMeta("name", "description", previous.description);
      restoreMeta("name", "robots", previous.robots);
      restoreMeta("property", "og:title", previous.ogTitle);
      restoreMeta("property", "og:description", previous.ogDescription);
      restoreMeta("property", "og:type", previous.ogType);
      restoreMeta("property", "og:url", previous.ogUrl);
      restoreMeta("property", "og:site_name", previous.ogSiteName);
      restoreMeta("property", "og:image", previous.ogImage);
      restoreMeta("name", "twitter:card", previous.twitterCard);
      restoreMeta("name", "twitter:title", previous.twitterTitle);
      restoreMeta("name", "twitter:description", previous.twitterDescription);
      restoreMeta("name", "twitter:image", previous.twitterImage);
      restoreCanonical(previous.canonical);
    };
  }, [title, description, canonical, robots, noindex, image, ogType]);

  return null;
};

export default Seo;
