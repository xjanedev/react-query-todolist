import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className='bg-purple-600 text-white text-sm py-2 px-4 rounded-3xl mb-8'
    >
      Back to Lists
    </button>
  );
}
