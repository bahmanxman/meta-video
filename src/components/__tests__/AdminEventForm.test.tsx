import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminEventForm } from '../AdminEventForm';

describe('AdminEventForm', () => {
  it('renders asset metadata fields and timecode event inputs', () => {
    render(<AdminEventForm />);

    expect(screen.getByLabelText(/asset title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/match name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timestamp/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add timecode event/i }),
    ).toBeInTheDocument();
  });

  it('accepts asset title, match name, and price input values', async () => {
    const user = userEvent.setup();
    render(<AdminEventForm />);

    const titleInput = screen.getByLabelText(/asset title/i);
    const matchInput = screen.getByLabelText(/match name/i);
    const priceInput = screen.getByLabelText(/price/i);

    await user.type(titleInput, 'Der Klassiker — Extended Highlights');
    await user.type(matchInput, 'Bayern München vs Borussia Dortmund');
    await user.clear(priceInput);
    await user.type(priceInput, '525.5');

    expect(titleInput).toHaveValue('Der Klassiker — Extended Highlights');
    expect(matchInput).toHaveValue('Bayern München vs Borussia Dortmund');
    expect(priceInput).toHaveValue(525.5);
  });

  it('appends a custom timecode event to the local events list', async () => {
    const user = userEvent.setup();
    render(<AdminEventForm />);

    await user.selectOptions(screen.getByLabelText(/event type/i), 'GOAL');
    await user.type(
      screen.getByLabelText(/description/i),
      'Header from the edge of the box',
    );
    await user.clear(screen.getByLabelText(/timestamp/i));
    await user.type(screen.getByLabelText(/timestamp/i), '127');

    await user.click(screen.getByRole('button', { name: /add timecode event/i }));

    const list = screen.getByRole('list', { name: /logged timecode events/i });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('GOAL');
    expect(items[0]).toHaveTextContent('Header from the edge of the box');
    expect(items[0]).toHaveTextContent('127');
  });

  it('accumulates multiple timecode events in local list state', async () => {
    const user = userEvent.setup();
    render(<AdminEventForm />);

    await user.selectOptions(screen.getByLabelText(/event type/i), 'GOAL');
    await user.type(screen.getByLabelText(/description/i), 'Opening goal');
    await user.clear(screen.getByLabelText(/timestamp/i));
    await user.type(screen.getByLabelText(/timestamp/i), '42');
    await user.click(screen.getByRole('button', { name: /add timecode event/i }));

    await user.selectOptions(screen.getByLabelText(/event type/i), 'YELLOW_CARD');
    await user.clear(screen.getByLabelText(/description/i));
    await user.type(screen.getByLabelText(/description/i), 'Tactical foul');
    await user.clear(screen.getByLabelText(/timestamp/i));
    await user.type(screen.getByLabelText(/timestamp/i), '1980');
    await user.click(screen.getByRole('button', { name: /add timecode event/i }));

    const items = within(
      screen.getByRole('list', { name: /logged timecode events/i }),
    ).getAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('GOAL');
    expect(items[0]).toHaveTextContent('Opening goal');
    expect(items[0]).toHaveTextContent('42');
    expect(items[1]).toHaveTextContent('YELLOW_CARD');
    expect(items[1]).toHaveTextContent('Tactical foul');
    expect(items[1]).toHaveTextContent('1980');
  });

  it('clears timecode event inputs after adding an event', async () => {
    const user = userEvent.setup();
    render(<AdminEventForm />);

    await user.selectOptions(screen.getByLabelText(/event type/i), 'RED_CARD');
    await user.type(screen.getByLabelText(/description/i), 'Second booking');
    await user.clear(screen.getByLabelText(/timestamp/i));
    await user.type(screen.getByLabelText(/timestamp/i), '3015');
    await user.click(screen.getByRole('button', { name: /add timecode event/i }));

    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/timestamp/i)).toHaveValue(null);
  });

  it('should display validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<AdminEventForm />);
    
    const submitButton = screen.getByRole('button', { name: /publish package/i });
    await user.click(submitButton);
    
    expect(await screen.findByText(/title must be at least 5 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/match name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price must be at least/i)).toBeInTheDocument();
  });
});
