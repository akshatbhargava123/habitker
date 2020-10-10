import LoginPage from "@/components/login";
import Page from "@/components/common/page";
import withBaseLayout from "@/components/common/layouts/base";

export default () => (
  <Page title="Home" layoutProvider={withBaseLayout}>
    {() => <LoginPage />}
  </Page>
);
