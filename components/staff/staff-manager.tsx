"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  createStaff,
  removeStaff,
  resetStaffPassword,
} from "@/lib/actions/staff"

type StaffUser = {
  id: string
  name: string
  email: string
  createdAt: Date
}

type StaffManagerProps = {
  users: StaffUser[]
  currentUserId: string
}

export function StaffManager({ users, currentUserId }: StaffManagerProps) {
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [resetUserId, setResetUserId] = useState<string | null>(null)
  const [resetPassword, setResetPassword] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault()
    setIsCreating(true)
    const result = await createStaff(createForm)
    setIsCreating(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Staff account created")
    setCreateForm({ name: "", email: "", password: "" })
    window.location.reload()
  }

  async function handleReset(userId: string) {
    if (!resetPassword) {
      toast.error("Enter a new password")
      return
    }
    const result = await resetStaffPassword({
      userId,
      password: resetPassword,
    })
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Password updated")
    setResetUserId(null)
    setResetPassword("")
  }

  async function handleRemove(userId: string) {
    if (!window.confirm("Remove this staff account?")) return
    const result = await removeStaff({ userId })
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Staff account removed")
    window.location.reload()
  }

  return (
    <div className="grid gap-8">
      <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
        <CardHeader>
          <CardTitle>Add staff member</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-3" onSubmit={handleCreate}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={createForm.name}
                onChange={(event) =>
                  setCreateForm((prev) => ({ ...prev, name: event.target.value }))
                }
                required
                className="border-white/15 bg-[oklch(0.12_0.03_164)]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={createForm.email}
                onChange={(event) =>
                  setCreateForm((prev) => ({ ...prev, email: event.target.value }))
                }
                required
                className="border-white/15 bg-[oklch(0.12_0.03_164)]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={createForm.password}
                onChange={(event) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                required
                minLength={12}
                className="border-white/15 bg-[oklch(0.12_0.03_164)]"
              />
            </div>
            <Button
              type="submit"
              disabled={isCreating}
              className="w-fit font-extrabold md:col-span-3"
            >
              {isCreating ? "Creating…" : "Create staff account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
        <CardHeader>
          <CardTitle>Staff accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setResetUserId(user.id)}
                      >
                        Reset password
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={user.id === currentUserId}
                        onClick={() => handleRemove(user.id)}
                      >
                        Remove
                      </Button>
                    </div>
                    {resetUserId === user.id ? (
                      <div className="mt-3 flex flex-wrap items-end justify-end gap-2">
                        <Input
                          type="password"
                          placeholder="New password"
                          value={resetPassword}
                          onChange={(event) => setResetPassword(event.target.value)}
                          className="max-w-xs border-white/15 bg-[oklch(0.12_0.03_164)]"
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleReset(user.id)}
                        >
                          Save password
                        </Button>
                      </div>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
