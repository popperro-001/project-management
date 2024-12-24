import { User } from "@/state/api";
import Image from "next/image";

interface Props {
  user: User;
}
export const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          width={32}
          height={32}
          alt="profile picture"
          className="rounded-full"
        />
      )}

      <div className="">
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
