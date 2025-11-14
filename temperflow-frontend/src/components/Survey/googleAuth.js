// src/utils/googleAuth.js
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode"; 

/**
 * Giải mã JWT credential trả về từ Google Login
 * @param {string} credential - JWT Google
 * @returns {object} user info { id, name, email, avatar }
 */
export const decodeGoogleCredential = (credential) => {
  if (!credential) return null;

  try {
    const decoded = jwtDecode(credential);
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture,
    };
  } catch (error) {
    console.error("Failed to decode Google credential:", error);
    return null;
  }
};
