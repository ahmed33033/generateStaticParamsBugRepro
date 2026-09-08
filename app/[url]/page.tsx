import Link from "next/link";

export function generateStaticParams() {
  return [{ url: "nospace" }, { url: "with space" }];
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  console.log("the gotten url is: " + url);

  return (
    <div>
      <h1>/{url}</h1>
      <div>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
}
