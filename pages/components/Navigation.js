import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="p-3 w-full text-lg font-bold text-center uppercase bg-blue-500">
      <ul className="flex gap-1 text-xs">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>credits</li>
        <li>expenses</li>
        <li>assets</li>
        <li>
          <Link href="/liabilities">
            <a>liabilities</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
