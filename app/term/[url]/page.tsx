import { getOutputTerms, getOutputTerm } from "@/lib/terms";

export function generateStaticParams() {
  return getOutputTerms().map((outputTerm) => {
    return {
      url: outputTerm.url,
    };
  });
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  console.log("woohoo" + url);
  const outputTerm = getOutputTerm(url)!;

  return <div>hi</div>;
}
