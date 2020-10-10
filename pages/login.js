import LoginPage from "@/components/login";
import Page from "@/components/common/page";
import withBaseLayout from "@/components/common/layouts/base";

const Login = () => (
  <Page title="Home" layoutProvider={withBaseLayout}>
    {(props) => <LoginPage {...props} />}
  </Page>
);

export default Login;
