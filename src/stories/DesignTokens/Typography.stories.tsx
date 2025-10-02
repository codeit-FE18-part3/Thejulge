import type { Meta, StoryObj } from '@storybook/nextjs';

const texts = [
  { name: 'caption', label: 'Caption', size: 12, mob: 12 },
  { name: 'body-s', label: 'Body-2 regular', size: 14, mob: 14 },
  { name: 'body-m', label: 'Body-1 bold', size: 16, mob: 14 },
  { name: 'body-l', label: 'Body-1 regular', size: 16, mob: 14 },
  { name: 'modal', label: 'Modal', size: 18, mob: 16 },
  { name: 'heading-s', label: 'h3', size: 20, mob: 16 },
  { name: 'heading-m', label: 'h2', size: 24, mob: 18 },
  { name: 'heading-l', label: 'h1', size: 28, mob: 20 },
];

const tailwindText = [
  'text-caption',
  'text-body-s',
  'text-body-m',
  'text-body-l',
  'text-modal',
  'text-heading-s',
  'text-heading-m',
  'text-heading-l',
];
const meta: Meta = {
  title: 'Design Tokens/Typography',
};
export default meta;

type Story = StoryObj;

export const TextStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {texts.map(t => (
        <p key={t.name} className={`text-${t.name} flex gap-1`}>
          <span className='w-60'>text-{t.name}</span>
          <span className='w-60'>피그마 폰트명: {t.label}</span>
          <span className='w-30'>pc:{t.size}px</span>
          <span className='w-30'>mob:{t.size}px</span>
        </p>
      ))}
    </div>
  ),
};
