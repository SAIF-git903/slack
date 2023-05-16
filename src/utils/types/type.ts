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
  phoneNum?: string;
  photoURL?: string;
}
