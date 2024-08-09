"use client";

import { useState } from "react";

import { UserData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "@/app/(main)/users/[username]/EditProfileDialog";

interface EditProfileButtonProps {
  user: UserData;
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        Edit profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}
