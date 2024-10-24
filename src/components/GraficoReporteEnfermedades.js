import { StyleSheet, View, Dimensions, ScrollView, Alert, Button } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos

export default function GraficoReporteEnfermedades({ dataReporteEnfermedades }) {

  const screenWidth = Dimensions.get("window").width;
  const squareSize = 30;
  const numDays = 365;

  // Función para personalizar las etiquetas de los meses en el gráfico
  const getMonthLabel = (monthIndex) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthIndex];
  };

  // Función que maneja el evento de presionar un cuadrado en el gráfico (un día específico)
  const handleDayPress = (day) => {
    Alert.alert(`Reportes`, `Fecha: ${day.date}\nCantidad: ${day.count}`);
  };

  // Función para generar y compartir el PDF
  const generarPDF = async () => {
    try {
      // Crear una instancia de jsPDF
      const doc = new jsPDF();

      // Agregar título al PDF
      doc.text("Reporte de Enfermedades", 10, 10);

      // Verificar si dataReporteEnfermedades existe y agregar los datos al PDF
      if (dataReporteEnfermedades && dataReporteEnfermedades.length > 0) {
        dataReporteEnfermedades.forEach((reporte, index) => {
          doc.text(`${reporte.date}: ${reporte.count} casos`, 10, 20 + index * 10); // Formato de los datos
        });
      } else {
        throw new Error('Datos de reportes de enfermedades no válidos');
      }

      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      // Definir la ruta temporal para el archivo PDF en el sistema de archivos del dispositivo
      const fileUri = `${FileSystem.documentDirectory}reporte_enfermedades.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(fileUri);

    } catch (error) {
      console.error("Error al generar o compartir el PDF: ", error);
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <ContributionGraph
          values={dataReporteEnfermedades}
          endDate={new Date("2017-12-30")}
          numDays={numDays}
          width={1680}
          height={300}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientTo: "#f0f0f0",
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          gutterSize={0.4}
          bgColor={"transparent"}
          squareSize={squareSize}
          getMonthLabel={getMonthLabel}
          onDayPress={handleDayPress}
          style={{
            borderRadius: 10,
          }}
        />

      </ScrollView>

      {/* Botón para generar y compartir PDF */}
      <Button title="Generar y Compartir PDF" onPress={generarPDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
