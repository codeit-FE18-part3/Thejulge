import type { Meta, StoryObj } from '@storybook/nextjs';

const texts = [
  { name: 'text-caption', label: 'Caption', size: 12, mob: 12 },
  { name: 'text-body-s', label: 'Body-2 regular', size: 14, mob: 14 },
  { name: 'text-body-m', label: 'Body-1 bold', size: 16, mob: 14 },
  { name: 'text-body-l', label: 'Body-1 regular', size: 16, mob: 14 },
  { name: 'text-modal', label: 'Modal', size: 18, mob: 16 },
  { name: 'text-heading-s', label: 'h3', size: 20, mob: 16 },
  { name: 'text-heading-m', label: 'h2', size: 24, mob: 18 },
  { name: 'text-heading-l', label: 'h1', size: 28, mob: 20 },
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
        <p key={t.name} className={`${t.name} flex gap-1`}>
          <span className='w-60'>{t.name}</span>
          <span className='w-60'>피그마 폰트명: {t.label}</span>
          <span className='w-30'>pc:{t.size}px</span>
          <span className='w-30'>mob:{t.size}px</span>
        </p>
      ))}
    </div>
  ),
};
