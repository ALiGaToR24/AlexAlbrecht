export type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

export type UserProfile = {
  firstName?: string;
  lastName?: string;
  address?: string;
  plz?: string;
  city?: string;
};

export type Student = {
  _id: any;                  // ObjectId или строка (API может вернуть по-разному)
  email: string;
  phone?: string;
  role: "STUDENT";
  expiresAt?: string;
  createdAt?: string;
  profile?: UserProfile;
};
