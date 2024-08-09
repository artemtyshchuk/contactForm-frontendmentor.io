export type ContactUsComponentTypes = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  message: string;
  checkbox: boolean;
};

export type NotificationType = {
  active: boolean;
  error: boolean;
  message: string;
};
