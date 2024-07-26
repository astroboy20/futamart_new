
// "use client"
// import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
// import data from "@/providers/fakeJsonData";
// import React from "react";
// import data from "@/providers/fakeJsonData";
// import { notFound } from "next/navigation";
// import React from "react";

// const Page = ({ params }) => {
//   const { id } = params;
//   const getSeller = data.find((product) => product._id === 1);
//   const { data: getSingleProduct } = useFetchItems({
//     url: `${BASE_URL}/${id}`,
//   });
  

//   return (
//     <div>
//       <p>{id}</p>
//     </div>
//   );
// };

// export default Page;


"use client"
import { SingleProduct } from "@/container/singleProduct/singleProduct";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import data from "@/providers/fakeJsonData";
import { notFound } from "next/navigation";
import React from "react";

const Page = ({ params }) => {
  const { id } = params;
  const getSeller = data.find((product) => product._id === 1);
  const { data: getSingleProduct } = useFetchItems({
    url: `${BASE_URL}/${id}`,
  });
//   if (!getSingleProduct) return notFound();
console.log(getSingleProduct?.rating?.rate)
console.log(getSingleProduct?.image)

  return (
    <main>
        {/* {id} */}
      <SingleProduct seller={getSeller} getSingleProduct={getSingleProduct} />
    </main>
  );
};

export default Page;


