import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
/**
 * Tailwind 클래스 이름을 안전하게 합쳐주는 함수
 * - clsx: 조건부 class 병합
 * - twMerge: Tailwind 규칙 기반 충돌 해결
 * @example <div className={cn("p-4", isActive && "bg-blue-500", "bg-blue-400")} />
 */

const twMergeCustom = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'caption',
            'modal',
            'body-s',
            'body-m',
            'body-l',
            'heading-s',
            'heading-m',
            'heading-l',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs));
}
