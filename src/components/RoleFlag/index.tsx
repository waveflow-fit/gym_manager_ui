'use client';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';

const RoleFlag = ({
  children,
  allowedFor,
}: {
  children: React.ReactNode;
  allowedFor?: EUserRole;
}) => {
  const { session, isLoading } = useSession();
  if (isLoading || (allowedFor && session?.role !== allowedFor)) {
    return null;
  }
  return children;
};

export default RoleFlag;
