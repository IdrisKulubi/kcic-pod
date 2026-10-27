import { StaffManager } from "@/components/staff/staff-manager"
import { requireStaff } from "@/lib/auth-guard"
import { getStaffUsers } from "@/lib/queries"

export default async function StaffAccountsPage() {
  const session = await requireStaff()
  const users = await getStaffUsers()

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-black">Staff</h2>
        <p className="mt-2 text-sm text-[oklch(0.78_0.02_92)]">
          Add colleagues, reset passwords, or remove accounts. All staff have the
          same permissions.
        </p>
      </div>
      <StaffManager users={users} currentUserId={session.user.id} />
    </div>
  )
}
