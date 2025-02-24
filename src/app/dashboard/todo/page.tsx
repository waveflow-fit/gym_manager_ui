import Image from 'next/image';

import { CenterAlign } from '@/components/StyledComponents';

const Todo = () => {
  return (
    <CenterAlign>
      <Image
        src='/coming_soon.svg'
        height='500'
        width='500'
        alt='coming soon'
      />
    </CenterAlign>
  );
};

export default Todo;
