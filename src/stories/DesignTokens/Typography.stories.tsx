import type { Meta, StoryObj } from '@storybook/nextjs';

const texts = [
  { name: 'caption', label: 'Caption text', size: 12 },
  { name: 'body-s', label: 'Body Small', size: 14 },
  { name: 'body-m', label: 'Body Medium', size: 16 },
  { name: 'body-l', label: 'Body Large', size: 16 },
  { name: 'modal', label: 'Modal text', size: 18 },
  { name: 'heading-s', label: 'Heading Small', size: 20 },
  { name: 'heading-m', label: 'Heading Medium', size: 24 },
  { name: 'heading-l', label: 'Heading Large', size: 28 },
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
          text-{t.name} : {t.size}px - 가나다 ABC abc 123
        </p>
      ))}
    </div>
  ),
};
