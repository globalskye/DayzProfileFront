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