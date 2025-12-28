import { useEffect, useState } from "react";
import UserInfoPopover from "./Survey/UserInfoPopover";

const MOTIVATIONS = [
  {
    text: "Awesome! You have completed your tasks and feel much calmer. Keep taking deep breaths when stress arises.",
    gif: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
  },
  {
    text: "Bravo! All tasks are done, and your emotions are more balanced. Remember to take a few minutes each day to walk or relax.",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  },
  {
    text: "You are so diligent! Tasks completed and anger reduced. Try journaling each night to maintain your calm.",
    gif: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
  },
  {
    text: "Congratulations! You managed your emotions well today. Listen to soft music or do a short meditation to stay relaxed.",
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
  },
  {
    text: "All tasks completed, and you feel more relaxed. Treat yourself to a cup of tea or a small favorite pastime.",
    gif: "https://media.giphy.com/media/3ohhwF34cGDoFFhRfy/giphy.gif",
  },
  {
    text: "Excellent! You just finished everything and reduced stress effectively. Keep practicing slow breathing to handle pressure.",
    gif: "https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif",
  },
  {
    text: "Bravo! Your emotions are stable after completing your tasks. Try some light stretching to maintain positive energy.",
    gif: "https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif",
  },
  {
    text: "You are amazing! Tasks completed, anger reduced. Take 5 minutes to close your eyes and relax before moving on.",
    gif: "https://media.giphy.com/media/3orieZkzVG27WRu5EA/giphy.gif",
  },
  {
    text: "Congratulations! You controlled your anger and finished all tasks. Make it a habit to remind yourself when emotions flare.",
    gif: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
  },
  {
    text: "Awesome! You finished your tasks and your mood is more stable. Keep this habit to wake up with positive energy tomorrow.",
    gif: "https://media.giphy.com/media/3o6ZsVJh3z4pS0CZ3i/giphy.gif",
  },
];

const Motivation = ({ user }) => {
  const [motivation, setMotivation] = useState(MOTIVATIONS[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONS.length);
    setMotivation(MOTIVATIONS[randomIndex]);
  }, []);

  const [localUser, setLocalUser] = useState(user || null);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) setLocalUser(JSON.parse(stored));
    }
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A8FBD3, #637AB9)",
        backgroundImage:
          "url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "40px",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ color: "#4FB7B3", marginBottom: "20px" }}>🎉 Congratulations!</h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>{motivation.text}</p>
        <img
          src={motivation.gif}
          alt="Motivation gif"
          style={{ width: "100%", borderRadius: "12px" }}
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
