export default function Page(){
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10vh 2rem",
          fontSize: "1.5rem",
        }}
      >
        ⚠️ Rate Limited <br /> You’re searching too fast. <br /> Please wait a few seconds and try again.
      </div>
    );
}