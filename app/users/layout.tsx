import getUsers from '@/app/actions/get-users';
import Sidebar from '@/app/components/sidebar/sidebar';
import UserList from '@/app/users/_components/user-list';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className='h-full'>
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
