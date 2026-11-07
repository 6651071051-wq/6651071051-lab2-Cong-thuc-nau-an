import { useState } from 'react';

interface Props { src: string; name: string; className?: string }

export default function RecipeImage({ src, name, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={`Chưa có ảnh món ${name}`} className={`grid place-items-center bg-emerald-50 text-5xl ${className}`}>
        <span aria-hidden="true">🍲</span>
      </div>
    );
  }
  return <img src={src} alt={`Món ${name}`} loading="lazy" width={640} height={480} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
