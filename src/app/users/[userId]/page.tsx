export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <div>My Post: {userId}</div>;
}
