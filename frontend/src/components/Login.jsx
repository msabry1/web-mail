import GoogleButton from "react-google-button";

const Login = () => {
  // const { setUserData } = useAuth();

  const handleLogin = async () => {
    try {
      console.log("Initiating login process...");
      //   const res = await AuthService.login();
      //   setUserData(res.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <GoogleButton onClick={handleLogin} />
    </div>
  );
};

export default Login;
