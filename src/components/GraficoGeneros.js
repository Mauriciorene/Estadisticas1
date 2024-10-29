import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions, Button, Alert } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { captureRef } from 'react-native-view-shot'; // Para capturar el gráfico como imagen

export default function GraficoGeneros({ dataGeneros }) {
  const chartRef = useRef();
  const screenWidth = Dimensions.get("window").width;

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
      doc.text("Reporte de Géneros", 10, 10);

      // Leer la imagen capturada y agregarla al PDF
      const chartImage = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc.addImage(`data:image/png;base64,${chartImage}`, "PNG", 10, 20, 180, 100);

      // Agregar datos de texto al PDF
      if (dataGeneros && dataGeneros.length > 0) {
        dataGeneros.forEach((genero, index) => {
          doc.text(`${genero.name}: ${genero.population}`, 10, 130 + index * 10); // Ajustar posición
        });
      } else {
        throw new Error('Datos de géneros no válidos');
      }

      // Guardar el archivo PDF
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_generos.pdf`;

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
        <PieChart
          data={dataGeneros}
          width={screenWidth - (screenWidth * 0.1)}
          height={300}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientTo: "#f0f0f0",
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          }}
          accessor={"population"}
          paddingLeft={45}
          backgroundColor={"transparent"}
          style={{
            borderRadius: 10,
          }}
        />
      </View>

      {/* Botón para generar y compartir PDF */}
      <Button title="Generar y Compartir PDF" onPress={generarPDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
