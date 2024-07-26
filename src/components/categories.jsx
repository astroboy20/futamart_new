import { categories } from "@/providers/data";

const Categories = () => {
  return (
    <div className="pl-[6%] sm:w-[100%] w-full">
      <ul className="flex gap-[30px] sm:px-0 no-scrollbar overflow-x-scroll">
        {categories.map((category, index) => {
          return (
            <li
              style={{
                minWidth: "fit-content",
              }}
              className="py-2 px-4 font-semibold capitalize rounded-md border text-[12px] leading-[15.06px] sm:leading-[25.1px] border-black sm:text-[20px] hover:cursor-pointer hover:bg-black hover:text-white"
              key={index}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Categories };
