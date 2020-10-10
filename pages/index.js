import Page from "@/components/common/page";
import withBaseLayout from "@/components/common/layouts/base";
import HomePage from "@/components/home";

export default () => (
  <Page title="Home" layoutProvider={withBaseLayout}>
    {(props) => <HomePage {...props} />}
  </Page>
);
