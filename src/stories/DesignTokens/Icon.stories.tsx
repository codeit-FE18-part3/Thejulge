import type { Meta, StoryObj } from '@storybook/react';
import { ICONS, ICON_SIZES, type IconName, type IconSize } from '@/constants/icon';
import { Icon } from '@/components/ui';

const TAILWIND_COLORS = [
  'bg-gray-50',
  'bg-gray-100',
  'bg-gray-200',
  'bg-gray-300',
  'bg-gray-400',
  'bg-gray-500',
  'bg-red-100',
  'bg-red-200',
  'bg-red-300',
  'bg-red-400',
  'bg-blue-100',
  'bg-blue-200',
  'bg-green-100',
  'bg-green-200',
  'bg-black',
  'bg-white',
];

const meta: Meta<typeof Icon> = {
  title: 'Design Tokens/Icon',
  component: Icon,
  argTypes: {
    iconName: {
      control: 'select',
      options: Object.keys(ICONS) as IconName[],
    },
    iconSize: {
      control: 'select',
      options: Object.keys(ICON_SIZES) as IconSize[],
    },
    className: {
      control: 'select',
      options: TAILWIND_COLORS,
    },
    ariaLabel: { control: 'text' },
  },
  args: {
    iconName: 'clock',
    iconSize: 'md',
    className: 'bg-black',
    ariaLabel: 'icon',
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * 모든 아이콘 목록 보기
 */
export const AllIcons: Story = {
  args: {
    className: 'bg-black',
  },
  render: args => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 100px)', gap: '16px' }}>
      {(Object.keys(ICONS) as IconName[]).map(name => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Icon
            iconName={name}
            iconSize='md'
            className={`mx-auto ${args.className}`}
            ariaLabel={name}
          />
          <div style={{ marginTop: '8px', fontSize: '12px' }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};

/**
 * 사이즈별 아이콘 비교
 */
export const Sizes: Story = {
  args: {
    iconName: 'close',
    className: 'bg-black',
  },
  render: args => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {(Object.keys(ICON_SIZES) as IconSize[]).map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon
            iconName={args.iconName}
            iconSize={size}
            className={`mx-auto ${args.className}`}
            ariaLabel={size}
          />
          <div style={{ marginTop: '8px', fontSize: '12px' }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};
