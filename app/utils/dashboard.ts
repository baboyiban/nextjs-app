import { Package } from "../types/database/package";

// 빈 공간 좌표 정의
export const emptySpaces = new Set([
  "1,7",
  "2,7",
  "3,7",
  "1,6",
  "2,6",
  "3,6",
  "1,5",
  "3,5",
  "5,7",
  "6,7",
  "7,7",
  "5,6",
  "6,6",
  "7,6",
  "5,5",
  "7,5",
  "1,3",
  "2,3",
  "3,3",
  "1,2",
  "2,2",
  "3,2",
  "1,1",
  "3,1",
  "5,1",
  "7,1",
  "5,2",
  "6,2",
  "7,2",
  "5,3",
  "6,3",
  "7,3",
]);

// 좌표가 빈 공간인지 확인하는 함수
export const isEmptySpace = (x: number, y: number): boolean => {
  return emptySpaces.has(`${x},${y}`);
};

// 패키지 상태에 따른 색상 반환
export const getPackageStatusColor = (status: string): string => {
  switch (status) {
    case "등록됨":
      return "bg-gray-200 text-gray-800";
    case "투입됨":
      return "bg-blue-200 text-blue-800";
    case "A차운송중":
      return "bg-orange-200 text-orange-800";
    case "배송완료":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// 차량 LED 상태에 따른 스타일 반환
export const getVehicleLedStyle = (ledStatus: string): string => {
  switch (ledStatus) {
    case "노랑":
      return "bg-yellow-300 border-yellow-400 text-yellow-800";
    case "빨강":
      return "bg-red-300 border-red-400 text-red-800";
    case "초록":
      return "bg-green-300 border-green-400 text-green-800";
    default:
      return "bg-gray-200 border-gray-300 text-gray-700";
  }
};

// 패키지 상태별 통계 계산
export const calculatePackageStats = (
  packages: Package[],
): Record<string, number> => {
  return packages.reduce(
    (acc, pkg) => {
      acc[pkg.package_status] = (acc[pkg.package_status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};

// 사용 가능한 공간 수 계산
export const calculateAvailableSpaces = (): number => {
  const totalSpaces = 9 * 9;
  return totalSpaces - emptySpaces.size;
};
