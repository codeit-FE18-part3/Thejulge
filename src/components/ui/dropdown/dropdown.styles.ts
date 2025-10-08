export const DROPDOWN_STYLE = {
  base: 'flex-1 text-left min-w-[110px] focus-visible:outline-red-300',
  md: 'base-input !pr-10',
  sm: 'rounded-md bg-gray-100 py-1.5 pl-3 pr-7 text-body-s font-bold',
} as const;
export const DROPDOWN_ICON_STYLE = {
  base: 'absolute top-1/2 -translate-y-1/2',
  md: 'right-5',
  sm: 'right-3',
} as const;

export const DROPDOWN_ITEM_STYLE = {
  base: 'border-b-[1px] last:border-b-0 block w-full whitespace-nowrap border-gray-200 px-5 text-body-s hover:bg-gray-100',
  md: 'py-3',
  sm: 'py-2',
} as const;
