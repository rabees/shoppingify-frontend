import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ListServices from "../services/ListServices";

export const useCreateShopList = () => {
  const queryClient = useQueryClient();
  return useMutation(ListServices.createList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["shopLists"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetAllLists = () => {
  return useQuery(["lists"], ListServices.getLists, {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};

export const useGetSingleList = (id) => {
  return useQuery([id], () => ListServices.getSingleList(id), {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};

export const useGetTopSaleByField = (field) => {
  return useQuery([field], () => ListServices.getTopSaleByField(field), {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};

export const useGetTopSaleByMonth = () => {
  return useQuery(["monthSells"], ListServices.getTopSelledByMonth, {
    onSuccess: () => {
      console.log("Fetch successfully");
    },
    onError: () => {
      console.log("Error fetching items");
    },
  });
};
