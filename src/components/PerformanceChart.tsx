import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
  }[];
  legend?: string[];
  colors?: string[];
}

interface PerformanceChartProps {
  type: 'line' | 'pie' | 'bar';
  data: ChartData;
  title: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  type,
  data,
  title,
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = width - 64; // Increased padding
  const chartHeight = 180; // Reduced height

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => data.datasets[0].color?.(opacity) || `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#007AFF',
    },
    propsForLabels: {
      fontSize: 10,
    },
    barPercentage: 0.6,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.1)',
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withVerticalLines={true}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={true}
            yAxisInterval={20}
            segments={4}
            fromZero
          />
        );
      case 'pie':
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index] || `Item ${index + 1}`,
              value,
              color: data.colors?.[index] || data.datasets[0].color?.(1) || `rgba(0, 122, 255, 1)`,
              legendFontColor: '#666',
              legendFontSize: 11,
            }))}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
            absolute
          />
        );
      case 'bar':
        return (
          <BarChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              barPercentage: 0.6,
            }}
            style={styles.chart}
            showBarTops={false}
            fromZero
            withInnerLines={true}
            segments={4}
            flatColor={true}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  chartContainer: {
    alignItems: 'center',
    marginHorizontal: -8, // Reduced negative margin
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 