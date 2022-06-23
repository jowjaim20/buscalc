import { useSelector } from "react-redux";
import Button, { ButtonLink } from "./components/Button";
import HomePageAsset from "./components/HomePageAsset";
import HomePageLiability from "./components/HomePageLiability";
import { CardWrapper } from "./components/wrappers/wrappers";
import { getAssets, toggleAddAsset } from "./features/assets/assetsSlice";
import { tooggleAdd } from "./features/liabilities/liabilitiesSlice";
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

export default function Home() {
  const { liabilities } = useSelector((state) => state.liabilities);
  const assets = useSelector(getAssets);
  return (
    <main className="flex flex-col justify-start mb-auto text-center">
      <CardWrapper>
        <h2 className="mb-2 font-semibold text-white uppercase">Liabilities</h2>
        {liabilities.length > 0 ? (
          <section>
            {liabilities.map((liability) => (
              <HomePageLiability key={liability.id} liability={liability} />
            ))}
          </section>
        ) : (
          <ButtonLink href="/liabilities" toggle={tooggleAdd}>
            Add
          </ButtonLink>
        )}
      </CardWrapper>
      <CardWrapper>
        <h2 className="mb-2 font-semibold text-white uppercase">Assets</h2>

        {assets.length > 0 ? (
          <section>
            {assets.map((singleAsset) => (
              <HomePageAsset key={singleAsset.id} asset={singleAsset} />
            ))}
          </section>
        ) : (
          <ButtonLink href="/assets" toggle={toggleAddAsset}>
            Add
          </ButtonLink>
        )}
      </CardWrapper>
    </main>
  );
}
