import seo from "@/lib/seo";
import urlUtils from "@/lib/url";

const Seo = ({
  title,
  description,
  canonical,
  robots,
  noindex = false,
  image,
  ogType,
}) => {
  const pageTitle =
    seo.formatTitle(title) || "Labora — Where talent meets opportunity";
  const pageDescription = description || seo.DEFAULT_DESCRIPTION;
  const pageCanonical = canonical || urlUtils.getFullUrl();
  const pageRobots = noindex
    ? "noindex, nofollow"
    : robots || seo.DEFAULT_ROBOTS;

  return (
    <>
      <title>{pageTitle}</title>
      <link rel="canonical" href={pageCanonical} />
      <meta name="description" content={pageDescription} />
      <meta name="robots" content={pageRobots} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:site_name" content={seo.SITE_NAME} />
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}
    </>
  );
};

export default Seo;
