import { Package } from "../types/database/package";
import { Vehicle } from "../types/database/vehicle";

// 차량별 맵 크기 정의
export const VEHICLE_MAP_CONFIG = {
  "A-1000": { width: 9, height: 9 },
  "B-1001": { width: 8, height: 8 },
} as const;

// 기본 맵 크기 (알 수 없는 차량용)
export const DEFAULT_MAP_SIZE = { width: 9, height: 9 };

// 차량 ID로 맵 크기 가져오기
export const getMapSizeForVehicle = (vehicleId: string) => {
  return (
    VEHICLE_MAP_CONFIG[vehicleId as keyof typeof VEHICLE_MAP_CONFIG] ||
    DEFAULT_MAP_SIZE
  );
};

// 현재 활성 차량들의 맵 크기들 가져오기
export const getActiveMapSizes = (vehicles: Vehicle[]) => {
  const mapSizes = new Set<string>();
  vehicles.forEach((vehicle) => {
    const size = getMapSizeForVehicle(vehicle.vehicle_id);
    mapSizes.add(`${size.width}x${size.height}`);
  });
  return Array.from(mapSizes).map((sizeStr) => {
    const [width, height] = sizeStr.split("x").map(Number);
    return { width, height };
  });
};

// A-1000 차량용 빈 공간 좌표 (9x9)
export const emptySpacesA1000 = new Set([
  "1,1",
  "3,1",
  "5,1",
  "7,1",
  "1,2",
  "2,2",
  "3,2",
  "5,2",
  "6,2",
  "7,2",
  "1,3",
  "2,3",
  "3,3",
  "5,3",
  "6,3",
  "7,3",
  "1,5",
  "3,5",
  "5,5",
  "7,5",
  "1,6",
  "2,6",
  "3,6",
  "5,6",
  "6,6",
  "7,6",
  "1,7",
  "2,7",
  "3,7",
  "5,7",
  "6,7",
  "7,7",
]);

// B-1001 차량용 빈 공간 좌표 (8x8)
export const emptySpacesB1001 = new Set([
  "0,0",
  "1,0",
  "2,0",
  "3,0",
  "5,0",
  "6,0",
  "7,0",
  "0,1",
  "1,1",
  "2,1",
  "3,1",
  "5,1",
  "6,1",
  "7,1",
  "0,2",
  "1,2",
  "3,2",
  "5,2",
  "6,2",
  "7,2",
  "0,3",
  "1,3",
  "3,3",
  "5,4",
  "6,4",
  "7,4",
  "0,5",
  "1,5",
  "2,5",
  "3,5",
  "5,5",
  "6,5",
  "7,5",
  "0,6",
  "1,6",
  "2,6",
  "3,6",
  "5,6",
  "6,6",
  "7,6",
  "0,7",
  "1,7",
  "2,7",
  "3,7",
  "5,7",
  "6,7",
  "7,7",
]);

// 차량별 빈 공간 가져오기
export const getEmptySpacesForVehicle = (vehicleId: string): Set<string> => {
  switch (vehicleId) {
    case "A-1000":
      return emptySpacesA1000;
    case "B-1001":
      return emptySpacesB1001;
    default:
      return emptySpacesA1000; // 기본값
  }
};

// 빈 공간 좌표 정의 (기존 호환성을 위해 유지)
export const emptySpaces = emptySpacesA1000;

// 좌표가 빈 공간인지 확인하는 함수
export const isEmptySpace = (x: number, y: number): boolean => {
  return emptySpaces.has(`${x},${y}`);
};

// 패키지 상태에 따른 색상 반환
export const getPackageStatus = (
  status: string,
): "success" | "warning" | "danger" | "neutral" | "process" => {
  switch (status) {
    case "등록됨":
      return "neutral";
    case "투입됨":
      return "process";
    case "A차운송중":
      return "warning";
    case "배송완료":
      return "success";
    default:
      return "neutral";
  }
};

// 차량 LED 상태에 따른 스타일 반환
export const getVehicleLedStyle = (ledStatus?: string): string => {
  switch (ledStatus) {
    case "노랑":
      return "bg-yellow";
    case "빨강":
      return "bg-red";
    case "초록":
      return "bg-green";
    default:
      return "bg-gray";
  }
};

// 사용 가능한 공간 수 계산 (차량별로 계산)
export const calculateAvailableSpaces = (vehicleId?: string): number => {
  const mapSize = vehicleId
    ? getMapSizeForVehicle(vehicleId)
    : DEFAULT_MAP_SIZE;
  const emptySpaces = vehicleId
    ? getEmptySpacesForVehicle(vehicleId)
    : emptySpacesA1000;

  const totalSpaces = mapSize.width * mapSize.height;
  return totalSpaces - emptySpaces.size;
};
