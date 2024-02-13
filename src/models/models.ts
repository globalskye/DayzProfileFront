export interface ProfileState {
    cftoolsId: string;
    identifier: string;
    displayName: string;
    playState: {
      online: boolean;
      server: {
        game: number;
        id: null | string; // Adjust the type according to your use case
        name: string;
        status: {
          players: number;
          slots: number;
        };
      };
    };
    status: boolean;
  }

  export interface Overview {
    omega: {
      aliases: string[];
      created_at: string;
      playtime: number;
      sessions: number;
      updated_at: string;
    };
    status: boolean;
  }
  
  export interface Ban {
    banList: string;
    issueDate: string;
    reason : string;
  }
 
  export interface BanStatus {
    banned: boolean;
    records: any[]; // You might want to replace 'any' with the actual type of 'records'
    status: boolean;
  }
  
  export interface SteamBans {
    NumberOfGameBans: number;
    NumberOfVACBans: number;
  }
  
  export  interface SteamProfile {
    avatar: string;
    avatarfull: string;
    profileurl: string;
    steamid: string;
    personaname:string;
    timecreated: number;
  }
  
  export interface Steam {
    bans: SteamBans;
    profile: SteamProfile;
    steam64: string;
  }
  
    export interface ProfileInformation {
    overview: Overview;
    bans: Ban[];
    banStatus: BanStatus;
    steam: Steam;
  }
export interface Member {
  CFToolsID: string;
  alias: string;
}

export interface Group {
  id: number;
  groupName: string;
  members?: Member[];
}
