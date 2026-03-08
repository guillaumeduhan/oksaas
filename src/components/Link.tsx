"use client";

interface Props {
  id?: string;
  title?: string;
  description?: string;
  image_url?: string;
  url?: string;
  likes_count?: number;
  small?: boolean;
  is_promoted?: boolean;
  is_featured?: boolean;
  isButton?: boolean;
  created_at?: string;
}

export default function Link(props: Props) {
  const {
    id,
    title,
    description,
    image_url,
    url,
    likes_count = 0,
    is_promoted,
    small,
    is_featured,
    isButton = false,
  } = props;
  /* ──────────────────────────────────────────────── */
  /* Render                                           */
  /* ──────────────────────────────────────────────── */
  return (
    <div
      className={`group relative flex items-center gap-12 justify-between w-full py-2 cursor-pointer px-2 bg-gradient-to-r cursor-pointer transition duration-300 ${is_promoted ? 'hover:bg-amber-600/20 to-amber-600/20 dark:from-neutral-900' : is_featured ? "hover:bg-primary-600/20 dark:from-transparent to-primary-600/20 dark:from-neutral-900" : "dark:from-neutral-900 dark:hover:bg-neutral-700/20"
        }`}
    >
      <a
        href={`${url}?utm_source=oksaas`}
        target="_blank"
        rel="noreferrer"
        className="grow flex items-center gap-4 hover:opacity-90 transition"
      >
        <div
          className={`${small ? "size-10 min-w-10 min-h-10" : "size-12 min-w-12 min-h-12"
            } flex items-center justify-center rounded-sm overflow-hidden bg-neutral-800`}
        >
          {image_url && (
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
        </div>

        <div className="grid grow">
          <h3 className="font-[600] text-black dark:text-neutral-200 leading-tight">
            {title}
          </h3>
          <p className="text-neutral-500 line-clamp-2 text-nowrap truncate">
            {description && description.length > 60
              ? description.slice(0, 60) + "..."
              : description}
          </p>
        </div>

        {!isButton && (
          <div className="flex items-center justify-center gap-4">
            {is_promoted && (
              <div className="text-xs text-amber-600 font-[600] bg-transparent border border-amber-600 px-1 py-[1px]">
                Promoted
              </div>
            )}
            {is_featured && (
              <div className="text-xs text-primary-600 font-[600] bg-transparent border border-primary-600 px-1 py-[1px]">
                Featured
              </div>
            )}
            <svg className={`relative right-2 group-hover:right-0 transition-all duration-600 ease-in-out ${is_promoted ? 'text-amber-700' : is_featured
              ? "text-primary-700"
              : "text-neutral-400 dark:text-neutral-200"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>

          </div>
        )}
      </a>
    </div>
  );
}
