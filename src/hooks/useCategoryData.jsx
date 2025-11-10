import {
  FaRobot,
  FaPalette,
  FaLaptop,
  FaGamepad,
  FaCube,
  FaDesktop,
} from "react-icons/fa";

const useCategoryData = () => {
  const categories = [
    {
      id: "aB3xY7pQr",
      name: "AI & Machine Learning",
      icon: <FaRobot className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
      jobs: "8,432",
      description: "AI development, ML models, and automation",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "mK9tW2zLn",
      name: "Graphics Design",
      icon: <FaPalette className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
      jobs: "15,678",
      description: "Logos, branding, and visual design",
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      id: "qP5rS8vXy",
      name: "UI/UX Design",
      icon: <FaLaptop className="text-2xl" />,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      jobs: "18,901",
      description: "User interface and experience design",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "dF4hJ6bNc",
      name: "Game Design",
      icon: <FaGamepad className="text-2xl" />,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
      jobs: "6,789",
      description: "Game development and design",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "tM7gK9wRq",
      name: "3D Modeling",
      icon: <FaCube className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      jobs: "7,654",
      description: "3D assets, animation, and rendering",
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "sV2nB8mLp",
      name: "Web Design",
      icon: <FaDesktop className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400",
      jobs: "22,123",
      description: "Website design and development",
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
    },
  ];

  return categories;
};

export default useCategoryData;
