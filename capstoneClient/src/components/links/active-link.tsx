import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const router = useRouter();
  const pathName = router.asPath;
  const isActive =
    pathName === href.toString() || pathName.startsWith(`${href.toString()}/`);
  return (
    <Link
      {...rest}
      className={
        isActive
          ? "bg-gradient-to-r from-primary-400 to-primary-100 bg-clip-text text-transparent dark:from-tertiary-500 dark:to-tertiary-400 max-xs:text-sm"
          : "text-typography-100 dark:text-typography-800 max-xs:text-sm"
      }
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
