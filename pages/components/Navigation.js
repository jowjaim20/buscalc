import Link from "next/link";

const Navigation = () => {
  return (
    <nav className=" p-3 text-lg font-bold uppercase w-full bg-blue-500 text-center">
      <ul className="flex gap-1 text-xs">
        <li>home</li>
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
