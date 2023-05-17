export interface ItemDropDownProps {
  title: string;
  isPlus: boolean;
}

export interface SideBarListItemProps {
  isMessage: boolean;
  listTitle: string;
  UserId?: string;
  onClick?: () => void;
  profilePic?: string;
  phoneNum?: string | null;
  photoURL?: string;
  email?: string;
}
