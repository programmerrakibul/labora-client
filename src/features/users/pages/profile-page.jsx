import Container from "@/components/shared/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEnumByValue, USER_ROLE } from "@/constants/enums";
import useAuth from "@/stores/auth";
import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "../components/edit-profile-dialog";

const ProfilePage = () => {
  const user = useAuth((s) => s.user);
  const role = getEnumByValue(USER_ROLE, user?.role);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <Button onClick={() => setEditOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-xl font-bold">
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <AvatarFallback>
                  {user?.name.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              {role && (
                <Badge variant="secondary" className={role.color}>
                  {role.label}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>
              {[user?.city, user?.country].filter(Boolean).join(", ") ||
                "Not provided"}
            </span>
          </div>
          {user?.address && (
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{user.address}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
    </Container>
  );
};

export default ProfilePage;
