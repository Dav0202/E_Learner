export interface JwtToken {
  educator: boolean;
  exp: number;
  iat: number;
  jti: string;
  student: boolean;
  token_type: string;
  user_id: number;
  email: string;
  username: string;
}
