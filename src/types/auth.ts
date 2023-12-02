export type AdminInfo = {
  userName: string;
  name: string;
  hotelId: number;
  role: number;
  id: number;
  lastSeen: string;
};

export type LoginInfo = {
  admin: any;
  token: string;
};
