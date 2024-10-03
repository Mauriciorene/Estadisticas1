import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import GraficoSalarios from './src/components/GraficoSalarios';
import GraficoGeneros from './src/components/GraficoGeneros';
import Formulario from './src/components/Formulario';
import { collection, getDocs, query } from 'firebase/firestore';

//Importación de conexión a firebase
import db from './database/firebaseconfig';

export default function App() {

  const [bandera, setBandera] = useState(false); // Variable bandera
  const [dataSalarios, setDataSalarios] = useState({
    labels: [],
    datasets: [{ data: [] }] // Inicializa datasets como un array con un objeto
  });
  const [dataGeneros, setDataGeneros] = useState([]); // Para almacenar datos de géneros


  // Carga de datos de salarios
  useEffect(() => {
    const recibirDatosSalarios = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        const nombres = [];
        const salarios = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { nombre, salario } = datosBD;
            nombres.push(nombre); // Agrega nombre a la lista
            salarios.push(salario); // Agrega salario a la lista

        });

        // Actualiza el estado con el formato requerido
        setDataSalarios({
          labels: nombres,
          datasets: [{ data: salarios }]
        });

        console.log({ labels: nombres, datasets: [{ data: salarios }] });
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosSalarios();
  }, [bandera]);

  // Carga de datos de géneros
  useEffect(() => {
    const recibirDatosGeneros = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        let masculino = 0;
        let femenino = 0;

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { genero } = datosBD;

          if (genero === "Masculino") {
            masculino += 1; // Suma para Masculino
          } else if (genero === "Femenino") {
            femenino += 1; // Suma para Femenino
          }
        });

        // Formatear datos para el gráfico de pastel
        const totalData = [
          {
            name: "Masculino",
            population: masculino,
            color: "rgba(131, 167, 234, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          },
          {
            name: "Femenino",
            population: femenino,
            color: "rgba(255, 105, 180, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          }
        ];

        setDataGeneros(totalData);
        console.log(totalData);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosGeneros();
  }, [bandera]);

  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Formulario setBandera={setBandera}/>
        <GraficoSalarios dataSalarios={dataSalarios}/>
        <GraficoGeneros dataGeneros={dataGeneros}/>
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  graphContainer: {
    marginTop: 10,
    padding: 10,
  },
});

