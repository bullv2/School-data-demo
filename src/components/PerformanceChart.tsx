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
  const { width } = Dimensions.get('window');
  const chartWidth = width - 48; // 24px padding on each side

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 100, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#0a84ff',
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  const pieColors = [
    '#0a84ff', // Blue
    '#30d158', // Green
    '#ff453a', // Red
    '#ff9f0a', // Orange
    '#bf5af2', // Purple
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {type === 'line' ? (
        <LineChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withVerticalLines={false}
          withHorizontalLines={false}
          withDots={true}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
        />
      ) : (
        <PieChart
          data={data.datasets[0].data.map((value, index) => ({
            name: data.legend?.[index] || `Item ${index + 1}`,
            value,
            color: pieColors[index % pieColors.length],
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          }))}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
          absolute
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1c1c1e',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 