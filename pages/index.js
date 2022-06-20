import { useSelector } from "react-redux";
import Button, { ButtonLink } from "./components/Button";
import HomePageAsset from "./components/HomePageAsset";
import HomePageLiability from "./components/HomePageLiability";
import { CardWrapper } from "./components/wrappers/wrappers";
import { getAssets } from "./features/assets/assetsSlice";

export default function Home() {
  const { liabilities } = useSelector((state) => state.liabilities);
  const assets = useSelector(getAssets);
  return (
    <div className="flex flex-col justify-start mb-auto text-center">
      <CardWrapper>
        <h2 className="mb-2 font-semibold uppercase">Liabilities</h2>
        {liabilities.length > 0 ? (
          <section>
            {liabilities.map((liability) => (
              <HomePageLiability key={liability.id} liability={liability} />
            ))}
          </section>
        ) : (
          <ButtonLink href="/liabilities">Add</ButtonLink>
        )}
      </CardWrapper>
      <CardWrapper>
        <h2 className="mb-2 font-semibold uppercase">Assets</h2>

        {assets.length > 0 ? (
          <section>
            {assets.map((singleAsset) => (
              <HomePageAsset key={singleAsset.id} asset={singleAsset} />
            ))}
          </section>
        ) : (
          <ButtonLink href="/assets">Add</ButtonLink>
        )}
      </CardWrapper>
    </div>
  );
}
