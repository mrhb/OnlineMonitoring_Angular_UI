import { SeriesInfo,SeriesData} from '../trendInfo';

export interface trendViewComponent {
  RangesEvent: any;
  seriesInfo:SeriesInfo[];
  seriesData: SeriesData;
  }