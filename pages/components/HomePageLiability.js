import React from "react";
import { HomepageCardWrapper } from "./wrappers/wrappers";

const HomePageLiability = ({ liability }) => {
  return (
    <HomepageCardWrapper data={liability}/>
  );
};

export default HomePageLiability;
