import axios from "axios";
import {Group, ProfileInformation, ProfileState} from "../models/models";
import { authHeader } from "./auth";
import { GET_PROFILES_STATES } from "./urls";
const host = "https://api.global01developing.darkrust.site"
//const host = "http://localhost:8080"
export const getProfileStates = (identifier: string) => {
    return axios
      .get(host + "/cftools/states/"+ identifier, { headers: authHeader() })
      .then((response: { data: ProfileState[] }) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error("Error fetching profile states:", error);
        throw error;
      });
  };
export const refreshGroupInformation = (groupID: string) => {
    return axios
        .get(host + "/group/refresh/"+ groupID, { headers: authHeader() })
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
      .get(host +"/cftools/information/"+ cftoolsId, { headers: authHeader() })
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
        .get(host + "/group"  , { headers: authHeader() })
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
        .post(host+"/group/create/" + groupName, { headers: authHeader() },{ headers: authHeader() })
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
        .delete(host +"/group/delete/" + groupID +"/"+cftoolsID, { headers: authHeader() })
        .then((response: { data :  Group}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const addGroupProfile = (groupID: string, cftoolsID : string, alias:string) => {
    var url = host +"/group/add/" + groupID +"/"+cftoolsID+"/"+alias
    return axios
        .post(url, { headers: authHeader() },{ headers: authHeader() })
        .then((response: { data :  Group}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const getGroupProfileInformation = (groupID: string) => {
    return axios
        .get(host+"/group/information/" + groupID , { headers: authHeader() })
        .then((response: { data :  ProfileState[]}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};
export const deleteGroupByID = (groupID: string) => {
    return axios
        .delete(host+"/group/" + groupID , { headers: authHeader() })
        .then((response: { data :  ProfileState[]}) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("Error fetching profile information:", error);
            throw error;
        });
};