import LoginBox from "../features/log-in-out/LoginBox";
import LoginImage from "../ui/LoginImage";
import LoginPageLayout from "../ui/LoginPageLayout";

const Login = () => {
  return (
    <LoginPageLayout>
      <LoginImage />
      <LoginBox />
    </LoginPageLayout>
  );
};

export default Login;
