import { StyleSheet, View, Dimensions } from 'react-native';
import {BarChart} from "react-native-chart-kit";

export default function GraficoSalarios({dataSalarios}) {

  let screenWidth = Dimensions.get("window").width

  return (
    <View style={styles.container}>
      <BarChart
        data={dataSalarios}
        width={screenWidth-(screenWidth*0.1)}
        height={300}
        yAxisLabel="C$"
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
        verticalLabelRotation={45}
        withHorizontalLabels={true}
        showValuesOnTopOfBars={true}
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
