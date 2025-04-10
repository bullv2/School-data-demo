import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
}

interface PerformanceChartProps {
  type: 'line' | 'pie' | 'bar';
  data: ChartData;
  title?: string;
  overlay?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  type,
  data,
  title,
  overlay = false,
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = width - 80;
  const chartHeight = 220;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => data.datasets[0].color?.(opacity) || `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: data.datasets[0].strokeWidth || 2,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: 4,
      strokeWidth: 2,
      stroke: '#007AFF',
    },
    propsForLabels: {
      fontSize: 11,
      fontWeight: '500',
    },
    barPercentage: 0.6,
    propsForBackgroundLines: {
      strokeWidth: 1,
      strokeDasharray: [], // Solid lines
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
            style={overlay ? {
              position: 'absolute',
              top: 0,
              left: 0,
            } : styles.chart}
            withInnerLines={!overlay}
            withOuterLines={!overlay}
            withVerticalLabels={!overlay}
            withHorizontalLabels={!overlay}
            withDots
            withShadow={false}
            transparent={true}
            segments={4}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index] || `Item ${index + 1}`,
              value,
              color: (data as any).colors?.[index] || data.datasets[0].color?.(1) || `rgba(0, 122, 255, 1)`,
              legendFontColor: '#666',
              legendFontSize: 12,
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
              fillShadowGradientFrom: 'rgba(0, 122, 255, 0.8)',
              fillShadowGradientTo: 'rgba(0, 122, 255, 0.8)',
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
    <View style={[
      styles.container,
      overlay && {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
      }
    ]}>
      {!overlay && title && <Text style={styles.title}>{title}</Text>}
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
    padding: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  chartContainer: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  chart: {
    marginVertical: 4,
    borderRadius: 16,
  },
}); 