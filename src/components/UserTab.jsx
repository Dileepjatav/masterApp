import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserTab = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState([
    { name: "Take quiz", path: "quiz" },
    { name: "Past performance", path: "performance" },
  ]);
  const [activeTab, SetActive] = useState("");

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastPath = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    SetActive(lastPath);
  }, [lastPath]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      {tab &&
        tab.map((bt, i) => (
          <button
            style={{
              padding: "10px 20px",
              margin: "5px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: activeTab === bt.path ? "600" : "400",
              backgroundColor: activeTab === bt.path ? "#3b82f6" : "#e5e7eb",
              color: activeTab === bt.path ? "white" : "#4b5563",
              boxShadow:
                activeTab === bt.path ? "0 2px 5px rgba(0,0,0,0.2)" : "none",
              transform: activeTab === bt.path ? "translateY(-1px)" : "none",
              transition: "all 0.2s ease-in-out",
              ":hover": {
                backgroundColor: activeTab === bt.path ? "#2563eb" : "#d1d5db",
              },
            }}
            key={i}
            onClick={() => navigate(`/${bt.path}`)}
          >
            {bt.name.toLocaleUpperCase()}
          </button>
        ))}
    </div>
  );
};

export default UserTab;
