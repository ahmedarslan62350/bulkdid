import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IUser } from "@/utils/types";
import { ChangeEvent } from "react";

const General = ({
  user,
  handleInputChange,
  isEditing,
}: {
  user: IUser;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEditing: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            disabled={true}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="walletId">Wallet ID</Label>
          <Input
            id="walletId"
            name="walletId"
            value={user.walletId}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label>Created At</Label>
          <p className="text-sm text-zinc-500">
            {new Date(user.createdAt as Date).toDateString()}
          </p>
        </div>
        <div>
          <Label>Updated At</Label>
          <p className="text-sm text-zinc-500">
            {new Date(user.updatedAt as Date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default General;
