import cn from "@/type/clsxm";
import Link, { LinkProps } from "next/link";
import * as React from "react";

export type UnstyledLinkProps = {
  href: string;
  target?: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, "href">;
} & React.ComponentPropsWithRef<"a">;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    { children, href, openNewTab, className, target, nextLinkProps, ...rest },
    ref
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href &&
          !(
            typeof href === "string" &&
            (href.startsWith("/") || href.startsWith("#"))
          );

    if (!isNewTab) {
      return (
        <Link
          href={href}
          ref={ref}
          className={cn("text-primary text-sm cursor-newtab", className)}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target={target}
        rel="noopener noreferrer"
        href={href}
        {...rest}
        className={cn("cursor-newtab text-typography-100", className)}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
