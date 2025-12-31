import { useEffect, useState } from "react";
import UserInfoPopover from "./Survey/UserInfoPopover";

const MOTIVATIONS = [
  {
    text: "You’ve completed all your tasks. Take a moment to breathe slowly and enjoy the calm you created.",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
  },
  {
    text: "Well done. Your focus and patience paid off. Let this quiet moment restore your energy.",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
  },
  {
    text: "Tasks completed. Your mind is clearer now. Stay present and grounded in this moment.",
    image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg",
  },
  {
    text: "You handled today with composure. A calm mind is your greatest strength.",
    image: "https://images.pexels.com/photos/2908175/pexels-photo-2908175.jpeg",
  },
  {
    text: "Everything is done. Let the silence recharge you before the next step.",
    image: "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  },
];

const Motivation = ({ user }) => {
  const [motivation, setMotivation] = useState(MOTIVATIONS[0]);
  const [localUser, setLocalUser] = useState(user || null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONS.length);
    setMotivation(MOTIVATIONS[randomIndex]);
  }, []);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) {
        setLocalUser(JSON.parse(stored));
      }
    }
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `
          linear-gradient(
            rgba(0,0,0,0.45),
            rgba(0,0,0,0.45)
          ),
          url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.96)",
          borderRadius: "22px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: "42px",
          maxWidth: "640px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#2F6F6D",
            marginBottom: "18px",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Session Complete
        </h2>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "#444",
            marginBottom: "26px",
          }}
        >
          {motivation.text}
        </p>

        <img
          src={motivation.image}
          alt="Calm moment"
          style={{
            width: "100%",
            borderRadius: "16px",
            marginTop: "10px",
            filter: "brightness(0.95) contrast(1.05)",
          }}
        />
      </div>

      <UserInfoPopover
        user={localUser}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      />
    </div>
  );
};

export default Motivation;
