import Image from "next/image";

export function Logo({
  width = 24,
  height = 24,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <>
      <Image
        src="/logo-light.png"
        alt="Logo"
        width={width}
        height={height}
        unoptimized
        priority
        className={`object-contain dark:hidden ${className}`}
      />
      <Image
        src="/logo-dark.png"
        alt="Logo"
        width={width}
        height={height}
        unoptimized
        priority
        className={`object-contain hidden dark:block ${className}`}
      />
    </>
  );
}
