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

const STORAGE_KEY = "oksaas";

const LIKE_CLASSES = [
  "bg-kiwi-600/20",
  "border-kiwi-600",
  "shadow-lg",
  "shadow-kiwi-600/20",
];

export default function Link(props: Props) {
  const {
    id,
    title,
    description,
    image_url,
    url,
    likes_count = 0,
    small,
    is_featured,
    isButton = false,
  } = props;
  /* ──────────────────────────────────────────────── */
  /* Render                                           */
  /* ──────────────────────────────────────────────── */
  return (
    <div
      className={`flex items-center gap-12 justify-between w-full py-2 cursor-pointer px-2 ${is_featured ? "bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-kiwi-600/20 dark:from-neutral-800" : ""
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
            } flex items-center justify-center`}
        >
          {image_url && (
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="grid grow">
          <h3 className="font-[600] text-black dark:text-neutral-200 leading-tight">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm line-clamp-2 text-nowrap truncate">
            {description && description.length > 60
              ? description.slice(0, 60) + "..."
              : description}
          </p>
        </div>

        {!isButton && (
          <div className="flex items-center justify-center gap-2">
            {is_featured && (
              <div className="text-xs text-kiwi-600 font-[600] bg-transparent border border-kiwi-600 px-1 py-[1px]">
                Featured
              </div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${is_featured
              ? "text-kiwi-700"
              : "text-neutral-400 dark:text-neutral-200"
              }`}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
          </div>
        )}
      </a>
    </div>
  );
}
