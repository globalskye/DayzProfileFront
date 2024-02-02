import axios from "axios";
import { ProfileState } from "../models/models";
import { authHeader } from "./auth";
import { GET_PROFILES_STATES } from "./urls";

export const getProfileStates = (id: string) => {
    return axios
      .get(GET_PROFILES_STATES + id, { headers: authHeader() })
      .then((response: { data: ProfileState }) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error("Error fetching profile states:", error);
        throw error;
      });
  };
  