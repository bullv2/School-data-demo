import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
  colors?: string[]; // For pie chart colors
}

interface PerformanceChartProps {
  type: 'line' | 'pie';
  data: ChartData;
  title?: string;
  overlay?: boolean;
  yAxisMin?: number;
  yAxisMax?: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  type,
  data,
  title,
  overlay = false,
  yAxisMin,
  yAxisMax,
}) => {
  const width = Dimensions.get('window').width - (overlay ? 48 : 32);
  const height = 220;

  // Transform data to ensure values stay within bounds
  const boundedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => {
        const min = yAxisMin ?? 0;
        const max = yAxisMax ?? 100;
        return Math.min(Math.max(value, min), max);
      })
    }))
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    decimalPlaces: 1,
    color: (opacity = 1) => overlay 
      ? `rgba(255, 149, 0, ${opacity})`  // Orange for overlay line
      : `rgba(0, 122, 255, ${opacity})`,  // Blue for main line
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: overlay ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
    },
    propsForLabels: {
      fontSize: 12,
      color: overlay ? 'transparent' : '#666',
    },
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <LineChart
          data={boundedData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
          withInnerLines={!overlay}
          withOuterLines={!overlay}
          withHorizontalLines={!overlay}
          withVerticalLines={!overlay}
          withDots={true}
          withShadow={false}
          yAxisInterval={1}
          yAxisLabel=""
          yAxisSuffix=""
          segments={4}
          fromZero={false}
          transparent={true}
        />
      );
    }

    if (type === 'pie') {
      return (
        <PieChart
          data={data.datasets[0].data.map((value, index) => ({
            name: data.labels[index] || `Item ${index + 1}`,
            value,
            color: data.colors?.[index] || `rgba(0, 122, 255, 1)`,
            legendFontColor: '#666',
            legendFontSize: 12,
          }))}
          width={width}
          height={height}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      {title && !overlay && (
        <Text style={styles.title}>{title}</Text>
      )}
      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: -8, // Compensate for chart padding
  },
}); 