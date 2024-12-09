import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecursiveStructure = ({ level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState({});
  const [selected, setSelected] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
    setCurrentLevel({});
    setSelected("");
  }, [level]);

  const handleClick = (new_level, new_level_id) => {
    setSelected(new_level_id);
    if (new_level) {
      setIsOpen(true); // Toggle visibility of children
      setCurrentLevel(new_level);
    } else {
      const pathname = window.location.pathname;
      // Navigate if no children
      router.push(pathname + "/" + new_level_id);
    }
  };

  return (
    <div>
      <h4 className="text-[#34312E] text-lg font-bold">{level.name}</h4>
      <ul className="grid grid-cols-3 gap-2 my-4">
        {level.sub_levels.map((sub_lev) => (
          <li key={sub_lev.level_id}>
            <button
              className={`h-full w-full p-2 rounded ${
                selected === sub_lev.level_id
                  ? "bg-[#34312E] text-white"
                  : "bg-white text-main-gray"
              }`}
              onClick={() => handleClick(sub_lev.structure, sub_lev.level_id)}
            >
              {sub_lev.name}
            </button>
          </li>
        ))}
      </ul>
      {isOpen && <RecursiveStructure level={currentLevel} />}
    </div>
  );
};

export default RecursiveStructure;
