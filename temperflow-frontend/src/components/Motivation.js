import React, { useEffect, useState } from "react";
// import UserInfoPopover from "../Survey/UserInfoPopover";
import UserInfoPopover from "./Survey/UserInfoPopover";


// Danh sách lời động viên + lời khuyên
const MOTIVATIONS = [
  {
    text: "Tuyệt vời! Bạn đã hoàn thành các nhiệm vụ và bình tĩnh hơn rất nhiều. Hãy tiếp tục hít thở sâu khi căng thẳng xuất hiện.",
    gif: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
  },
  {
    text: "Bravo! Mọi task đã xong, và cảm xúc của bạn ổn định hơn. Nhớ dành vài phút mỗi ngày để đi dạo hoặc thư giãn.",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  },
  {
    text: "Bạn thật chăm chỉ! Nhiệm vụ hoàn tất và tức giận đã giảm. Hãy thử viết nhật ký mỗi tối để duy trì sự bình tĩnh.",
    gif: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
  },
  {
    text: "Chúc mừng! Bạn đã kiểm soát tốt cảm xúc hôm nay. Nhớ lắng nghe nhạc nhẹ hoặc thiền ngắn để giữ tinh thần thoải mái.",
    gif: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
  },
  {
    text: "Tất cả task đã hoàn thành, và bạn đã thư giãn hơn. Hãy tự thưởng cho bản thân một cốc trà hoặc một chút giải trí yêu thích.",
    gif: "https://media.giphy.com/media/3ohhwF34cGDoFFhRfy/giphy.gif",
  },
  {
    text: "Tuyệt hảo! Bạn vừa hoàn thành mọi việc và giảm stress hiệu quả. Hãy giữ thói quen hít thở chậm để đối phó với áp lực.",
    gif: "https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif",
  },
  {
    text: "Bravo! Cảm xúc của bạn đã ổn định sau khi hoàn thành các nhiệm vụ. Hãy thử tập giãn cơ nhẹ để duy trì năng lượng tích cực.",
    gif: "https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif",
  },
  {
    text: "Bạn thật tuyệt vời! Task hoàn thành, tức giận giảm. Hãy dành 5 phút nhắm mắt thư giãn trước khi tiếp tục công việc khác.",
    gif: "https://media.giphy.com/media/3orieZkzVG27WRu5EA/giphy.gif",
  },
  {
    text: "Chúc mừng! Bạn đã kiểm soát cơn giận và hoàn thành tất cả nhiệm vụ. Hãy tạo thói quen nhắc nhở bản thân khi cảm xúc bùng phát.",
    gif: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
  },
  {
    text: "Tuyệt vời! Bạn đã kết thúc các task và tâm trạng ổn định hơn. Hãy tiếp tục duy trì thói quen này để ngày mai tràn đầy năng lượng tích cực.",
    gif: "https://media.giphy.com/media/3o6ZsVJh3z4pS0CZ3i/giphy.gif",
  },
];

const Motivation = ({ user }) => {
  const [motivation, setMotivation] = useState(MOTIVATIONS[0]);

  useEffect(() => {
    // Chọn ngẫu nhiên một lời động viên
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
        // padding: "40px",
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
        <h2 style={{ color: "#4FB7B3", marginBottom: "20px" }}>🎉 Chúc mừng!</h2>
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
