const React = require("react");
const { View } = require("react-native");

module.exports = {
	SafeAreaView: (props) => React.createElement(View, props),
	SafeAreaProvider: ({ children }) => children,
	SafeAreaInsetsContext: {
		Consumer: ({ children }) =>
			children({ top: 0, bottom: 0, left: 0, right: 0 }),
	},
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
	initialWindowMetrics: {
		insets: { top: 0, bottom: 0, left: 0, right: 0 },
		frame: { x: 0, y: 0, width: 390, height: 844 },
	},
};
