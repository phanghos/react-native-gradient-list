# react-native-gradient-list
Custom `ScrollView` and `FlatList` components which will render a gradient at the bottom as long as there is scrollable content

## Installation

Using `npm`

`npm i react-native-gradient-list`

This package depends on `react-native-reanimated` (>=2) and `react-native-linear-gradient`, so you will need to install both of them

`npm i react-native-reanimated react-native-linear-gradient`

Make sure to follow the [installation instructions for Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)

## Usage

Both `GradienScrollView` and `GradientFlatList` behave exactly as their built-in RN counterparts, so they accept `ScrollViewProps` and `FlatListProps`, respectively, plus a few custom props.

```js
<GradientScrollView>
  <View>
    <Text>{...}</Text>
  </View>
</GradientScrollView>
```

## Props

| Prop             | Description                                                 |   |   |   |
|------------------|-------------------------------------------------------------|---|---|---|
| `gradientColor`  | Gradient color. It needs to be in HEX format i.e. `#ff0000` |   |   |   |
| `gradientOffset` | Gradient offset from the bottom                             |   |   |   |
|                  |                                                             |   |   |   |
