import VStack from '@/components/StyledComponents/VStack';

const DrawerContent = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <VStack gap={1.5} height='90%'>
      {children}
    </VStack>
  );
};

export default DrawerContent;
