import "../styles/globals.css";
import { store } from "./store";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import { fetchData } from "./features/liabilities/liabilitiesSlice";
import { useEffect } from "react";
import { fetchAssets } from "./features/liabilities/assets/assetsSlice";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(fetchData());
    store.dispatch(fetchAssets());
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
