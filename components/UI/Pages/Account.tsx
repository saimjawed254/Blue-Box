"use client";

import { User } from "@/src/db/schema/users";
import "./Account.css";
import { Poppins } from "next/font/google";
import { SignOutButton } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "500", "400", "200"],
});

type Props = {
  userData: User;
};

export default function AccountPage({ userData }: Props) {
  return (
    <div className={`dashboard ${poppins.className}`}>
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">Account</div>

        <div className="ds-user-name">{userData.name}</div>
        <div className="ds-user-email">{userData.email}</div>
        <div className="ds-info-box">
          <div className="ds-info-box-header">Pincode</div>
          <div className="ds-info-box-content">{userData.pincode}</div>
        </div>
        <div className="ds-info-box">
          <div className="ds-info-box-header">Address</div>
          <div className="ds-info-box-content">{userData.address}</div>
        </div>
        <div className="ds-info-box">
          <div className="ds-info-box-header">Account created</div>
          <div className="ds-info-box-content">
            {userData.created_at?.toLocaleDateString()}
          </div>
        </div>

        <div className="ds-logout">
          <SignOutButton>
            <div className="ds-logout-button">Logout</div>
          </SignOutButton>
        </div>
        <div className="ds-buffer"></div>
      </div>
    </div>
  );
}
