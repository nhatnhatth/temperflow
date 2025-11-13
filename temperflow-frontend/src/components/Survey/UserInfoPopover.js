import React, { useState } from "react";
const UserInfoPopover = ({ user, onLogout }) => {
  console.log(user)
  const [showInfo, setShowInfo] = useState(false);

  if (!user) return null;

  return (
    <div style={{ position: "absolute", top: "20px", right: "20px" }}>
      <img
        src={user.picture || "https://lh3.googleusercontent.com/a/ACg8ocJLQy95mwScUuIxaJdsAToZ5R8EA7m0OIcE5YyLpOCkj_H9b56z=s96-c"}
        alt="Avatar"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "2px solid #4FB7B3",
        }}
        onClick={() => setShowInfo((prev) => !prev)}
      />

      {showInfo && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: 0,
            background: "white",
            padding: "15px 20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            minWidth: "220px",
            textAlign: "left",
            color: "#31326F",
            zIndex: 10,
          }}
        >
          <h4 style={{ marginBottom: "10px", color: "#4FB7B3" }}>
            👤 Thông tin người dùng
          </h4>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.mail}</p>
          {/* <p><strong>ID:</strong> {user.id}</p> */}

          <button
            onClick={onLogout}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#FF4D4F",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};


export default UserInfoPopover;
