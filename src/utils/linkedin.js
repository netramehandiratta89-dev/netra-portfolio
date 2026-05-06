export function toLinkedInEmbedUrl(input) {
  if (!input) return null;

  const raw = String(input).trim();
  if (!raw) return null;

  const iframeSrcMatch = raw.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  const candidate = (iframeSrcMatch?.[1] || raw).trim();

  if (!candidate.includes('linkedin.com')) return null;
  if (candidate.includes('/embed/feed/update/')) return candidate;

  const urnMatch = candidate.match(/urn:li:(share|ugcPost|activity):\d+/i);
  if (urnMatch) {
    const urn = urnMatch[0];
    return `https://www.linkedin.com/embed/feed/update/${urn}`;
  }

  const activityIdMatch =
    candidate.match(/urn:li:activity:(\d+)/i) ||
    candidate.match(/activity-(\d+)/i) ||
    candidate.match(/\/detail\/activity\/(\d+)/i);

  if (activityIdMatch?.[1]) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityIdMatch[1]}`;
  }

  const shareIdMatch = candidate.match(/urn:li:share:(\d+)/i);
  if (shareIdMatch?.[1]) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareIdMatch[1]}`;
  }

  return null;
}

