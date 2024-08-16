import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  collection,
} from "firebase/firestore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { db } from "../config/Firebase";

const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: [],
      review: {
        name: "",
        email: "",
        // password: "",
        id: "",
        rating: 0,
        comment: "",
      },
      foundReview: false,
      addReview: async (newReview) => {
        try {
          const reviewsRef = await addDoc(collection(db, "reviews"), {
            name: String(newReview.name),
            id: String(newReview.id),
            email: String(newReview.email),
            // password: String(newReview.password),
            rating: Number(newReview.rating),
            comment: String(newReview.comment), // Assuming a comment field
          });
          set((state) => ({
            reviews: [...state.reviews, { ...newReview, id: reviewsRef.id }],
          }));
          console.log(reviewsRef.id);
        } catch (error) {
          console.error("Error adding review: ", error);
        }
      },
      editReview: async (reviewId, updatedData) => {
        try {
          const reviewDocRef = doc(db, "reviews", reviewId);

          const reviewDoc = await getDoc(reviewDocRef);

          if (reviewDoc.exists()) {
            await updateDoc(reviewDocRef, updatedData);
            set((state) => ({
              reviews: state.reviews.map((review) =>
                review.id === reviewId ? { ...review, ...updatedData } : review
              ),
            }));
            console.log("Review updated successfully");
          } else {
            console.log("No such review found!");
          }
        } catch (error) {
          console.error("Error editing review: ", error);
        }
      },

      getReviews: async () => {
        try {
          const reviewCollectionRef = collection(db, "reviews");
          const reviewCollection = await getDocs(reviewCollectionRef);
          const reviewsData = reviewCollection.docs.map((doc) => doc.data());

          set(() => ({
            reviews: reviewsData,
          }));
        } catch (error) {
          console.error("Error fetching reviews: ", error);
        }
      },

      getReview: async (reviewId) => {
        try {
          const reviewDocRef = collection(db, "reviews");
          const reviewCollection = await getDocs(reviewDocRef);
          let reviewData = null;
          let foundreview = false;
          reviewCollection.docs.forEach(async (doc) => {
            const data = doc.data();
            if (data.id == reviewId) {
              reviewData = data;
              foundreview = true;
            } else {
              foundreview = true;
            }
          });

          set(() => ({
            review: reviewData, // Set the review data of the found review
            foundReview: foundreview, // Set boolean indicating if the review was found
            reviews: reviewCollection.docs.map((doc) => doc.data()), // Update all reviews in the state
          }));
        } catch (error) {
          console.error("Error fetching review: ", error);
        }
      },
    }),
    {
      name: "review-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useReviewActions = () => ({
  addReview: useReviewStore((state) => state.addReview),
  editReview: useReviewStore((state) => state.editReview),
  getReview: useReviewStore((state) => state.getReview),
  getReviews: useReviewStore((state) => state.getReviews),
});
export const reviewStore = useReviewStore;
