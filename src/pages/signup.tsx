import SignupModal from "@/components/SignupModal";

const SignupPage = () => {
  return <SignupModal onSwitch={() => console.log("Switch to login")} />;
};

export default SignupPage;
