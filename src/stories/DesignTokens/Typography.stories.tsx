import type { Meta, StoryObj } from '@storybook/nextjs';

const texts = [
  { name: 'caption', label: 'Caption', size: 12 },
  { name: 'body-s', label: 'Body-2 regular', size: 14 },
  { name: 'body-m', label: 'Body-1 bold', size: 16 },
  { name: 'body-l', label: 'Body-1 regular', size: 16 },
  { name: 'modal', label: 'Modal text', size: 18 },
  { name: 'heading-s', label: 'h3', size: 20 },
  { name: 'heading-m', label: 'h2', size: 24 },
  { name: 'heading-l', label: 'h1', size: 28 },
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
        <p key={t.name} className={`text-${t.name}`}>
          text-{t.name} : {t.size}px - 피그마 기준: {t.label}
        </p>
      ))}
    </div>
  ),
};
