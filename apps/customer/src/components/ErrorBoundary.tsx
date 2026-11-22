import { colors, spacing } from "@haulix/design-tokens";
import { customerLogger } from "@haulix/logger";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * Root error boundary for the HAULIX Customer app.
 * Catches unhandled render errors and shows a minimal recovery UI.
 *
 * Future: integrate crash reporter via registerCrashReporter() from @haulix/logger.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    customerLogger.error("Unhandled error in component tree", error);
    customerLogger.debug("Component stack", {
      componentStack: info.componentStack,
    });
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {__DEV__ ? (this.state.error?.message ?? "Unknown error") : "Please restart the app."}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[6],
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: spacing[3],
  },
  message: {
    color: colors.secondaryText,
    fontSize: 14,
    textAlign: "center",
    marginBottom: spacing[8],
  },
  button: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
  },
  buttonText: {
    color: colors.background,
    fontWeight: "600",
    fontSize: 15,
  },
});
