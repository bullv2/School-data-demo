import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
  }[];
  legend?: string[];
}

interface PerformanceChartProps {
  type: 'line' | 'pie';
  data: ChartData;
  title: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  type,
  data,
  title,
}) => {
  const screenWidth = Dimensions.get('window').width - 32; // Padding on both sides

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 100, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {type === 'line' ? (
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      ) : (
        <PieChart
          data={data.datasets[0].data.map((value, index) => ({
            name: data.legend?.[index] || `Item ${index + 1}`,
            value,
            color: `hsl(${(index * 360) / data.datasets[0].data.length}, 70%, 50%)`,
          }))}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 