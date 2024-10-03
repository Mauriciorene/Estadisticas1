import { StyleSheet, View, Dimensions } from 'react-native';
import { PieChart } from "react-native-chart-kit";

export default function GraficoGeneros({ dataGeneros }) {

  let screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <PieChart
        data={dataGeneros}
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
            color: (opacity = 1) => `rgba(102, 204, 255, ${opacity})`,
        }}
        accessor={"population"}
        paddingLeft={45}
        backgroundColor={"transparent"}
        style={{
          borderRadius: 10
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
});
