import axios from "axios";
import {Group, ProfileInformation, ProfileState} from "../models/models";
import { authHeader } from "./auth";
import { GET_PROFILES_STATES } from "./urls";

export const getProfileStates = (identifier: string) => {
    return axios
      .get("http://localhost:8080/cftools/states/"+ identifier, { headers: authHeader() })
      .then((response: { data: ProfileState[] }) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error("Error fetching profile states:", error);
        throw error;
      });
  };
  export const getProfileInformation = (cftoolsId: string) => {
    return axios
      .get("http://localhost:8080/cftools/information/"+ cftoolsId, { headers: authHeader() })
      .then((response: { data :  ProfileInformation}) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error("Error fetching profile information:", error);
        throw error;
      });
  };
export const getGroups = () => {
    return axios
        .get("http://localhost:8080/group"  , { headers: authHeader() })
        .then((response: { data :  Group[]}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const createGroup = (groupName : string) => {
    return axios
        .post("http://localhost:8080/group/create/" + groupName, { headers: authHeader() })
        .then((response: { data :  Group}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const deleteGroupProfile = (groupID: string, cftoolsID : string) => {
    return axios
        .delete("http://localhost:8080/group/" + groupID +"/"+cftoolsID, { headers: authHeader() })
        .then((response: { data :  Group}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const addGroupProfile = (groupID: string, cftoolsID : string, alias:string) => {
    return axios
        .post("http://localhost:8080/group/" + groupID +"/"+cftoolsID+"/"+alias, { headers: authHeader() })
        .then((response: { data :  Group}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};