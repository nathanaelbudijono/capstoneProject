import { useRouter } from "next/router";
import Link from "next/link";

export default function Breadcrumbs() {
  const router = useRouter();
  const { pathname } = router;
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <main className="w-full max-w-7xl text-sm">
      <div className="flex gap-2">
        {segments.map((segment, index) => {
          const currentSegment = segment === "[id]" ? " " : segment;

          const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
          const capitalizedSegment =
            currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);

          return (
            <div key={segmentPath}>
              <Link
                href={segmentPath}
                className={index === 0 ? "text-color-100" : "text-n-500"}
              >
                {capitalizedSegment} {"/"}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
