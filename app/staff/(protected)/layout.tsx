import { StaffShell } from "@/components/staff/staff-shell"
import { requireStaff } from "@/lib/auth-guard"

export default async function StaffProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireStaff()

  return (
    <StaffShell
      userName={session.user.name}
      userEmail={session.user.email}
    >
      {children}
    </StaffShell>
  )
}
