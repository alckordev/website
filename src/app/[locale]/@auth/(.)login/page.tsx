"use client";

import { Login } from "@/components/login";
import { useRouter } from "@/i18n/navigation";
import { Modal } from "@mantine/core";

export default function Page() {
  const router = useRouter();

  return (
    <Modal
      opened
      onClose={() => router.back()}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Login />
    </Modal>
  );
}
