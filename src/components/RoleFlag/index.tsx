'use client';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';

const RoleFlag = ({
  children,
  allowedFor,
  fallback = null,
}: {
  children: React.ReactNode;
  allowedFor: EUserRole;
  fallback?: React.ReactNode;
}) => {
  const { session, isLoading } = useSession();
  if (isLoading || !session?.role) {
    return null;
  }
  if (allowedFor && session.role !== allowedFor) {
    return fallback;
  }
  return children;
};

export default RoleFlag;
