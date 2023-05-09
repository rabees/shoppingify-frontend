import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ItemServices from "../services/ItemServices";

export const useAddNewItem = () => {
  const queryClient = useQueryClient();
  return useMutation(ItemServices.postItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation(ItemServices.deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetAllItems = () => {
  return useQuery(["items"], ItemServices.getItems, {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};

export const useGetCategories = () => {
  return useQuery(["categories"], ItemServices.getCategories, {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};

export const useGetSingleItem = (itemId) => {
  return useQuery([itemId], ItemServices.getSingleItem, {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};
