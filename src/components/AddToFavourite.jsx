// import React, { useState } from 'react';
// import { Fav } from "@/assets";
// import { useToast } from "@chakra-ui/react";
// import Cookies from "js-cookie";

// const AddToFavourite = ({ productId }) => {
//   const [isFavourite, setIsFavourite] = useState(false);
//   const toast = useToast();
//   const token = Cookies.get("token");
//   const handleFavouriteClick = () => {
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "You must be logged in to add to favourites.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       return;
//     }
    
//     setIsFavourite(!isFavourite);
    
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-cart`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ productId }), 
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Success:', data);
//       toast({
//         title: "Success",
//         description: data.message || "Item added to favourite.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to add item to favourite.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     });
//   };

//   return (
//     <button 
//       onClick={handleFavouriteClick} 
//       style={{ color: isFavourite ? 'red' : 'inherit' }}
//     >
//       {isFavourite ? <Fav style={{ color: 'red' }} /> : <Fav />}
//     </button>
//   );
// };

// export { AddToFavourite };
