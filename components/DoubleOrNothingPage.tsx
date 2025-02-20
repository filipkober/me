import { Session } from 'next-auth'
import React from 'react'

interface Props {
    session: Session | null;
}
export default function DoubleOrNothingPage({ session }: Props) {
  return (
    <div>
      {session ? (
        <div>Welcome, {session.user?.name}</div>
      ) : (
        <div>Please log in to continue.</div>
      )}
    </div>
  )
}
