// app/canvas/[roomId]/page.tsx
'use client';

import { RoomCanvas } from "@/components/RoomCanvas";
import { use } from 'react'; // Import the `use` hook from React

interface Props {
  // In Next.js 15+, params is a Promise, even for client components
  params: Promise<{ roomId: string }>;
}

export default function Page({ params }: Props) {
  // Use React.use() to unwrap the Promise
  const resolvedParams = use(params);

  return <RoomCanvas roomId={resolvedParams.roomId} />;
}