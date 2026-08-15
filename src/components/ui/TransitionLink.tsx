"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useSceneTransition } from "@/components/providers/SceneTransitionProvider";

export function TransitionLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const { navigate } = useSceneTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;

    event.preventDefault();
    navigate(href.toString());
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
