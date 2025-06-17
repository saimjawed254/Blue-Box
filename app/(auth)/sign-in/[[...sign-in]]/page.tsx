import SignUpForm from "@/components/Form/signUpForm";

export default function SignIn() {
  return (
    <>
      <div style={{
        width:"100vw",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }} className="signup-page">
        <SignUpForm />
      </div>
    </>
  );
}
