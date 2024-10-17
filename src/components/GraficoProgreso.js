import { StyleSheet, View, Dimensions } from 'react-native';
import {ProgressChart} from "react-native-chart-kit";

export default function GraficoProgreso({dataProgreso, colors}) {

  let screenWidth = Dimensions.get("window").width

  return (
    <View style={styles.container}>
      <ProgressChart
        data={dataProgreso}
        width={screenWidth-(screenWidth*0.1)}
        height={300}
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#022173',
          backgroundGradientTo: '#1b3fa0',
          color: (opacity = 1, index) => colors[index] || `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          borderRadius: 10,
        }}
        hideLegend={false}
        strokeWidth={10}
        radius={32}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10
  },
});
