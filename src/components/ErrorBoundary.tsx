import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch JavaScript errors in child component tree
 * @component
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Ionicons name="alert-circle" size={64} color="#FF6B6B" />
              <Text style={styles.title}>Oops! Something went wrong</Text>
              <Text style={styles.subtitle}>
                We&apos;re sorry for the inconvenience. The app encountered an unexpected error.
              </Text>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={this.handleReset}>
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.resetButtonText}>Try Again</Text>
            </TouchableOpacity>

            {__DEV__ && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorDetailsTitle}>Error Details (Development Only)</Text>

                {error && (
                  <View style={styles.errorSection}>
                    <Text style={styles.errorLabel}>Error:</Text>
                    <Text style={styles.errorText}>{error.toString()}</Text>
                  </View>
                )}

                {errorInfo && (
                  <View style={styles.errorSection}>
                    <Text style={styles.errorLabel}>Component Stack:</Text>
                    <ScrollView horizontal style={styles.stackContainer}>
                      <Text style={styles.stackText}>{errorInfo.componentStack}</Text>
                    </ScrollView>
                  </View>
                )}

                {error?.stack && (
                  <View style={styles.errorSection}>
                    <Text style={styles.errorLabel}>Stack Trace:</Text>
                    <ScrollView horizontal style={styles.stackContainer}>
                      <Text style={styles.stackText}>{error.stack}</Text>
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resetButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  errorDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  errorSection: {
    marginBottom: 16,
  },
  errorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#333333',
    fontFamily: 'monospace',
  },
  stackContainer: {
    maxHeight: 150,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    padding: 8,
  },
  stackText: {
    fontSize: 10,
    color: '#333333',
    fontFamily: 'monospace',
  },
});
