export interface ApiResponse<DataType> {
  status: boolean;
  timestamp: number;
  data: DataType;
}