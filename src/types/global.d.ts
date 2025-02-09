interface IBasicModelProps {
  id?: string;
  metadata: Record<string, any>;
}

interface IUser extends IBasicModelProps {
  name: string;
  email: string;
  google_id: string;
  role: EUserRole;
  image: string;
  jwt: string;
  password: string;
}

interface IHealthProfile extends IBasicModelProps {
  user_id: string;
  blood_pressure?: string;
  allergies?: string;
  weight?: number;
  age?: number;
  height?: number;
  average_sleeping_time?: number;
  eating_preference?: string;
  diabetes?: boolean;
}

interface IInvite extends IBasicModelProps {
  invited_by_id: string; // Trainer id
  invite_to_email: string; // email if of person invite sent to
  invite_status: EInviteStatus;
  is_deleted: boolean;
}

interface ReducerAction<T = any> {
  payload?: T;
  type?: string;
}
