import React, { useRef } from 'react';
import { View, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { captureRef } from 'react-native-view-shot'; // Captura de imagen

export default function GraficoBezier({ dataSalarios }) {
  const chartRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - (screenWidth * 0.1);
  const chartHeight = 300;

  // Función para generar y compartir el PDF
  const generarPDF = async () => {
    try {
      // Capturar el gráfico como imagen
      const uri = await captureRef(chartRef, {
        format: "png",
        quality: 1,
      });

      // Crear una instancia de jsPDF
      const doc = new jsPDF();
      doc.text("Reporte de Salarios", 10, 10);

      // Leer la imagen capturada y agregarla al PDF
      const chartImage = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc.addImage(`data:image/png;base64,${chartImage}`, "PNG", 10, 20, 180, 100);

      // Agregar datos de texto al PDF
      if (dataSalarios && dataSalarios.labels && dataSalarios.datasets[0].data) {
        dataSalarios.labels.forEach((label, index) => {
          const salario = dataSalarios.datasets[0].data[index];
          doc.text(`${label}: C$${salario}`, 10, 140 + index * 10);
        });
      } else {
        throw new Error('Datos de salarios no válidos');
      }

      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_salarios.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
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
      <View ref={chartRef} collapsable={false} style={styles.chartContainer}>
        <LineChart
          data={dataSalarios}
          width={chartWidth}
          height={chartHeight}
          chartConfig={{
            backgroundGradientFrom: "#00FFFF",
            backgroundGradientFromOpacity: 0.1,
            backgroundGradientTo: "#FFFFFF",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          }}
          style={{
            borderRadius: 10,
          }}
          verticalLabelRotation={45}
          bezier
        />
      </View>

      <View style={styles.button}>
        <Button title="Generar y Compartir PDF" onPress={generarPDF} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
});
