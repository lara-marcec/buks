import { useNavigate } from "react-router-dom";
export default function Logo() {
  const navigate = useNavigate();

  return (
    <img
      src="/buks_logo_transparent.png"
      alt="App Logo"
      className="logo"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    />
  );
}
