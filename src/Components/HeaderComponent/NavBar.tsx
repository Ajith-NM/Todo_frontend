import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setProfile(user);
    }
  }, []);
  return (
    <>
      <nav>
        <h3>Focus</h3>
        <div className="right">
          <button
            className="loginButton"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            LogOut
          </button>

          <div className="UserProfile">
            <img src={profile} alt="profile image" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
