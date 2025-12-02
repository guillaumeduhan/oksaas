"use client";

import { useEffect, useState } from "react";

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

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likes_count);

  /* ──────────────────────────────────────────────── */
  /* LocalStorage                                     */
  /* ──────────────────────────────────────────────── */
  const getLikes = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const saveLikes = (arr: string[]) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

  useEffect(() => {
    if (!id) return;
    setLiked(getLikes().includes(id));
  }, [id]);

  /* ──────────────────────────────────────────────── */
  /* Toggle Like                                      */
  /* ──────────────────────────────────────────────── */
  function toggleLike() {
    if (!id) return;

    let arr = getLikes();
    let newLiked;

    if (arr.includes(id)) {
      arr = arr.filter((x: string) => x !== id);
      newLiked = false;
      setCount((c) => c - 1);
    } else {
      arr.push(id);
      newLiked = true;
      setCount((c) => c + 1);
    }

    saveLikes(arr);
    setLiked(newLiked);
  }

  /* ──────────────────────────────────────────────── */
  /* Render                                           */
  /* ──────────────────────────────────────────────── */
  return (
    <div
      className={`flex items-center gap-12 justify-between w-full py-2 cursor-pointer px-2 ${is_featured ? "bg-kiwi-600/20" : ""
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

      {/* Like button */}
      {isButton && (
        <button
          type="button"
          onClick={toggleLike}
          className={`group relative font-[600] min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] cursor-pointer grid duration-300 ${liked ? LIKE_CLASSES.join(" ") : ""
            }`}
        >
          <div className="flex items-center justify-center min-h-[32px] -top-1">
            {/* Arrow (not liked) */}
            {!liked && (
              <div className="arrow-wrapper">
                <div className="arrow-default flex group-hover:hidden">
                  <svg width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m7 14l5-5l5 5z"></path>
                  </svg>
                </div>

                <div className="arrow-hover hidden group-hover:flex float-up-fade">
                  <svg width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m7 14l5-5l5 5z"></path>
                  </svg>
                </div>
              </div>
            )}

            {/* Heart (liked) */}
            {liked && (
              <div className="heart-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4z"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <div className="relative block text-[13px] like-count max-h-[32px] -top-1">
            {count}
          </div>
        </button>
      )}
    </div>
  );
}
