import { AirportResponse } from '../models/airport-response';
import { ApiResponse } from '../models/api-response';
import { Config } from '../models/config-response';
import { SearchFlightRequest } from '../models/search-flight-request';
import { SearchFlightResponse } from '../models/search-flight-response';
import { SearchIncompleteRequest } from '../models/search-incomplete-request';
import { axiosInstance } from './axios';
import { endPoints } from './endpoints';

export async function searchAirport(
  query: string
): Promise<ApiResponse<AirportResponse[]>> {
  const response = await axiosInstance.get<ApiResponse<AirportResponse[]>>(
    endPoints.searchAirport,
    {
      params: {
        query,
        locale: 'en-US',
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Error searching flights');
  }

  return response.data;
}

export async function getConfig(): Promise<ApiResponse<Config[]>> {
  const response = await axiosInstance.get<ApiResponse<Config[]>>(
    endPoints.config
  );

  if (response.status !== 200) {
    throw new Error('Error getting config');
  }

  return response.data;
}

export async function searchFlights(params: SearchFlightRequest) {
  const response = await axiosInstance.get<ApiResponse<SearchFlightResponse>>(
    endPoints.searchFlight,
    {
      params,
    }
  );

  if (response.status !== 200) {
    throw new Error('Error searching flights');
  }

  return response.data;
}

export async function searchIncomplete(params: SearchIncompleteRequest) {
  const response = await axiosInstance.get<ApiResponse<SearchFlightResponse>>(
    endPoints.searchIncomplete,
    {
      params,
    }
  );

  if (response.status !== 200) {
    throw new Error('Error searching flights');
  }

  return response.data;
}
