import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { FaTimes } from "react-icons/fa";
const RatingModal = ({ isOpen, onClose, productId }) => {
  const token = Cookies.get("token");
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("Login required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/review`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, rating: selectedRating, review }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        `${process.env.NEXT_PUBLIC_API_URL}/product/review`,
      ]);
      toast({
        title: "Thank you!",
        description: data.message || "Your feedback has been submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      setSelectedRating(0);
      setReview("");
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "An error occurred while submitting your review.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!productId) {
      toast({
        title: "Error",
        description: "Product ID is missing. Cannot submit the review.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    mutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-end sm:items-center sm:justify-center z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-lg w-full sm:w-1/2 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Rate and Review
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`text-3xl cursor-pointer ${
                  selectedRating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                &#9733;
              </span>
            ))}
          </div>

          {/* Review Textarea */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="3"
            placeholder="Write your review here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition ${
              loading
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
