import { sanitizeHTML } from "@/lib/security";

interface SafeHtmlProps {
  html: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

/**
 * SafeHtml component
 * Renders HTML content after sanitizing it to prevent XSS attacks.
 * Uses the sanitizeHTML utility to strip dangerous tags and scripts.
 */
export function SafeHtml({ html, className, tag: Tag = "div" }: SafeHtmlProps) {
  const sanitized = sanitizeHTML(html);

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

