import { fireEvent, render } from '@testing-library/react';
import StockCard from '../components/Dashboard/StockCard';


test('renders StockCard without crashing', () => {
  render(<StockCard symbol="AAPL" onSave={() => {}} onDelete={() => {}} />);
});
test('renders stock data when available', () => {
    render(<StockCard symbol="AAPL" onSave={() => {}} onDelete={() => {}} />);
  });
  test('handles save and delete actions', () => {
    const onSaveMock = jest.fn();
    const onDeleteMock = jest.fn();
  
    const { getByText } = render(
      <StockCard symbol="AAPL" onSave={onSaveMock} onDelete={onDeleteMock} />
    );
  
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalledWith('AAPL');
  
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith('AAPL');
  });