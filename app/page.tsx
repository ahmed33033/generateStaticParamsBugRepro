import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <p>Please go to the following links:</p>
      <ul>
        <li>
          <Link href={"/nospace"}>/nospace</Link>
        </li>
        <li>
          <Link href={"/with space"}>/with space</Link>
        </li>
      </ul>
    </div>
  );
}
