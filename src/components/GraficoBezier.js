import { StyleSheet, View, Dimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";

export default function GraficoBezier({dataSalarios}) {

  let screenWidth = Dimensions.get("window").width

  return (
    <View style={styles.container}>
      <LineChart
        data={dataSalarios}
        width={screenWidth-(screenWidth*0.1)}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "#00FFFF",
          backgroundGradientFromOpacity: 0.1,
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          strokeWidth: 1,
          barPercentage: 0.5,
        }}
        style={{
          borderRadius: 10
        }}
        bezier={true}
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
