import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ModernButton } from '../ModernButton';
import { ThemeProvider } from '../../contexts/ThemeContext';

describe('ModernButton', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('renders correctly with title', () => {
    const { getByText } = renderWithTheme(<ModernButton title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(<ModernButton title="Press Me" onPress={onPressMock} />);

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <ModernButton title="Disabled Button" onPress={onPressMock} disabled />,
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithTheme(
      <ModernButton
        title="Styled Button"
        onPress={() => {}}
        style={customStyle}
        testID="styled-button"
      />,
    );

    const button = getByTestId('styled-button');
    expect(button.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('shows loading state', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <ModernButton title="Loading Button" onPress={() => {}} loading testID="loading-button" />,
    );

    // Title should not be visible when loading
    expect(queryByText('Loading Button')).toBeFalsy();
    // Loading indicator should be present
    const button = getByTestId('loading-button');
    expect(button).toBeTruthy();
  });

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'ghost'] as const;

    variants.forEach((variant) => {
      const { getByTestId } = renderWithTheme(
        <ModernButton
          title={`${variant} Button`}
          onPress={() => {}}
          variant={variant}
          testID={`${variant}-button`}
        />,
      );

      expect(getByTestId(`${variant}-button`)).toBeTruthy();
    });
  });
});
