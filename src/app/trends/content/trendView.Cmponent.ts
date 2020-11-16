import { SeriesInfo,SeriesData} from '../trendInfo';

export interface trendViewComponent {
  RangesEvent: any;
  series:SeriesInfo;
  metricsData: SeriesData;
  }