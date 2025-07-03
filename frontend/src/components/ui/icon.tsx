interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ className }: IconProps) {
  // Simple implementation for social media icons
  return <span className={className}>@</span>;
}
