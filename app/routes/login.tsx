// BFF components
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/bff/db.server";
import { commitSession, getSession } from "~/bff/session";

// UI components
import { Box } from "@chakra-ui/react";

// components
import NavbarApp from "~/components/NavbarApp";
import ConnectWallet from "~/components/external/ConnectWallet";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const form = await request.formData();

  const address = form.get("address");
  const connected = form.get("connected");

  if (!address || typeof address !== "string") return null;
  if (!connected || typeof connected !== "string") return null;

  let user;

  try {
    user = await db.user.findFirst({
      where: {
        address: address,
      },
    });

    if (!user) {
      await db.user.create({
        data: {
          address: address.toLowerCase(),
          connected: connected === "true",
        },
      });
    }

    await db.user.update({
      where: {
        address: address,
      },
      data: {
        connected: connected === "true",
      },
    });

    console.log("[login] user:", user);
  } catch (error) {
    console.log("[login] User not found. Creating new user");

    await db.user.create({
      data: {
        address,
      },
    });
  }

  const accessToken = session.get("accessToken");

  session.set("address", address);

  if (!accessToken) {
    return redirect(`/lens`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect(`/dashboard/feed`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Login() {
  return (
    <Box>
      <NavbarApp />
      <ConnectWallet />
    </Box>
  );
}
