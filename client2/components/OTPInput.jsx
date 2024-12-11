import useAxios from "@/hooks/useAxios";
import useUser from "@/hooks/useUser";
import { useState } from "react";

const OTPInput = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP state to hold the 6 digits
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { axiosInstance } = useAxios();
  const { user, setUser } = useUser();

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("Text");
    if (pastedText.length === 6) {
      setOtp(pastedText.split(""));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.get(
        `/${user.role}/verify/${otp.join("")}`,
      );
      setUser(res.data.user);
    } catch (error) {}
  };

  const handleRegenerate = async () => {
    try {
      await axiosInstance.get("/token");
      setOtp(Array(6).fill(""));
      setIsSubmitted(false);
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <div className="grid grid-cols-6 gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>
        {isSubmitted && (
          <div className="text-center text-sm text-green-500 mb-4">
            OTP Submitted!
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 w-full"
          >
            Submit
          </button>
          <button
            onClick={handleRegenerate}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 w-full ml-2"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
