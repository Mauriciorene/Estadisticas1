import { StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

export default function GraficoReporteEnfermedades({ dataReporteEnfermedades }) {


  const screenWidth = Dimensions.get("window").width;
  // Definimos el tamaño de cada cuadrado del gráfico
  const squareSize = 30;
  // Definimos el número total de días que se mostrarán en el gráfico (365 días = 1 año)
  const numDays = 365;

  // Función para personalizar las etiquetas de los meses en el gráfico
  const getMonthLabel = (monthIndex) => {
    // Array de nombres de meses en español
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    // Devuelve el nombre del mes basado en su índice (0 para Enero, 11 para Diciembre)
    return months[monthIndex];
  };

  // Función que maneja el evento de presionar un cuadrado en el gráfico (un día específico)
  const handleDayPress = (day) => {
    // `day` es un objeto con dos propiedades: `date` (fecha) y `count` (valor asociado a ese día)
    // Mostramos una alerta con la fecha y el valor cuando se presiona un día
    Alert.alert(`Reportes`, `Fecha: ${day.date}\nCantidad: ${day.count}`);
  };

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <ContributionGraph
          values={dataReporteEnfermedades}  // Datos del gráfico (fecha y valor)
          endDate={new Date("2017-12-30")}  // Fecha final para el gráfico
          numDays={numDays}  // Número de días a mostrar en el gráfico
          width={1680}  // Ancho del gráfico (ajustado para desplazar)
          height={300}  // Altura del gráfico
          chartConfig={{
            backgroundColor: "#fff",  // Color de fondo del gráfico
            backgroundGradientFrom: "#f0f0f0",  // Color inicial del gradiente de fondo
            backgroundGradientTo: "#f0f0f0",    // Color final del gradiente de fondo
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,  // Color de los cuadrados con transparencia
            strokeWidth: 2,  // Grosor de las líneas del gráfico
          }}
          gutterSize={0.4}  // Espaciado entre los cuadrados del gráfico
          bgColor={"transparent"}  // Fondo del gráfico transparente
          squareSize={squareSize}  // Tamaño de los cuadrados en el gráfico
          getMonthLabel={getMonthLabel}  // Función para personalizar las etiquetas de los meses
          onDayPress={handleDayPress}  // Callback para manejar la acción de presionar un día
          style={{
            borderRadius: 10,  // Bordes redondeados en el gráfico
          }}
        />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
