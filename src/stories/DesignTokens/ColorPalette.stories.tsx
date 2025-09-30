import type { Meta, StoryObj } from '@storybook/nextjs';

const colors = [
  'gray-50',
  'gray-100',
  'gray-200',
  'gray-300',
  'gray-400',
  'gray-500',
  'red-100',
  'red-200',
  'red-300',
  'red-400',
  'blue-100',
  'blue-200',
  'green-100',
  'green-200',
  'black',
  'white',
  'modal-frame',
  'modal-dimmed',
];

const meta: Meta = {
  title: 'Design Tokens/Colors',
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
      {colors.map(color => (
        <div key={color} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '100%',
              height: '60px',
              borderRadius: '8px',
              backgroundColor: `var(--${color})`,
              border: '1px solid #ccc',
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '14px' }}>{color}</p>
        </div>
      ))}
    </div>
  ),
};
