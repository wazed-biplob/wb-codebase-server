export interface IUser {
  ip: string | undefined; // From backend or IP service
  userAgent: string;
  language: string;
  platform: string;
  cores: number;
  width: number;
  height: number;
  colorDepth: number;
  currentTime: string; // assuming ISO string or Date.toString()
  timezone: string;
}
