import Sidebar from '@/app/components/sidebar/sidebar';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
}
