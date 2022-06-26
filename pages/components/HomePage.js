import React from "react";
import { useEffect, useCallback, useMemo } from "react";
import Button, { ButtonLink } from "./Button";
import HomePageAsset from "./HomePageAsset";
import HomePageLiability from "./HomePageLiability";
import { CardWrapper } from "./wrappers/wrappers";
import { getAssets, toggleAddAsset } from "../features/assets/assetsSlice";
import {
  fetchExpenses,
  setSignIn,
  tooggleAdd,
} from "../features/liabilities/liabilitiesSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const { liabilities, user, signIn } = useSelector(
    (state) => state.liabilities
  );

  const assets = useSelector(getAssets);

  // useEffect(() => {
  //   if()
  //   liabilities.forEach((li) => {
  //     dispatch(fetchExpenses({ id: user, liId: li.id }));
  //   });
  // }, [user]);

  // useEffect(() => {
  //   fetch;
  // }, [dispatch, liabilities, user, fetch]);

  return (
    <>
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
    </>
  );
};

export default HomePage;
