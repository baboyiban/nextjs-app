export type NavLink = {
  type: "main" | "sub";
  name: string;
  link: string;
  role: string;
};

export const NAV_LINKS: NavLink[] = [
  { type: "main", name: "전체 현황", link: "/dashboard", role: "관리직" },
  {
    type: "main",
    name: "긴급 확인",
    link: "/dashboard/emergency-confirm",
    role: "관리직",
  },
  { type: "sub", name: "지역", link: "/dashboard/region", role: "관리직" },
  { type: "sub", name: "차량", link: "/dashboard/vehicle", role: "관리직" },
  {
    type: "sub",
    name: "택배",
    link: "/dashboard/package",
    role: "관리직|운송직",
  },
  {
    type: "sub",
    name: "운행 기록",
    link: "/dashboard/trip-log",
    role: "관리직|운송직",
  },
  {
    type: "sub",
    name: "운행 택배",
    link: "/dashboard/delivery-log",
    role: "관리직|운송직",
  },
  {
    type: "sub",
    name: "비상 호출",
    link: "/dashboard/emergency-log",
    role: "관리직",
  },
  { type: "sub", name: "직원", link: "/dashboard/employee", role: "관리직" },
];
