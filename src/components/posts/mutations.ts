import { useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "@/components/posts/editor/actions";
import { PostsPage } from "@/lib/types";

// This function defines a custom hook that manages the submission of a post.
export function useSubmitPostMutation() {
  // Get the toast function for displaying notifications
  const { toast } = useToast();

  // Get the query client to manage and interact with the query cache
  const queryClient = useQueryClient();

  // Create a mutation using useMutation hook from react-query
  const mutation = useMutation({
    // The function to call when the mutation is triggered
    mutationFn: submitPost,

    // This function runs when the mutation is successful
    onSuccess: async (newPost) => {
      // Define the filter to identify the query we need to update
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      // Cancel any ongoing queries that match the filter to prevent conflicts
      await queryClient.cancelQueries(queryFilter);

      // Update the cached data for the queries that match the filter
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          // Get the first page of the old data
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            // If there is data, update the cache with the new post added to the beginning
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      // Invalidate queries that match the filter but do not have data
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      // Display a success toast notification
      toast({
        description: "Post created successfully",
      });
    },

    // This function runs when the mutation fails
    onError(error) {
      console.error(error);
      // Display an error toast notification
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });

  // Return the mutation object so it can be used by components
  return mutation;
}
