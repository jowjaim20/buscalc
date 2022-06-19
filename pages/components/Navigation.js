import Link from "next/link";
import { ListLinkWrapper } from "./wrappers/wrappers";

const Navigation = () => {
  return (
    <nav className="p-3 w-full text-lg font-bold text-center uppercase bg-blue-500">
      <ul className="flex gap-1 text-xs">
        <ListLinkWrapper href="/">Home</ListLinkWrapper>
        <ListLinkWrapper href="/assets">Assets</ListLinkWrapper>
        <ListLinkWrapper href="/liabilities">Liabilities</ListLinkWrapper>
      </ul>
    </nav>
  );
};

export default Navigation;
