import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const CustomButton = ({
  text,
  onClick,
  className,
  isLoading,
  type,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  type?: string;
}) => {
  return (
    <Button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={isLoading}
      onClick={onClick}
      className={cn("font-semibold px-4 py-2 text-white bg rounded-2xl", className)}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src='/loader.svg'
            alt="loader"
            height={24}
            width={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : text}
    </Button>
  )
}

export default CustomButton

